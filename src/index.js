/**
 * @gcb/fields — public API.
 *
 * The GCB typed-field UI as a standalone package: control components, the
 * inspector renderer that turns a `block.fields.json` `controls` array into a
 * settings panel, conditional-logic + validation helpers, and the design-token
 * helpers. No hard dependency on the GCB WordPress plugin — host data
 * (tokens, google-maps gate, etc.) is supplied via <GcbFieldsProvider>, with a
 * window.gcbLite fallback so the existing plugin keeps working unchanged while
 * it adopts the SDK.
 *
 * Not included (stays in the plugin — see gcb-pro/docs/eject-blocks-scope.md):
 * the gcb/repeater InnerBlocks *block* + useRepeaterSeeding/useRepeaterValidation
 * (editor-coupled), the PHP-preview pipeline, focus-field handling, the admin
 * builder. The repeater *control* (form-of-forms field) IS included.
 */

// Injected-config boundary.
export {
	GcbFieldsProvider,
	GcbFieldsContext,
	useGcbFieldsConfig,
	useTokensConfig,
	useGoogleMapsEnabled,
} from './provider';

// Inspector renderer + the control registry.
export { renderInspector } from './inspector';
export { controlComponents } from './controls';

// Conditional logic + validation/control contexts (host-overridable).
export { shouldRender, panelsContainingErrors, STRUCTURAL_TYPES } from './conditional-logic';
export { ValidationContext } from './validation-context';
export { ControlContext } from './control-context';

// Token helpers (for custom token-aware UI outside the standard controls).
export { useTokens, getTokensByGroup, generateMapFromTokens } from './hooks/useTokens';
export { getAllTokenGroups } from './utils/token-helper';
