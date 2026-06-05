/**
 * @gcb/fields — public API.
 *
 * SKELETON. The control/inspector source is extracted from the plugin
 * (gcb-lite) in a later step; this file fixes the package's public surface and
 * the injected-config contract so the extraction has a target to fill.
 *
 * What this package is: the GCB typed-field UI — the control components, the
 * inspector renderer that turns a `block.fields.json` `controls` array into a
 * settings panel, and the conditional-logic/validation helpers — with NO
 * dependency on the WordPress plugin's globals or REST endpoints. Those become
 * INJECTED CONFIG (see GcbFieldsProvider below).
 *
 * Host contract (the things the plugin used to read off window.gcbLite):
 *   - controls:        you pass the controls array to renderInspector (it was
 *                      window.gcbLite.blocks[name].controls).
 *   - tokens:          design-token tree for token-aware controls (select,
 *                      range, spacing) — was window.gcbLite.tokens.
 *   - googleMapsEnabled: boolean gate for the google-map control — was
 *                      window.gcbLite.googleMaps.hasApiKey.
 *   - media:           an adapter for picking media — the plugin's
 *                      MediaPicker/MediaCapabilityGate shims already abstract
 *                      sidebar (block-editor MediaUpload) vs metabox (wp.media).
 *   - apiFetch:        optional REST fetcher for reference controls (post-object,
 *                      taxonomy, user, icon). Defaults to @wordpress/api-fetch;
 *                      a headless host can inject its own. These hit core wp/v2,
 *                      not plugin endpoints.
 *   - variant:         'sidebar' | 'metabox' — chooses popover vs modal UI.
 *
 * Explicitly NOT in this package (stays in the plugin — see the coupling map in
 * gcb-pro/docs/eject-blocks-scope.md): the gcb/repeater InnerBlocks block and
 * its useRepeaterSeeding/useRepeaterValidation hooks (editor-coupled: clientId,
 * core/block-editor + core/editor stores, the validation-state transient), the
 * PHP-preview pipeline, the focus-field click handling, and the admin builder.
 * NB: the `repeater` *control* (a form-of-forms field) IS in this package; the
 * `gcb/repeater` *block* is not. Two different things.
 */

// --- to be filled by the extraction step (moved from gcb-lite/src) ---
// export { renderInspector } from './inspector';
// export { controlComponents } from './controls';
// export { shouldRender, STRUCTURAL_TYPES } from './conditional-logic';
// export { ValidationContext } from './validation-context';
// export { ControlContext } from './control-context';
// export { GcbFieldsProvider } from './provider'; // supplies tokens/media/apiFetch/etc.

export const __PACKAGE_STATUS__ = 'skeleton: API surface defined, source not yet extracted';
