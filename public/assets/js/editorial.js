(function () {
  'use strict';
  var scene = document.querySelector('.editorial-scene');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (scene) {
    var frame = 0;
    scene.addEventListener('pointermove', function (event) {
      if (motion.matches || !pointer.matches) return;
      if (frame) cancelAnimationFrame(frame);
      var box = scene.getBoundingClientRect();
      var x = ((event.clientX - box.left) / box.width - .5) * 10;
      var y = ((event.clientY - box.top) / box.height - .5) * 8;
      frame = requestAnimationFrame(function () {
        scene.style.setProperty('--scene-x', x.toFixed(2) + 'px');
        scene.style.setProperty('--scene-y', y.toFixed(2) + 'px');
      });
    });
    var reset = function () {
      if (frame) cancelAnimationFrame(frame);
      scene.style.removeProperty('--scene-x');
      scene.style.removeProperty('--scene-y');
    };
    scene.addEventListener('pointerleave', reset);
    motion.addEventListener('change', reset);
  }
  if (document.querySelector('.doc .prose')) {
    var progress = document.createElement('div');
    progress.className = 'editorial-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progress);
    var pending = false;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0) + ')';
      pending = false;
    }
    window.addEventListener('scroll', function () {
      if (!pending) { pending = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
}());
