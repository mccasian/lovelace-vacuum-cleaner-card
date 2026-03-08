# Changelog
All notable changes to this project will be documented in this file.

## 1.1.0

- Add `battery_entity` support to allow sourcing battery state from an external sensor (falls back to existing vacuum attributes/state when not set).
- Treat Roborock/Xiaomi brush/filter/sensor remaining values as hours (`compute.hour`) for correct display.
- Add `viomi` vendor mappings to improve Viomi vacuum compatibility.
- Add `text-transform: capitalize;` styling for `.grid-left` labels.
- Documented `battery_entity` in README with example usage.

## 1.0.0

- **Initial release**