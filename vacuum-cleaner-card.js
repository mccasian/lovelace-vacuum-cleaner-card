((LitElement) => {
    console.info(
        '%c vacuum-cleaner-CARD %c v1.0.0 ',
        'color: cyan; background: black; font-weight: bold;',
        'color: darkblue; background: white; font-weight: bold;',
    );

    const state = {
        status: {
            key: 'status',
            icon: 'mdi:robot-vacuum',
        },
        battery: {
            key: 'battery_level',
            unit: '%',
            icon: 'mdi:battery-charging-80',
        },
        mode: {
            key: 'fan_speed',
            icon: 'mdi:fan',
        },
    };

    const attributes = {
        main_brush: {
            key: 'main_brush_left',
            label: 'Main Brush: ',
            unit: ' h',
        },
        side_brush: {
            key: 'side_brush_left',
            label: 'Side Brush: ',
            unit: ' h',
        },
        filter: {
            key: 'filter_left',
            label: 'Filter: ',
            unit: ' h',
        },
        sensor: {
            key: 'sensor_dirty_left',
            label: 'Sensor: ',
            unit: ' h',
        },
    };

    const buttons = {
        start: {
            label: 'Start',
            icon: 'mdi:play',
            service: 'vacuum.start',
        },
        pause: {
            label: 'Pause',
            icon: 'mdi:pause',
            service: 'vacuum.pause',
        },
        stop: {
            label: 'Stop',
            icon: 'mdi:stop',
            service: 'vacuum.stop',
        },
        spot: {
            show: false,
            label: 'Clean Spot',
            icon: 'mdi:broom',
            service: 'vacuum.clean_spot',
        },
        locate: {
            label: 'Locate',
            icon: 'mdi:map-marker',
            service: 'vacuum.locate',
        },
        return: {
            label: 'Return to Base',
            icon: 'mdi:home-map-marker',
            service: 'vacuum.return_to_base',
        },
    };

    const compute = {
        trueFalse: v => (v === true ? 'Yes' : (v === false ? 'No' : '-')),
        divide100: v => Math.round(Number(v) / 100),
        secToHour: v => Math.floor(Number(v) / 60 / 60),
        hour: v => Math.floor(Number(v)),
    }

    const vendors = {
        xiaomi: {
            attributes: {
                main_brush: {compute: compute.hour},
                side_brush: {compute: compute.hour},
                filter: {compute: compute.hour},
                sensor: {compute: compute.hour},
            }
        },
        xiaomi_mi: {
            attributes: {
                main_brush: {key: 'main_brush_hours'},
                side_brush: {key: 'side_brush_hours'},
                filter: {key: 'hypa_hours'},
                sensor: {
                    key: 'mop_hours',
                    label: 'Mop: ',
                },
            },
        },
        viomi: {
            state: {
                status: {
                    key: 'state',
                },
            },
            attributes: {
                main_brush: { key: 'viomi_vacuum.main_brush_hours' },
                side_brush: { key: 'viomi_vacuum.side_brush_hours' },
                filter: { key: 'viomi_vacuum.hypa_hours' },
                sensor: {
                    key: 'viomi_vacuum.mop_hours',
                    label: 'Mop: ',
                },
            },
        },
        valetudo: {
            state: {
                status: {key: 'state'},
            },
            attributes: {
                main_brush: {key: 'mainBrush'},
                side_brush: {key: 'sideBrush'},
                filter: {key: 'filter'},
                sensor: {key: 'sensor'},
            },
        },
        roomba: {
            attributes: {
                main_brush: false,
                side_brush: false,
                filter: false,
                sensor: false,
                bin_present: {
                    key: 'bin_present',
                    label: 'Bin Present: ',
                    compute: compute.trueFalse,
                },
                bin_full: {
                    key: 'bin_full',
                    label: 'Bin Full: ',
                    compute: compute.trueFalse,
                },
            },
        },
        robovac: {
            attributes: false,
            buttons: {
                stop: {show: false},
                spot: {show: true},
            },
        },
        ecovacs: {
            attributes: false,
            buttons: {
                start: {service: 'vacuum.turn_on'},
                pause: {service: 'vacuum.stop'},
                stop: {service: 'vacuum.turn_off', show: false},
                spot: {show: true},
            },
        },
        deebot: {
            buttons: {
                start: {service: 'vacuum.turn_on'},
                pause: {service: 'vacuum.stop'},
                stop: {service: 'vacuum.turn_off'},
            },
            attributes: {
                main_brush: {
                    key: 'component_main_brush',
                    compute: compute.divide100,
                },
                side_brush: {
                    key: 'component_side_brush',
                    compute: compute.divide100,
                },
                filter: {
                    key: 'component_filter',
                    compute: compute.divide100,
                },
                sensor: false,
            },
        },
        deebot_slim: {
            buttons: {
                start: {service: 'vacuum.turn_on'},
                pause: {service: 'vacuum.stop'},
                stop: {service: 'vacuum.turn_off'},
            },
            attributes: {
                main_brush: false,
                side_brush: {key: 'component_side_brush'},
                filter: {key: 'component_filter'},
                sensor: false,
            },
        },
        dreame: {
            buttons: {
                start: {service: 'vacuum.turn_on'},
                pause: {service: 'vacuum.stop'},
                stop: {service: 'vacuum.turn_off'},
            },
            attributes: {
                main_brush: {
                    key: 'main_brush_life_level',
                    keys: ['main_brush_life_level', 'main_brush_left', 'main_brush_life'],
                    unit: '%'
                },
                side_brush: {
                    key: 'side_brush_life_level',
                    keys: ['side_brush_life_level', 'side_brush_left', 'side_brush_life'],
                    unit: '%'
                },
                filter: {
                    key: 'filter_life_level',
                    keys: ['filter_life_level', 'filter_left', 'filter_life'],
                    unit: '%'
                },
                sensor: {
                    key: 'waterbox',
                    keys: ['waterbox', 'mop_pad_life_level', 'mop_pad_left', 'sensor_dirty_left'],
                    label: 'Mop: ',
                    unit: ''
                }
            }
        },
        neato: {
            state: {
                mode: false,
            },
            attributes: {
                main_brush: false,
                side_brush: false,
                filter: false,
                sensor: false,
                clean_area: {
                    key: 'clean_area',
                    label: 'Cleaned area: ',
                    unit: ' m2',
                },
            },
        },
    };

    const normalizeVendorKey = (value) => {
        if (typeof value !== 'string') return undefined;
        const normalized = value.trim().toLowerCase();
        if (!normalized) return undefined;
        if (normalized in vendors) return normalized;

        const aliases = {
            default: 'dreame',
            none: 'dreame',
            'xiaomi-mi': 'xiaomi_mi',
            xiaomi_miio: 'xiaomi_mi',
            'deebot-slim': 'deebot_slim',
            dreame_vacuum: 'dreame',
        };

        return aliases[normalized];
    };

    const html = LitElement.prototype.html;
    const css = LitElement.prototype.css;

    class VacuumCleanerCard extends LitElement {

        static get properties() {
            return {
                _hass: {},
                config: {},
                stateObj: {},
            }
        }

        static async getConfigElement() {
            return document.createElement('vacuum-cleaner-card-editor');
        }

        static getStubConfig(hass) {
            const vacuumEntity = hass
                ? Object.keys(hass.states).find(entityId => entityId.startsWith('vacuum.'))
                : undefined;

            return {
                type: 'custom:vacuum-cleaner-card',
                entity: vacuumEntity || '',
                name: 'Vacuum Cleaner',
            };
        }

        static get styles() {
            return css`
.background {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.title {
  font-size: 20px;
  padding: 12px 16px 8px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.icon-rows {
    display: grid;
    gap: 6px;
    padding: 0 8px 8px;
}
.icon-row {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, auto);
  cursor: pointer;
}
.grid-content {
  display: grid;
  align-content: space-between;
  grid-row-gap: 6px;
}
.grid-left {
  text-align: left;
  font-size: 110%;
  padding-left: 10px;
  border-left: 2px solid var(--primary-color);
    text-transform: capitalize;
}
.grid-right {
  text-align: right;
  padding-right: 10px;
  border-right: 2px solid var(--primary-color);
}`;
        }

        render() {
            return this.stateObj ? html`
            <ha-card class="background" style="${this.config.styles.background}">
              ${this.config.show.name ?
                html`<div class="title">${this.config.name || this.stateObj.attributes.friendly_name}</div>`
                : null}
              ${(this.config.show.state || this.config.show.attributes) ? html`
              <div class="grid" style="${this.config.styles.content}" @click="${() => this.fireEvent('hass-more-info')}">
                ${this.config.show.state ? html`
                <div class="grid-content grid-left">
                  ${Object.values(this.config.state).filter(v => v).map(this.renderAttribute.bind(this))}
                </div>` : null}
                ${this.config.show.attributes ? html`
                <div class="grid-content grid-right">
                  ${Object.values(this.config.attributes).filter(v => v).map(this.renderAttribute.bind(this))}
                </div>` : null}
              </div>` : null}
              ${this.config.show.buttons ? html`
              <div class="flex">
                ${Object.values(this.config.buttons).filter(v => v).map(this.renderButton.bind(this))}
              </div>` : null}
              ${this.config.show.commandIcons ? html`
              <div class="icon-rows">
                ${this.renderCommandIconRows()}
              </div>` : null}
            </ha-card>` : html`<ha-card style="padding: 8px 16px">Entity '${this.config.entity}' not available...</ha-card>`;
        }

        renderCommandIconRows() {
            const rows = Array.from({length: this.config.commandIconRows}, (_, index) => index + 1);

            return rows.map(row => {
                const rowIcons = this.config.commandIcons
                    .filter(icon => icon.row === row)
                    .sort((a, b) => {
                        const posA = Number.isFinite(a.position) ? a.position : Number.MAX_SAFE_INTEGER;
                        const posB = Number.isFinite(b.position) ? b.position : Number.MAX_SAFE_INTEGER;

                        if (posA === posB) return a._index - b._index;
                        return posA - posB;
                    });

                return html`
                    <div class="icon-row">
                        ${rowIcons.map(this.renderCommandIcon.bind(this))}
                    </div>
                `;
            });
        }

        renderCommandIcon(data) {
            return html`<ha-icon-button
                                @click="${() => data.service && this.callService(data.service, data.service_data)}"
                title="${data.label || ''}"
                style="${this.config.styles.icon}">
                  <ha-icon style="display:flex;" icon="${data.icon}"></ha-icon>
                </ha-icon-button>`;
        }

        renderAttribute(data) {
            const computeFunc = data.compute || (v => v);
            const candidateKeys = Array.isArray(data && data.keys)
                ? data.keys.filter(Boolean)
                : (data && data.key ? [data.key] : []);
            const resolvedKey = candidateKeys.find(key => (
                `${this.config.sensorEntity}_${key}` in this._hass.states
                || key in this.stateObj.attributes
                || key in this.stateObj
            ));

            const isValidSensorData = resolvedKey && `${this.config.sensorEntity}_${resolvedKey}` in this._hass.states;
            const isValidAttribute = resolvedKey && resolvedKey in this.stateObj.attributes;
            const isValidEntityData = resolvedKey && resolvedKey in this.stateObj;

            const value = isValidSensorData
                ? computeFunc(this._hass.states[`${this.config.sensorEntity}_${resolvedKey}`].state) + (data.unit || '')
                : isValidAttribute
                    ? computeFunc(this.stateObj.attributes[resolvedKey]) + (data.unit || '')
                    : isValidEntityData
                        ? computeFunc(this.stateObj[resolvedKey]) + (data.unit || '')
                        : null;
            const attribute = html`<div>
                ${data.icon && this.renderIcon(data)}
                ${(data.label || '') + (value !== null ? value : this._hass.localize('state.default.unavailable'))}
            </div>`;

            const dropdownKey = resolvedKey || data.key;
            const hasDropdown = dropdownKey && `${dropdownKey}_list` in this.stateObj.attributes;
            const isModeSelector = dropdownKey === 'fan_speed';

            return (hasDropdown && value !== null && !isModeSelector)
                ? this.renderDropdown(attribute, dropdownKey, data.service)
                : attribute;
        }

        renderIcon(data) {
            const icon = (data.key === 'battery_level' && 'battery_icon' in this.stateObj.attributes)
                ? this.stateObj.attributes.battery_icon
                : data.icon;
            return html`<ha-icon icon="${icon}" style="margin-right: 10px; ${this.config.styles.icon}"></ha-icon>`;
        }

        renderButton(data) {
            return data && data.show !== false
                ? html`<ha-icon-button
                                        @click="${() => data.service && this.callService(data.service, data.service_data)}"
                    title="${data.label || ''}"
                    style="${this.config.styles.icon}">
                      <ha-icon style="display:flex;" icon="${data.icon}"></ha-icon>
                    </ha-icon-button>`
                : null;
        }

        renderDropdown(attribute, key, service) {
            const list = this.stateObj.attributes[`${key}_list`];

            return html`
                <div style="position: relative" @click=${e => e.stopPropagation()}>
                    <ha-button @click=${() => this.toggleMenu(key)}>
                      ${attribute}
                    </ha-button>
                    <mwc-menu
                      @selected=${e => this.handleChange(list[e.detail.index], key, service)}
                      id=${`xvc-menu-${key}`}
                      activatable
                      corner="BOTTOM_START">
                        ${list.map(item => html`<mwc-list-item value=${item}>${item}</mwc-list-item>`)}
                    </mwc-menu>
                </div>`;
        }

        toggleMenu(key) {
            const menu = this.shadowRoot.querySelector(`#xvc-menu-${key}`);
            menu.open = !menu.open;
        }

        getCardSize() {
            let size = 2;
            if (this.config.show.name) size += 1;
            if (this.config.show.buttons) size += 1;
            if (this.config.show.commandIcons) size += this.config.commandIconRows;
            return size;
        }

        shouldUpdate(changedProps) {
            return changedProps.has('stateObj');
        }

        setConfig(config) {
            if (!config.entity) throw new Error('Please define an entity.');
            if (config.entity.split('.')[0] !== 'vacuum') throw new Error('Please define a vacuum entity.');
            const normalizedVendor = normalizeVendorKey(config.vendor);
            if (config.vendor && !normalizedVendor) throw new Error('Please define a valid vendor.');
            if (config.icon_rows !== undefined && Number(config.icon_rows) < 1) throw new Error('icon_rows must be at least 1.');

            const resolvedVendorKey = normalizedVendor || 'dreame';
            const vendor = vendors[resolvedVendorKey] || vendors.dreame || vendors.xiaomi;
            const commandIconRows = this.resolveCommandIconRows(config);
            const commandIcons = this.normalizeCommandIcons(config, commandIconRows);
            const hasButtons = config.buttons !== false;
            const hasCommandIcons = commandIcons.length > 0;
            const hasBackgroundImage = config.image !== false;

            this.config = {
                name: config.name,
                entity: config.entity,
                sensorEntity: `sensor.${config.entity.split('.')[1]}`,
                commandIconRows,
                commandIcons,
                show: {
                    name: config.name !== false,
                    state: config.state !== false,
                    attributes: config.attributes !== false,
                    buttons: hasButtons,
                    commandIcons: hasCommandIcons,
                },
                buttons: this.deepMerge(buttons, vendor.buttons, config.buttons),
                state: this.deepMerge(state, vendor.state, config.state),
                attributes: this.deepMerge(attributes, vendor.attributes, config.attributes),
                styles: {
                    background: this.resolveBackgroundStyle(config.image),
                    icon: `color: ${hasBackgroundImage ? 'white' : 'var(--paper-item-icon-color)'};`,
                    content: `padding: ${config.name !== false ? '8px' : '16px'} 16px ${(hasButtons || hasCommandIcons) ? '8px' : '16px'};`,
                },
            };
        }

        resolveBackgroundStyle(configImage) {
            if (configImage === false) return '';

            if (typeof configImage === 'string' && configImage.trim()) {
                return `background-image: url('${configImage.trim()}'); color: white; text-shadow: 0 0 10px black;`;
            }

            return "background-image: url('/local/img/vacuum.png'), url('/hacsfiles/lovelace-vacuum-cleaner-card/img/vacuum.png'); color: white; text-shadow: 0 0 10px black;";
        }

        resolveCommandIconRows(config) {
            const isObject = value => value && typeof value === 'object';

            if (config.icon_rows !== undefined) {
                return Math.max(1, Number(config.icon_rows) || 1);
            }

            // If using dynamic room_icons and icon_rows is omitted, infer row count from max configured row.
            if (Array.isArray(config.room_icons) && config.room_icons.length > 0) {
                const maxDynamicRow = config.room_icons.reduce((maxRow, iconConfig) => {
                    const configuredRow = Number(iconConfig && iconConfig.row);
                    if (!Number.isFinite(configuredRow) || configuredRow < 1) return maxRow;
                    return Math.max(maxRow, configuredRow);
                }, 1);
                return Math.max(1, maxDynamicRow);
            }

            // Legacy compatibility defaults: infer rows from rooms_row_one/rooms_row_two.
            const hasLegacyRowOne = isObject(config.rooms_row_one) && Object.keys(config.rooms_row_one).length > 0;
            const hasLegacyRowTwo = isObject(config.rooms_row_two) && Object.keys(config.rooms_row_two).length > 0;

            if (hasLegacyRowTwo) return 2;
            if (hasLegacyRowOne) return 1;
            return 1;
        }

        normalizeCommandIcons(config, commandIconRows) {
            const isObject = value => value && typeof value === 'object';
            const normalized = [];

            // New dynamic format: room_icons as an array with row/position/icon/service.
            if (Array.isArray(config.room_icons)) {
                config.room_icons.forEach((iconConfig, index) => {
                    if (!isObject(iconConfig)) return;

                    const service = iconConfig.service || iconConfig.command;
                    // Keep icons visible in UI even when service is not yet configured.
                    if (!iconConfig.icon) return;

                    const row = Math.max(1, Math.min(commandIconRows, Number(iconConfig.row) || 1));
                    const parsedPosition = Number(iconConfig.position);
                    const position = Number.isFinite(parsedPosition) ? parsedPosition : undefined;

                    normalized.push({
                        icon: iconConfig.icon,
                        label: iconConfig.label,
                        service: service || '',
                        service_data: iconConfig.service_data,
                        row,
                        position,
                        _index: index,
                    });
                });

                return normalized;
            }

            // Legacy compatibility: map static rooms_row_one/rooms_row_two configs.
            const legacyRows = [config.rooms_row_one, config.rooms_row_two];
            legacyRows.forEach((legacyRow, rowIndex) => {
                if (!isObject(legacyRow)) return;
                Object.values(legacyRow).forEach((entry, entryIndex) => {
                    if (!isObject(entry) || !entry.icon || !entry.service) return;
                    normalized.push({
                        icon: entry.icon,
                        label: entry.label,
                        service: entry.service,
                        service_data: entry.service_data,
                        row: Math.min(commandIconRows, rowIndex + 1),
                        position: entryIndex + 1,
                        _index: entryIndex,
                    });
                });
            });

            return normalized;
        }

        set hass(hass) {
            if (hass && this.config) {
                this.stateObj = this.config.entity in hass.states ? hass.states[this.config.entity] : null;
            }
            this._hass = hass;
        }

        handleChange(mode, key, service) {
            this.callService(service || `vacuum.set_${key}`, {entity_id: this.stateObj.entity_id, [key]: mode});
        }

        callService(service, data = {entity_id: this.stateObj.entity_id}) {
            if (!service || typeof service !== 'string' || !service.includes('.')) return;
            const [domain, name] = service.split('.', 2);
            if (!domain || !name) return;
            this._hass.callService(domain, name, data);
        }

        fireEvent(type, options = {}) {
            const event = new Event(type, {
                bubbles: options.bubbles ?? true,
                cancelable: options.cancelable ?? true,
                composed: options.composed ?? true,
            });
            event.detail = {entityId: this.stateObj.entity_id};
            this.dispatchEvent(event);
        }

        deepMerge(...sources) {
            const isObject = (obj) => obj && typeof obj === 'object';
            const target = {};

            sources.filter(source => isObject(source)).forEach(source => {
                Object.keys(source).forEach(key => {
                    const targetValue = target[key];
                    const sourceValue = source[key];

                    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
                        target[key] = targetValue.concat(sourceValue);
                    } else if (isObject(targetValue) && isObject(sourceValue)) {
                        target[key] = this.deepMerge(Object.assign({}, targetValue), sourceValue);
                    } else {
                        target[key] = sourceValue;
                    }
                });
            });

            return target;
        }
    }

    class VacuumCleanerCardEditor extends LitElement {
        static get properties() {
            return {
                hass: {},
                _config: {},
            };
        }

        static get styles() {
            return css`
.editor {
  display: grid;
  gap: 12px;
  padding: 12px 0;
}
.section {
  border: 1px solid var(--divider-color);
  border-radius: 8px;
  padding: 12px;
}
.section-title {
  font-weight: 600;
  margin-bottom: 8px;
}
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.row.single {
  grid-template-columns: 1fr;
}
.field {
  display: grid;
  gap: 4px;
}
.field label {
  font-size: 12px;
  color: var(--secondary-text-color);
}
.field input,
.field select {
  border: 1px solid var(--divider-color);
  border-radius: 6px;
  padding: 8px;
  background: var(--card-background-color);
  color: var(--primary-text-color);
}
.field ha-icon-picker {
    width: 100%;
}
.check {
  display: flex;
  align-items: center;
  gap: 6px;
}
.button-grid {
  display: grid;
  gap: 8px;
}
.row-groups {
    display: grid;
    gap: 10px;
}
.row-group {
    border: 1px solid var(--divider-color);
    border-radius: 6px;
    padding: 8px;
    transition: border-color 160ms ease, background-color 160ms ease;
}
.row-group.drop-target {
    border-color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 8%, transparent);
}
.row-group-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    font-weight: 600;
}
.button-item {
    position: relative;
  border: 1px solid var(--divider-color);
  border-radius: 6px;
  padding: 8px;
    cursor: grab;
    transition: border-color 140ms ease, transform 140ms ease, box-shadow 140ms ease, background-color 140ms ease;
}
.button-item.dragging {
    opacity: 0.7;
    border-color: var(--primary-color);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.14);
    transform: scale(0.99);
}
.button-item.drop-before::before,
.button-item.drop-after::after {
    content: '';
    position: absolute;
    left: 8px;
    right: 8px;
    height: 3px;
    border-radius: 2px;
    background: var(--primary-color);
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--primary-color) 25%, transparent);
}
.button-item.drop-before::before {
    top: -3px;
}
.button-item.drop-after::after {
    bottom: -3px;
}
.button-item-header {
  font-weight: 600;
  margin-bottom: 6px;
}
.drag-hint {
    font-weight: 400;
    font-size: 12px;
    color: orange;
    margin-left: 8px;
}
.actions {
  display: flex;
  gap: 8px;
}
.actions button {
  border: 1px solid var(--divider-color);
  border-radius: 6px;
  padding: 6px 10px;
  background: var(--card-background-color);
  color: var(--primary-text-color);
  cursor: pointer;
}
`;
        }

        setConfig(config) {
            const cloned = JSON.parse(JSON.stringify(config || {}));
            delete cloned.icon_rows;
            if (typeof cloned.vendor === 'string') {
                const trimmedVendor = cloned.vendor.trim();
                if (trimmedVendor) {
                    cloned.vendor = trimmedVendor;
                } else {
                    delete cloned.vendor;
                }
            } else {
                delete cloned.vendor;
            }
            this._config = {
                type: 'custom:vacuum-cleaner-card',
                ...cloned,
            };
            this.requestUpdate();
        }

        render() {
            if (!this._config) return html``;

            const vacuumEntities = this.hass
                ? Object.keys(this.hass.states).filter(entityId => entityId.startsWith('vacuum.'))
                : [];
            const currentEntity = this._config.entity || '';
            const selectedVendor = this._getSelectedVendor();
            const vendorOptions = this._getVendorOptions(selectedVendor);
            const roomIcons = this._getEditableButtonIcons(this._config);
            const groupedRoomIcons = this._groupRoomIcons(roomIcons);

            return html`
                <div class="editor">
                    <div class="section">
                        <div class="section-title">General</div>
                        <div class="row">
                            <div class="field">
                                <label>Entity</label>
                                <input
                                  type="text"
                                  list="vacuum-entity-options"
                                  .value=${currentEntity}
                                  @input=${e => this._updateConfig('entity', e.target.value)}
                                />
                                <datalist id="vacuum-entity-options">
                                    ${vacuumEntities.map(entityId => html`<option value=${entityId}></option>`)}
                                </datalist>
                            </div>
                            <div class="field">
                                <label>Name</label>
                                <input type="text" .value=${this._config.name || ''} @input=${e => this._updateConfig('name', e.target.value)} />
                            </div>
                        </div>
                        <div class="row">
                            <div class="field">
                                <label>Vendor</label>
                                <select @change=${e => this._handleVendorChange(e.target.value)}>
                                    ${vendorOptions.map(vendor => html`<option value=${vendor} ?selected=${vendor === selectedVendor}>${vendor}</option>`)}
                                </select>
                            </div>
                            <div class="field">
                                <label>Image URL</label>
                                <input type="text" .value=${this._config.image || ''} @input=${e => this._updateConfig('image', e.target.value || undefined)} />
                            </div>
                        </div>
                        <div class="row">
                            <div class="field">
                                <label>Standard Buttons Row</label>
                                <div class="check">
                                    <input
                                      type="checkbox"
                                      .checked=${this._config.buttons !== false}
                                      @change=${e => this._toggleStandardButtons(e.target.checked)}
                                    />
                                    <span>Show</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">Room Icons</div>
                        <div class="row-groups">
                            ${groupedRoomIcons.map(group => this._renderRoomIconRowGroup(group))}
                        </div>
                        <div class="actions">
                            <button type="button" @click=${this._addRoomIconRow}>Add Row</button>
                        </div>
                    </div>
                </div>
            `;
        }

        _renderRoomIconRowGroup(group) {
            const isRowDropTarget = this._dropTargetRow === group.row && this._dropTargetIndex === -1;
            return html`
                <div class="row-group ${isRowDropTarget ? 'drop-target' : ''}">
                    <div class="row-group-header">
                        <span>Row ${group.row}</span>
                        <div class="actions">
                            <button type="button" @click=${() => this._addButtonIconForRow(group.row)}>Add Icon</button>
                            ${group.canRemove ? html`<button type="button" @click=${() => this._removeRoomIconRow(group.row)}>Remove Row</button>` : null}
                        </div>
                    </div>
                    <div class="button-grid" @dragover=${e => this._onRowDragOver(e, group.row)} @drop=${e => this._onRowDrop(e, group.row)}>
                        ${group.entries.map(entry => this._renderButtonIconEditor(entry.item, entry.index, group.row))}
                    </div>
                </div>
            `;
        }

        _renderButtonIconEditor(item, index, row) {
            const isDragging = this._draggingIconIndex === index;
            const isDropTarget = this._dropTargetIndex === index && this._dropTargetRow === row;
            const dropClass = isDropTarget ? (this._dropAfterTarget ? 'drop-after' : 'drop-before') : '';
            const hasIconPicker = !!customElements.get('ha-icon-picker');
            return html`
                <div
                  class="button-item ${isDragging ? 'dragging' : ''} ${dropClass}"
                  draggable="true"
                  @dragstart=${e => this._onIconDragStart(e, index)}
                  @dragend=${this._onIconDragEnd}
                  @dragover=${e => this._onIconDragOverItem(e, index, row)}
                  @drop=${e => this._onIconDrop(e, index, row)}>
                    <div class="button-item-header"><span class="drag-hint">Drag to reorder</span></div>
                    <div class="row">
                        <div class="field">
                            <label>Label</label>
                            <input type="text" .value=${item.label || ''} @input=${e => this._updateButtonIcon(index, 'label', e.target.value)} />
                        </div>
                        <div class="field">
                            <label>Icon</label>
                            ${hasIconPicker
                                ? html`<ha-icon-picker
                                      .hass=${this.hass}
                                      .value=${item.icon || ''}
                                      @value-changed=${e => this._updateButtonIcon(index, 'icon', e.detail && e.detail.value ? e.detail.value : '')}>
                                   </ha-icon-picker>`
                                : html`<input type="text" .value=${item.icon || ''} @input=${e => this._updateButtonIcon(index, 'icon', e.target.value)} />`}
                        </div>
                    </div>
                    <div class="row">
                        <div class="field">
                            <label>Service</label>
                            <input type="text" .value=${item.service || ''} @input=${e => this._updateButtonIcon(index, 'service', e.target.value)} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="actions">
                            <button type="button" @click=${() => this._removeButtonIcon(index)}>Remove</button>
                        </div>
                    </div>
                </div>
            `;
        }

        _toggleStandardButtons(enabled) {
            if (!enabled) {
                this._updateConfig('buttons', false);
                return;
            }
            const next = {...this._config};
            delete next.buttons;
            this._emitConfig(next);
        }

        _getSelectedVendor() {
            const rawVendor = this._config && typeof this._config.vendor === 'string'
                ? this._config.vendor.trim()
                : '';
            if (!rawVendor) return 'dreame';

            const configured = normalizeVendorKey(rawVendor);
            if (configured) return configured;
            // Keep unknown values visible so the GUI reflects YAML faithfully.
            return rawVendor;
        }

        _getVendorOptions(selectedVendor) {
            const knownVendors = Object.keys(vendors);
            if (selectedVendor && !knownVendors.includes(selectedVendor)) {
                return [selectedVendor, ...knownVendors];
            }
            return knownVendors;
        }

        _resolveVendorForSave(value) {
            if (typeof value !== 'string') return undefined;
            const trimmed = value.trim();
            if (!trimmed) return undefined;

            const normalized = normalizeVendorKey(trimmed);
            if (normalized) return normalized;
            // Preserve unknown values instead of silently coercing to another vendor.
            return trimmed;
        }

        _isDefaultVendor(value) {
            return value === 'dreame';
        }

        _handleVendorChange(value) {
            const next = {...this._config};
            const resolvedValue = this._resolveVendorForSave(value);
            // Dreame is the implicit default and should not be persisted explicitly.
            if (!resolvedValue || this._isDefaultVendor(resolvedValue)) {
                delete next.vendor;
            } else {
                next.vendor = resolvedValue;
            }
            this._emitConfig(next);
        }

        _updateConfig(key, value) {
            const next = {...this._config};
            if (value === undefined || value === '') {
                delete next[key];
            } else {
                next[key] = value;
            }
            this._emitConfig(next);
        }

        _getEditableButtonIcons(config) {
            const roomIcons = Array.isArray(config.room_icons) && config.room_icons.length > 0
                ? config.room_icons
                : this._deriveButtonsAsIcons(config);
            const merged = [];
            const seen = new Set();

            roomIcons.forEach(item => {
                if (!item || typeof item !== 'object') return;
                const row = Math.max(1, Number(item.row) || 1);
                const position = Math.max(1, Number(item.position) || 1);
                const icon = item.icon || '';
                const service = item.service || item.command;

                const normalized = {
                    row,
                    position,
                    icon,
                    label: item.label,
                    service: service || '',
                    service_data: item.service_data,
                };
                const dedupeKey = `${row}|${position}|${icon}|${service}|${normalized.label || ''}`;
                if (seen.has(dedupeKey)) return;
                seen.add(dedupeKey);
                merged.push(normalized);
            });

            return merged.sort((a, b) => {
                if (a.row !== b.row) return a.row - b.row;
                if (a.position !== b.position) return a.position - b.position;
                return 0;
            });
        }

        _deriveButtonsAsIcons(config) {
            const configuredButtons = config && config.buttons && typeof config.buttons === 'object'
                ? config.buttons
                : {};
            const normalized = [];
            const seen = new Set();
            let nextPosition = 1;

            Object.keys(configuredButtons).forEach(key => {
                const entry = configuredButtons[key];
                if (!entry || typeof entry !== 'object') return;
                if (entry.show === false) return;

                const base = buttons[key] || {};
                const icon = entry.icon || base.icon;
                const service = entry.service || base.service;
                if (!icon || !service) return;

                const row = Math.max(1, Number(entry.row) || 1);
                const position = Math.max(1, Number(entry.position) || nextPosition);
                const label = entry.label || base.label || key;
                const service_data = entry.service_data;
                const dedupeKey = `${row}|${position}|${icon}|${service}|${label}`;
                if (seen.has(dedupeKey)) return;
                seen.add(dedupeKey);

                normalized.push({row, position, icon, label, service, service_data});
                nextPosition += 1;
            });

            return normalized.sort((a, b) => {
                if (a.row !== b.row) return a.row - b.row;
                if (a.position !== b.position) return a.position - b.position;
                return 0;
            });
        }

        _materializeButtonIcons(config) {
            return [...this._getEditableButtonIcons(config)];
        }

        _normalizeRoomIconPositions(roomIcons) {
            const grouped = new Map();
            roomIcons.forEach(item => {
                const row = Math.max(1, Number(item.row) || 1);
                if (!grouped.has(row)) grouped.set(row, []);
                grouped.get(row).push({...item, row});
            });

            const normalized = [];
            Array.from(grouped.keys()).sort((a, b) => a - b).forEach(row => {
                grouped.get(row)
                    .forEach((item, index) => {
                        const {
                            _index,
                            _originalIndex,
                            row: _ignoredRow,
                            position: _ignoredPosition,
                            ...persisted
                        } = item;
                        normalized.push({
                            ...persisted,
                            row,
                            position: index + 1,
                        });
                    });
            });

            return normalized;
        }

        _onIconDragStart(e, index) {
            this._draggingIconIndex = index;
            this._activeDragIndex = index;
            this._dropTargetIndex = index;
            this._dropTargetRow = undefined;
            this._dropAfterTarget = false;
            if (e.dataTransfer) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', String(index));
            }
            this.requestUpdate();
        }

        _onIconDragEnd = () => {
            // Some browsers can dispatch dragend before drop handlers complete.
            setTimeout(() => {
                if (this._dropInProgress) return;
                this._clearDragState();
            }, 0);
        }

        _clearDragState() {
            this._draggingIconIndex = undefined;
            this._activeDragIndex = undefined;
            this._dropTargetIndex = undefined;
            this._dropTargetRow = undefined;
            this._dropAfterTarget = false;
            this.requestUpdate();
        }

        _onIconDragOverItem(e, targetIndex, targetRow) {
            e.preventDefault();
            e.stopPropagation();
            if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';

            const bounds = e.currentTarget && e.currentTarget.getBoundingClientRect
                ? e.currentTarget.getBoundingClientRect()
                : null;
            const pointerY = e.clientY;
            const isAfter = bounds ? pointerY > (bounds.top + bounds.height / 2) : false;

            if (this._dropTargetIndex !== targetIndex || this._dropTargetRow !== targetRow || this._dropAfterTarget !== isAfter) {
                this._dropTargetIndex = targetIndex;
                this._dropTargetRow = targetRow;
                this._dropAfterTarget = isAfter;
                this.requestUpdate();
            }
        }

        _onRowDragOver(e, row) {
            e.preventDefault();
            if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';

            if (this._dropTargetRow !== row || this._dropTargetIndex !== -1) {
                this._dropTargetRow = row;
                this._dropTargetIndex = -1;
                this._dropAfterTarget = true;
                this.requestUpdate();
            }
        }

        _getDraggedIndex(e) {
            if (Number.isInteger(this._activeDragIndex)) return this._activeDragIndex;
            if (Number.isInteger(this._draggingIconIndex)) return this._draggingIconIndex;
            if (e && e.dataTransfer) {
                const parsed = Number(e.dataTransfer.getData('text/plain'));
                if (Number.isInteger(parsed)) return parsed;
            }
            return -1;
        }

        _onIconDrop(e, targetIndex, targetRow) {
            e.preventDefault();
            e.stopPropagation();
            this._dropInProgress = true;
            const sourceIndex = this._getDraggedIndex(e);
            this._moveButtonIcon(sourceIndex, targetIndex, targetRow, this._dropAfterTarget);
            this._dropInProgress = false;
            this._clearDragState();
        }

        _onRowDrop(e, targetRow) {
            e.preventDefault();
            e.stopPropagation();
            this._dropInProgress = true;
            const sourceIndex = this._getDraggedIndex(e);
            const hasTrackedItemTarget = Number.isInteger(this._dropTargetIndex)
                && this._dropTargetIndex >= 0
                && this._dropTargetRow === targetRow;
            const effectiveTargetIndex = hasTrackedItemTarget ? this._dropTargetIndex : -1;
            const dropAfterTarget = hasTrackedItemTarget ? this._dropAfterTarget : false;
            this._moveButtonIcon(sourceIndex, effectiveTargetIndex, targetRow, dropAfterTarget);
            this._dropInProgress = false;
            this._clearDragState();
        }

        _moveButtonIcon(sourceIndex, targetIndex, targetRow, dropAfterTarget = false) {
            if (!Number.isInteger(sourceIndex) || sourceIndex < 0) return;

            const next = {...this._config};
            const current = this._materializeButtonIcons(next);
            if (sourceIndex >= current.length) return;

            // Rebuild row lists using current visual order, then insert moved item at drop target.
            const decorated = current.map((item, idx) => ({...item, _originalIndex: idx}));
            const sourceItem = decorated[sourceIndex];
            if (!sourceItem) return;

            const destinationRow = Math.max(1, Number(targetRow) || Math.max(1, Number(sourceItem.row) || 1));
            const rows = new Map();

            decorated.forEach(item => {
                if (item._originalIndex === sourceIndex) return;
                const row = Math.max(1, Number(item.row) || 1);
                if (!rows.has(row)) rows.set(row, []);
                rows.get(row).push(item);
            });

            if (!rows.has(destinationRow)) rows.set(destinationRow, []);
            const destinationList = rows.get(destinationRow);

            let insertAt = destinationList.length;
            if (Number.isInteger(targetIndex) && targetIndex >= 0 && targetIndex < decorated.length) {
                const targetItem = decorated[targetIndex];
                if (targetItem && targetItem._originalIndex !== sourceIndex) {
                    const targetPos = destinationList.findIndex(item => item._originalIndex === targetItem._originalIndex);
                    if (targetPos >= 0) {
                        insertAt = targetPos + (dropAfterTarget ? 1 : 0);
                    }
                }
            }

            const moved = {...sourceItem, row: destinationRow};
            destinationList.splice(Math.max(0, Math.min(insertAt, destinationList.length)), 0, moved);

            const reordered = [];
            Array.from(rows.keys()).sort((a, b) => a - b).forEach(row => {
                rows.get(row).forEach(item => reordered.push({...item, row}));
            });

            next.room_icons = this._normalizeRoomIconPositions(reordered);
            this._emitConfig(next);
        }

        _groupRoomIcons(roomIcons) {
            const grouped = new Map();

            roomIcons.forEach((item, index) => {
                const row = Math.max(1, Number(item.row) || 1);
                if (!grouped.has(row)) grouped.set(row, []);
                grouped.get(row).push({item: {...item, row}, index});
            });

            const rows = Array.from(grouped.keys()).sort((a, b) => a - b);
            if (rows.length === 0) {
                return [{row: 1, entries: [], canRemove: false}];
            }

            return rows.map(row => {
                const entries = grouped.get(row)
                    .sort((a, b) => {
                        const posA = Math.max(1, Number(a.item.position) || 1);
                        const posB = Math.max(1, Number(b.item.position) || 1);
                        return posA - posB;
                    });
                return {row, entries, canRemove: rows.length > 1};
            });
        }

        _addButtonIconForRow(row) {
            const next = {...this._config};
            const current = this._materializeButtonIcons(next);
            const rowIcons = current.filter(item => Math.max(1, Number(item.row) || 1) === row);
            current.push({
                row,
                position: rowIcons.length + 1,
                icon: 'mdi:map-marker',
                label: '',
                service: '',
            });
            next.room_icons = this._normalizeRoomIconPositions(current);
            this._emitConfig(next);
        }

        _addRoomIconRow = () => {
            const next = {...this._config};
            const current = this._materializeButtonIcons(next);
            const maxRow = current.reduce((max, item) => Math.max(max, Math.max(1, Number(item.row) || 1)), 0);
            const row = Math.min(10, maxRow + 1);

            current.push({
                row,
                position: 1,
                icon: 'mdi:map-marker',
                label: '',
                service: '',
            });
            next.room_icons = this._normalizeRoomIconPositions(current);
            this._emitConfig(next);
        }

        _removeRoomIconRow(row) {
            const next = {...this._config};
            const current = this._materializeButtonIcons(next);
            const filtered = current.filter(item => Math.max(1, Number(item.row) || 1) !== row);
            const rowOrder = Array.from(new Set(filtered
                .map(item => Math.max(1, Number(item.row) || 1))
                .sort((a, b) => a - b)));
            const rowMap = new Map(rowOrder.map((value, index) => [value, index + 1]));

            next.room_icons = filtered.map(item => ({
                ...item,
                row: rowMap.get(Math.max(1, Number(item.row) || 1)) || 1,
            }));
            next.room_icons = this._normalizeRoomIconPositions(next.room_icons);
            this._emitConfig(next);
        }

        _removeButtonIcon(index) {
            const next = {...this._config};
            const current = this._materializeButtonIcons(next);
            next.room_icons = current.filter((_, i) => i !== index);
            this._emitConfig(next);
        }

        _updateButtonIcon(index, field, value) {
            const next = {...this._config};
            const current = this._materializeButtonIcons(next);
            const item = {...(current[index] || {})};

            if (value === '' || value === undefined) {
                delete item[field];
            } else {
                item[field] = value;
            }

            current[index] = item;
            next.room_icons = this._normalizeRoomIconPositions(current);
            this._emitConfig(next);
        }

        _emitConfig(config) {
            if (config && typeof config === 'object') {
                delete config.icon_rows;
            }
            this._config = config;
            this.dispatchEvent(new CustomEvent('config-changed', {
                detail: {config},
                bubbles: true,
                composed: true,
            }));
        }
    }

    if (!customElements.get('vacuum-cleaner-card-editor')) {
        customElements.define('vacuum-cleaner-card-editor', VacuumCleanerCardEditor);
    }
    if (!customElements.get('vacuum-cleaner-card')) {
        customElements.define('vacuum-cleaner-card', VacuumCleanerCard);
    }
})(window.LitElement || Object.getPrototypeOf(
    customElements.get('ha-panel-lovelace')
    || customElements.get('hui-masonry-view')
    || customElements.get('hui-view')
));
