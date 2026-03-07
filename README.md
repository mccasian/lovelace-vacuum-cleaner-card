# vacuum-cleaner-card

Simple card for various robot vacuums in Home Assistant's Lovelace UI

[![GH-release](https://img.shields.io/github/v/release/mccasian/lovelace-vacuum-cleaner-card.svg?style=flat-square)](https://github.com/mccasian/lovelace-vacuum-cleaner-card/releases)
[![GH-downloads](https://img.shields.io/github/downloads/mccasian/lovelace-vacuum-cleaner-card/total?style=flat-square)](https://github.com/mccasian/lovelace-vacuum-cleaner-card/releases)
[![GH-last-commit](https://img.shields.io/github/last-commit/mccasian/lovelace-vacuum-cleaner-card.svg?style=flat-square)](https://github.com/mccasian/lovelace-vacuum-cleaner-card/commits/master)
[![GH-code-size](https://img.shields.io/github/languages/code-size/mccasian/lovelace-vacuum-cleaner-card.svg?color=red&style=flat-square)](https://github.com/mccasian/lovelace-vacuum-cleaner-card)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=flat-square)](https://github.com/hacs)

Integrated support for most vacuums from the following brands/models:
Roomba, Neato, Robovac, Valetudo, Ecovacs, Deebot, Mi Home, Dreame

## Fork & Project Status

This project is forked from [benct/lovelace-xiaomi-vacuum-card](https://github.com/benct/lovelace-xiaomi-vacuum-card).

The original project has had no maintenance activity and no pull request responses in recent years.
This fork started from the same base interface, but has since evolved into a heavily reworked implementation with major internal rewrites,
additional features, and much more flexible configuration, including a built-in GUI editor.

## Installation

Manually add [vacuum-cleaner-card.js](https://raw.githubusercontent.com/mccasian/lovelace-vacuum-cleaner-card/master/vacuum-cleaner-card.js)
to your `<config>/www/` folder and add the following to the `configuration.yaml` file:
```yaml
lovelace:
  resources:
    - url: /local/vacuum-cleaner-card.js?v=v1.0.0
      type: module
```

_OR_ install using [HACS](https://hacs.xyz/) and add this (if in YAML mode):
```yaml
lovelace:
  resources:
    - url: /hacsfiles/lovelace-vacuum-cleaner-card/vacuum-cleaner-card.js
      type: module
```

The above configuration can be managed directly in the Configuration -> Lovelace Dashboards -> Resources panel when not using YAML mode,
or added by clicking the "Add to lovelace" button on the HACS dashboard after installing the plugin.

Background image fallback is automatic by default:
- First tries `/local/img/vacuum.png` (i.e. `<config>/www/img/vacuum.png`)
- If missing, falls back to `/hacsfiles/lovelace-vacuum-cleaner-card/img/vacuum.png`

You can still provide your own path with `image`, or disable image background entirely with `image: false`.

## Configuration

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:vacuum-cleaner-card`
| entity | string | **Required** | `vacuum.my_robot_vacuum`
| name | string/bool | `friendly_name` | Override friendly name (set to `false` to hide)
| image | string/bool | auto fallback | Custom background image path (i.e. `/local/img/vacuum.png`). Set `false` to disable background image.
| state | [Entity Data](#entity-data) | *(see below)* | Set to `false` to hide all states
| attributes | [Entity Data](#entity-data) | *(see below)* | Set to `false` to hide all attributes
| buttons | [Button Data](#button-data) | *(see below)* | Set to `false` to hide button row
| room_icons | [Room Icon Data](#room-icon-data)[] | `[]` | Optional icon action rows rendered below standard buttons
| icon_rows | number | auto | Optional legacy/manual row count override (minimum `1`)

### Entity Data

Default vacuum attributes under each list:
- `state` (**left list**) include `status`, `battery` and `mode`.
- `attributes` (**right list**) include `main_brush`, `side_brush`, `filter` and `sensor`.

See [examples](#examples) on how to customize, hide or add custom attributes.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| key | string | **Required** | Attribute/state key on vacuum entity
| icon | string | | Optional icon
| label | string | | Optional label text
| unit | string | | Optional unit

### Button Data

Default buttons include `start`, `pause`, `stop`, `spot` (hidden), `locate` and `return`.
See [examples](#examples) on how to customize, hide or add custom buttons/actions.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| icon | string | **Required** | Show or hide stop button
| service | string | **Required** | Service to call (i.e `vacuum.start`)
| show | bool | `true` | Show or hide button
| label | string | | Optional label on hover
| service_data | object | | Data applied to the service call

### Room Icon Data

`room_icons` is the current dynamic format for command icons. Items without both `icon` and `service` are ignored.
In the visual editor, room icons are grouped by row, can be reordered with drag-and-drop, and icon selection supports search via Home Assistant's icon picker.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| row | number | `1` | Target row index (1-based)
| position | number | auto/order | Position within row (1-based)
| icon | string | **Required** | MDI icon, e.g. `mdi:map-marker`
| label | string | | Optional hover label
| service | string | **Required** | Service to call (i.e `vacuum.locate`)
| command | string | | Alias for `service` (legacy compatibility)
| service_data | object | | Data applied to the service call

### Important Feature: Multi-Row Custom Service Buttons

Users can add custom buttons in multi-row format and call Home Assistant services by pressing an icon.
The most common use-case is one icon per room, so you can start cleaning a specific room with a single press.

The service can also be a predefined script.
Example icon service:

```yaml
room_icons:
  - icon: mdi:bed-empty
    label: Bedroom
    service: script.clean_the_bedroom
    row: 1
    position: 1
```

And the referenced script can be defined like this:

```yaml
clean_the_bedroom:
  alias: Clean the Bedroom
  sequence:
    - action: dreame_vacuum.vacuum_clean_segment
      target:
        entity_id:
          - vacuum.x40_ultra_complete
      data:
        segments: 7 # try from 1 upwards to check room IDs
```


## Screenshots

![vacuum-cleaner-card](https://raw.githubusercontent.com/mccasian/lovelace-vacuum-cleaner-card/master/examples/default.png)

![vacuum-cleaner-card-no-title](https://raw.githubusercontent.com/mccasian/lovelace-vacuum-cleaner-card/master/examples/no-title.png)

![vacuum-cleaner-card-image](https://raw.githubusercontent.com/mccasian/lovelace-vacuum-cleaner-card/master/examples/with-image.png)

![vacuum-cleaner-card-no-buttons](https://raw.githubusercontent.com/mccasian/lovelace-vacuum-cleaner-card/master/examples/no-buttons.png)

![vacuum-cleaner-card-multi-row-w-background](https://raw.githubusercontent.com/mccasian/lovelace-vacuum-cleaner-card/master/examples/multi-row-with-background.png)

![vacuum-cleaner-card-multi-row-wo-background](https://raw.githubusercontent.com/mccasian/lovelace-vacuum-cleaner-card/master/examples/multi-row-wo-background.png)

![vacuum-cleaner-card-configuration](https://raw.githubusercontent.com/mccasian/lovelace-vacuum-cleaner-card/master/examples/configuration.png)

## Examples

Basic configuration:
```yaml
- type: custom:vacuum-cleaner-card
  entity: vacuum.my_robot_vacuum
```

```yaml
- type: custom:vacuum-cleaner-card
  entity: vacuum.my_robot_vacuum
  image: /hacsfiles/lovelace-vacuum-cleaner-card/img/vacuum.png
  name: My Vacuum
  vendor: xiaomi
```

Hide state, attributes and/or buttons:
```yaml
- type: custom:vacuum-cleaner-card
  entity: vacuum.my_robot_vacuum
  state: false
  attributes: false
  buttons: false
```

Hide specific state values, attributes and/or buttons:
```yaml
- type: custom:vacuum-cleaner-card
  entity: vacuum.my_robot_vacuum
  state:
    mode: false
  attributes:
    main_brush: false
    side_brush: false
  buttons:
    pause: false
    locate: false
``` 

Customize specific state values, attributes and/or buttons:
```yaml
- type: custom:vacuum-cleaner-card
  entity: vacuum.my_robot_vacuum
  state:
    status:
      key: state
    mode:
      icon: mdi:robot-vacuum
      label: 'Fan speed: '
      unit: 'percent'
  attributes:
    main_brush:
      key: component_main_brush
    side_brush:
      key: component_side_brush
  buttons:
    pause:
      icon: mdi:stop
      label: Hold
      service: vacuum.stop
```

Show default clean spot button:
```yaml
- type: custom:vacuum-cleaner-card
  entity: vacuum.my_robot_vacuum
  buttons:
    spot:
      show: true
```

Add custom attributes:
```yaml
- type: custom:vacuum-cleaner-card
  entity: vacuum.my_robot_vacuum
  attributes:
    clean_area:
      key: 'clean_area'
      label: 'Cleaned area: '
      unit: ' m2'
```

Add custom buttons and service calls:
```yaml
- type: custom:vacuum-cleaner-card
  entity: vacuum.my_robot_vacuum
  buttons:
    new_button:
      icon: mdi:light-switch
      label: Custom button!
      service: light.turn_off
      service_data:
        entity_id: light.living_room
```

Add room icons (dynamic command rows):
```yaml
- type: custom:vacuum-cleaner-card
  entity: vacuum.my_robot_vacuum
  room_icons:
    - row: 1
      position: 1
      icon: mdi:map-marker
      label: Locate
      service: vacuum.locate
    - row: 1
      position: 2
      icon: mdi:home-map-marker
      label: Return
      service: vacuum.return_to_base
```

Add multiple room icon rows:
```yaml
- type: custom:vacuum-cleaner-card
  entity: vacuum.my_robot_vacuum
  room_icons:
    - row: 1
      position: 1
      icon: mdi:sofa
      label: Living room
      service: vacuum.send_command
      service_data:
        entity_id: vacuum.my_robot_vacuum
        command: app_segment_clean
        params: [16]
    - row: 2
      position: 1
      icon: mdi:silverware-fork-knife
      label: Kitchen
      service: vacuum.send_command
      service_data:
        entity_id: vacuum.my_robot_vacuum
        command: app_segment_clean
        params: [18]
```

Translations:
```yaml
- type: custom:vacuum-cleaner-card
  entity: vacuum.my_robot_vacuum
  attributes:
    main_brush:
      label: 'Hovedkost: '
      unit: ' timer'
    side_brush:
      label: 'Sidekost: '
      unit: ' timer'
    filter:
      label: 'Filtere: '
    sensor:
      label: 'Sensorer: '
  buttons:
    start:
      label: Start!
    pause:
      label: Stopp!
    stop:
      label: Hammertime
```

## Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with any vacuum manufacturer,
or any of their subsidiaries or affiliates.


[![BMC](https://www.buymeacoffee.com/assets/img/custom_images/white_img.png)](https://buymeacoffee.com/mccasian)
