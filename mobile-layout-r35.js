(function () {
  var designWidth = 402, designHeight = 874;
  var demo = document.getElementById('demo');
  if (!demo || demo.parentElement.id === 'air2-phone-shell') return;
  var shell = document.createElement('main');
  shell.id = 'air2-phone-shell';
  demo.parentNode.insertBefore(shell, demo);
  shell.appendChild(demo);
  function viewportSize() {
    var viewport = window.visualViewport;
    return {
      width: viewport ? viewport.width : window.innerWidth,
      height: viewport ? viewport.height : window.innerHeight
    };
  }
  function resizePhone() {
    var viewport = viewportSize();
    var isPhone = viewport.width <= 600;
    var scale = isPhone
      ? viewport.width / designWidth
      : Math.min(viewport.width / designWidth, viewport.height / designHeight);
    scale = Math.max(.1, scale);
    shell.style.setProperty('--air2-scale', String(scale));
    shell.style.setProperty('--air2-shell-width', (isPhone ? viewport.width : designWidth * scale) + 'px');
    shell.style.setProperty('--air2-shell-height', (isPhone ? viewport.height : designHeight * scale) + 'px');
    /* On phones, preserve the 402px design width while extending the logical
       canvas to exactly the visible browser height. */
    shell.style.setProperty('--air2-canvas-height', (isPhone ? viewport.height / scale : designHeight) + 'px');
  }
  resizePhone();
  window.addEventListener('resize', resizePhone, {passive:true});
  window.addEventListener('orientationchange', resizePhone, {passive:true});
  if (window.visualViewport) window.visualViewport.addEventListener('resize', resizePhone, {passive:true});
})();
