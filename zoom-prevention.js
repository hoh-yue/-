// Aggressive zoom prevention for Safari and all browsers
(function() {
  // Store initial zoom level
  let currentZoom = 1;
  
  // Method 1: Prevent pinch zoom on touch devices
  document.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });

  // Method 2: Prevent double-tap zoom
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });

  // Method 3: Disable keyboard zoom (Ctrl/Cmd +/-)
  document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '-' || event.key === '=')) {
      event.preventDefault();
    }
  });

  // Method 4: Monitor and reset zoom level if it changes
  window.addEventListener('load', resetZoom);
  window.addEventListener('orientationchange', resetZoom);
  window.addEventListener('touchstart', resetZoom);
  window.addEventListener('touchend', resetZoom);
  
  // Method 5: Periodically check and reset zoom on Safari
  setInterval(resetZoom, 500);

  function resetZoom() {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover');
    }
    
    // Force zoom reset in CSS
    document.documentElement.style.zoom = '1';
    
    // Reset body too
    if (document.body.style.zoom !== '1') {
      document.body.style.zoom = '1';
    }
  }
  
  // Method 6: Listen for wheel events (mouse zoom)
  document.addEventListener('wheel', function(event) {
    if ((event.ctrlKey || event.metaKey) && event.deltaY !== 0) {
      event.preventDefault();
    }
  }, { passive: false });
})();
