---
name: Disable User Zoom
about: Prevent users from zooming in/out on the app
title: Disable user zoom functionality
---

## Issue: Prevent User Zoom In/Out

### Description
Users should not be able to zoom in or zoom out on the app. The app should maintain a fixed scale regardless of pinch-to-zoom gestures or keyboard shortcuts (Ctrl+/-, Cmd+/-).

### Why
- Maintain consistent UI/UX design
- Prevent layout breaking from zoom
- Preserve the responsive design experience

### Solution
Add CSS to disable zoom and update the viewport meta tag to prevent pinch zoom on mobile devices.

### Implementation
1. Add `user-scalable=no` to the viewport meta tag in index.html
2. Add CSS rule to disable zoom:
   ```css
   body { touch-action: manipulation; }
   ```
