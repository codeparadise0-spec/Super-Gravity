---
name: devtools-sensor-emulation
description: Use when emulating mobile device sensors, GPS geolocation coordinates, device orientation (gyroscope), and touch events in Chrome DevTools Sensors drawer.
---

# Chrome DevTools Sensor & Hardware Emulation

Test hardware-dependent features (location-aware services, map routing, tilt interactions, touch gestures) without needing physical mobile devices.

---

## 1. Opening the Sensors Drawer

1. Open Chrome DevTools -> Press `Ctrl + Shift + P` (or `Cmd + Shift + P`).
2. Type **`Show Sensors`** and press Enter.

---

## 2. Sensor Emulation Capabilities

### A. Geolocation Coordinate Overrides
- Emulate pre-configured cities: *San Francisco*, *Tokyo*, *London*, *Berlin*, *Mumbai*.
- Enter custom **Latitude**, **Longitude**, and **Timezone ID** to verify location-based pricing and localized store locators.
- Test **Location Unavailable** error handling when user denies browser permissions.

### B. Device Orientation (Gyroscope / Accelerometer)
- Interactively tilt a 3D phone model in DevTools to simulate `DeviceOrientationEvent` and `DeviceMotionEvent` values:
  - $\alpha$ (Alpha: 0 to 360 degrees)
  - $\beta$ (Beta: -180 to 180 degrees)
  - $\gamma$ (Gamma: -90 to 90 degrees)

### C. Touch Event Emulation
- Automatically converts desktop mouse events to multi-touch `TouchEvent` (`touchstart`, `touchmove`, `touchend`) when Device Mode is active (`Ctrl + Shift + M`).
