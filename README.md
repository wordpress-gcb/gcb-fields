# @gcb/fields

GCB's typed-field UI as a standalone package: the control components, the
inspector renderer (`block.fields.json` → settings panel), and the
conditional-logic / validation helpers — **with no dependency on the GCB
WordPress plugin's globals or REST endpoints**.

This is the free, open core of GCB. The Lite plugin consumes it; headless setups
can use it directly. See `~/sites/gcb/README.md` for how this fits the whole
project, and `gcb-pro/docs/eject-blocks-scope.md` for the architecture rationale.

**Status: skeleton.** The public API surface and the injected-config contract are
defined (`src/index.js`); the control source is extracted from the plugin in a
later step — see `EXTRACTION.md`.

## Why it exists

The plugin currently bakes the controls into itself and feeds them via
`window.gcbLite` + plugin REST. That couples the field UI to the plugin. Pulling
it into `@gcb/fields` means:

- headless editors get the exact same controls without the plugin;
- "eject" can scaffold a block that uses the SDK and works plugin-free;
- graceful degradation: static `block.json` is the floor, the SDK restores live UI.

## Host contract (what you inject)

The plugin used to read these off `window.gcbLite`; here they're explicit:

| Inject | Replaces | For |
| --- | --- | --- |
| `controls` (arg to `renderInspector`) | `window.gcbLite.blocks[name].controls` | the fields to render |
| `tokens` | `window.gcbLite.tokens` | token-aware controls (select, range, spacing) |
| `googleMapsEnabled` | `window.gcbLite.googleMaps.hasApiKey` | the google-map control |
| `media` adapter | `wp.media` / block-editor `MediaUpload` | image / gallery / file / richtext |
| `apiFetch` (optional) | `@wordpress/api-fetch` | reference controls — **core `wp/v2` only** |
| `variant` | `ControlContext` | `'sidebar'` (popovers) vs `'metabox'` (modals) |

## Not included (stays in the plugin)

The `gcb/repeater` **block** + `useRepeaterSeeding` / `useRepeaterValidation`
(editor-coupled: clientId, block/editor stores, the validation transient), the
PHP-preview pipeline, focus-field handling, the admin builder. The `repeater`
**control** (form-of-forms field) IS included — don't confuse the two.

## Peer vs bundled deps

- **peerDependencies:** all `@wordpress/*` — provided by the host editor.
- **bundled:** `@dnd-kit/*`, `@tiptap/*` — not part of the WP runtime.
