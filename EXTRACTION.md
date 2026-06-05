# Extraction plan — moving the controls out of the plugin

Step-by-step for turning `gcb-lite/src/controls/*` (+ inspector + helpers) into
this package, **without breaking the running plugin**. Based on the coupling map
in `gcb-pro/docs/eject-blocks-scope.md`. Do it in order; the plugin stays green
the whole way (run its JS tests after each step).

## Files to move into `fields-sdk/src/` (the package boundary)

From `gcb-lite/src/`:
- `inspector.js`
- `conditional-logic.js`
- `validation-context.js`
- `control-context.js`
- `controls/*` (all ~35 + shared infra: PopoverOrModal, MediaPicker,
  MediaCapabilityGate, MediaTriggerBadges, SortableItem, index.js)
- `hooks/useTokens.js`
- `utils/map-utils.js`
- `utils/token-helper.js`

Stay in the plugin (do NOT move): `index.js`, `builder.jsx`, `post-fields.js`,
`sidebar-fields.js`, `hooks/usePHPPreview.js`, `hooks/useRepeaterSeeding.js`,
`hooks/useRepeaterValidation.js`, `utils/{parse-preview,batch-render-coordinator,
panelOpenStore,validation-notice,focusField,repeater-config}.js`, `validation.js`,
`FrontendUrlBar.jsx`.

## Decouple (the only real work — ~4 reads + 1 global)

Replace plugin-global reads with injected config (a `GcbFieldsProvider` context +
explicit args):

1. **`window.gcbLite.tokens`** (in `utils/token-helper.js` / `hooks/useTokens.js`)
   → read from a `tokens` context value the host provides.
2. **`window.gcbLite.googleMaps.hasApiKey`** (`controls/google-map.js`) → a
   `googleMapsEnabled` context flag. (`.apiKey` is read-but-unused in JS — drop.)
3. **`wp.media`** (`controls/MediaPicker.js`, `controls/richtext.js` metabox path)
   → a `media` adapter from context; sidebar path keeps block-editor `MediaUpload`.
4. **`apiFetch`** (post-object, taxonomy, user, icon) → default to
   `@wordpress/api-fetch`, allow a context override. Endpoints are core `wp/v2`,
   so no plugin needed.
5. **`window.gcbValidationErrors`** — NOT in this package (repeater validation
   stays plugin-side). The `repeater` *control* itself has no such dependency.

## Wire the plugin to consume the package

After the move, `gcb-lite` imports from `@gcb/fields` instead of `./controls`,
and wraps its inspector in `<GcbFieldsProvider tokens=… media=… variant=…>` fed
from the values it currently localises. Net behaviour identical — verify with the
existing Jest suite (`inspector.test.js`, `validation.test.js`, etc.) and a manual
editor pass.

## Packaging

- peerDeps: `@wordpress/*` (already set in package.json).
- bundle: dnd-kit, tiptap (already set).
- Build: decide ESM source ship vs a wp-scripts/rollup build. Plugin builds with
  wp-scripts and externalises `@wordpress/*`, so shipping ESM source + letting the
  consumer's build handle it is simplest to start.

## Risk

The risk is regression in the *existing plugin* when it switches to the package,
not in writing new code. Move in small commits, keep the plugin's tests green,
manual-test the editor (all control types render, repeater control works, media
picker works in both sidebar + metabox).
