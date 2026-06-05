# @wordpress-gcb/fields

Typed-field UI for the WordPress block editor: control components, an inspector
renderer that turns a `block.fields.json` schema into a settings panel, plus
conditional-logic and validation helpers — **decoupled from any plugin**. Host
data (design tokens, media picker, etc.) is injected, so the same controls run
inside the [GCB Lite plugin](https://github.com/wordpress-gcb/gutenberg-control-blocks-lite),
a meta box, or a headless editor.

This is the free, open core of **[GCB](https://gutenbergcontrolblocks.com)** —
[Gutenberg Control Blocks](https://gutenbergcontrolblocks.com).

## Install

```bash
npm install @wordpress-gcb/fields
```

`@wordpress/*` are peer dependencies — provided by the WordPress editor runtime
(or your build's externals). `@dnd-kit/*` and `@tiptap/*` ship bundled.

## Usage

```jsx
import { GcbFieldsProvider, renderInspector } from '@wordpress-gcb/fields';

// controls = the `controls` array from a block.fields.json
<GcbFieldsProvider value={{ tokens, googleMapsEnabled: true }}>
  {renderInspector(controls, attributes, setAttributes)}
</GcbFieldsProvider>
```

Each control receives `{ control, value, onChange, attributes }`. The provider
supplies what the controls need from the host:

| Inject | For |
| --- | --- |
| `tokens` | token-aware controls (select, range, spacing) |
| `googleMapsEnabled` | the google-map control |
| `media` | media picker adapter (image / gallery / file / richtext) |
| `apiFetch` | reference controls — calls core `wp/v2` (optional; defaults to `@wordpress/api-fetch`) |
| `variant` | `'sidebar'` (popovers) vs `'metabox'` (modals) |

All are optional; with none provided the package falls back to the WordPress
editor globals.

## Exports

- `renderInspector(controls, attributes, setAttributes, options?)`
- `controlComponents` — the control registry (`type` → component)
- `GcbFieldsProvider`, `useGcbFieldsConfig`
- `shouldRender`, `panelsContainingErrors`, `STRUCTURAL_TYPES`
- `ValidationContext`, `ControlContext`
- token helpers: `useTokens`, `getTokensByGroup`, `getAllTokenGroups`

## Links

- **Website:** <https://gutenbergcontrolblocks.com>
- **Source:** <https://github.com/wordpress-gcb/gcb-fields>
- **Issues:** <https://github.com/wordpress-gcb/gcb-fields/issues>
- **GCB Lite plugin:** <https://github.com/wordpress-gcb/gutenberg-control-blocks-lite>

## License

GPL-2.0-or-later
