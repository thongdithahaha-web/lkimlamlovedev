// Neutralized detect-devtools.js
(function() {
  window.DisableDevtool = function() {
    return { isRunning: false, isSuspend: true, md5: function() { return ""; } };
  };
})();
