/* =========================================================================
 *  WORKER XOÁ PHÔNG — chạy hoàn toàn trong trình duyệt, không gửi ảnh đi đâu.
 *
 *  Chép từ CanvaDlovePro/public/bg-remove.worker.js (cùng nhà), gốc xa hơn là
 *  Sticker Forge. Model U²-Netp (Apache 2.0) để LOCAL ở /models/… (4.4MB),
 *  tải một lần rồi trình duyệt cache. Thư viện transformers.js nạp từ CDN
 *  jsDelivr lúc chạy — muốn tự chủ hoàn toàn thì tải về public/ và đổi
 *  TRANSFORMERS_URL.
 *
 *  Đường dẫn model tính tương đối với worker nên deploy ở thư mục con vẫn đúng.
 *  Không cần header COOP/COEP: chạy WASM một luồng.
 * ========================================================================= */

const TRANSFORMERS_URL = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.2.0'
const MODEL_ID = 'BritishWerewolf/U-2-Netp'
const LOCAL_MODEL_PATH = new URL('./models/', self.location.href).href

// Nén "đuôi" xác suất thấp của mặt nạ để không còn quầng xám quanh mép.
const MATTE_BLACK_POINT = 0.12
const MATTE_WHITE_POINT = 0.78

let removerPromise = null
let lib = null

function lamSachAlpha(value) {
  const chuan = Math.max(0, Math.min(1, value / 255))
  const cat = Math.max(0, Math.min(1, (chuan - MATTE_BLACK_POINT) / (MATTE_WHITE_POINT - MATTE_BLACK_POINT)))
  return cat * cat * (3 - 2 * cat)
}

function baoTienDo(id, phase, progress) {
  self.postMessage({ type: 'progress', id, phase, progress })
}

async function napThuVien() {
  if (lib) return lib
  lib = await import(/* @vite-ignore */ TRANSFORMERS_URL)
  const { env } = lib
  env.allowLocalModels = true
  env.allowRemoteModels = false
  env.localModelPath = LOCAL_MODEL_PATH
  return lib
}

async function taoBoXoa(id) {
  const { AutoModel, RawImage, Tensor } = await napThuVien()
  const model = await AutoModel.from_pretrained(MODEL_ID, {
    device: 'wasm',
    dtype: 'fp32',
    progress_callback: (ev) => {
      if (ev.status === 'ready') return baoTienDo(id, 'loading', 100)
      const p = Number(ev.progress)
      if (Number.isFinite(p)) baoTienDo(id, 'loading', Math.max(0, Math.min(100, p)))
    },
  })
  baoTienDo(id, 'loading', 100)

  return async (input) => {
    const image = await RawImage.fromBlob(input)
    const S = 320
    const scale = Math.min(S / image.width, S / image.height)
    const rw = Math.max(1, Math.round(image.width * scale))
    const rh = Math.max(1, Math.round(image.height * scale))
    const left = Math.floor((S - rw) / 2), right = S - rw - left
    const top = Math.floor((S - rh) / 2), bottom = S - rh - top
    const resized = await image.clone().rgb().resize(rw, rh)
    const prepared = await resized.pad([left, right, top, bottom])

    const mean = [0.485, 0.456, 0.406], std = [0.229, 0.224, 0.225]
    const plane = S * S
    const normalized = new Float32Array(plane * 3)
    for (let px = 0; px < plane; px++) {
      for (let c = 0; c < 3; c++) normalized[c * plane + px] = (prepared.data[px * 3 + c] / 255 - mean[c]) / std[c]
    }
    const prediction = await model({ 'input.1': new Tensor('float32', normalized, [1, 3, S, S]) })
    const composite = prediction['1959'] ?? Object.values(prediction)[0]
    if (!composite) throw new Error('Model không trả về mặt nạ tiền cảnh')

    let mn = Infinity, mx = -Infinity
    for (const v of composite.data) { const n = Number(v); if (n < mn) mn = n; if (n > mx) mx = n }
    const range = Math.max(mx - mn, 0.00001)
    const maskPixels = new Uint8Array(plane)
    for (let i = 0; i < plane; i++) maskPixels[i] = Math.round(((Number(composite.data[i]) - mn) / range) * 255)
    const paddedMask = new RawImage(maskPixels, S, S, 1)
    const croppedMask = await paddedMask.crop([left, top, left + rw - 1, top + rh - 1])
    const mask = await croppedMask.resize(image.width, image.height)
    image.rgba()
    for (let i = 0; i < mask.data.length; i++) {
      const a = lamSachAlpha(mask.data[i])
      const goc = image.data[i * 4 + 3] / 255
      mask.data[i] = Math.round(a * goc * 255)
    }
    return image.putAlpha(mask)
  }
}

self.addEventListener('message', async (event) => {
  const req = event.data
  if (req.type !== 'remove') return
  try {
    baoTienDo(req.id, 'loading', 0)
    removerPromise ??= taoBoXoa(req.id)
    const remover = await removerPromise
    baoTienDo(req.id, 'processing')
    const out = await remover(new Blob([req.image], { type: req.mimeType }))
    const pixels = new Uint8ClampedArray(out.data)
    self.postMessage({ type: 'result', id: req.id, pixels: pixels.buffer, width: out.width, height: out.height }, { transfer: [pixels.buffer] })
  } catch (err) {
    removerPromise = null
    self.postMessage({ type: 'error', id: req.id, message: err instanceof Error ? err.message : 'Xoá phông thất bại' })
  }
})
