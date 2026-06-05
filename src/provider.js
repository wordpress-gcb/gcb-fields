/**
 * GcbFieldsProvider — the SDK's injected-config boundary.
 *
 * The controls used to read host data off `window.gcbLite` directly. To make the
 * package plugin-independent, that data is now provided via this context:
 *
 *   <GcbFieldsProvider value={{ tokens, googleMapsEnabled, media, apiFetch }}>
 *     ...controls / inspector...
 *   </GcbFieldsProvider>
 *
 * Every field is optional. To keep the *existing plugin* working unchanged when
 * it adopts the SDK (and to support drop-in headless use), each accessor falls
 * back to the legacy `window.gcbLite` global when the context doesn't supply a
 * value. So:
 *   - plugin (provides nothing yet) → falls back to window.gcbLite, works as before;
 *   - headless host → wraps the tree in the provider and injects its own values.
 *
 * config shape:
 *   tokens            object  design-token tree (was window.gcbLite.tokens)
 *   googleMapsEnabled boolean gate for the google-map control (was .googleMaps.hasApiKey)
 *   media             object  optional media-picker adapter (else block-editor/wp.media)
 *   apiFetch          fn      optional REST fetcher for reference controls (else @wordpress/api-fetch)
 */

import { createContext, useContext } from '@wordpress/element';

export const GcbFieldsContext = createContext(null);

export function GcbFieldsProvider({ value, children }) {
	return (
		<GcbFieldsContext.Provider value={value || {}}>
			{children}
		</GcbFieldsContext.Provider>
	);
}

/** Legacy global fallback so the plugin keeps working before it injects config. */
function legacyGlobal() {
	return (typeof window !== 'undefined' && window.gcbLite) || {};
}

/** Full resolved config (context first, window.gcbLite fallback). */
export function useGcbFieldsConfig() {
	return useContext(GcbFieldsContext) || {};
}

/** Design-token tree. */
export function useTokensConfig() {
	const cfg = useContext(GcbFieldsContext) || {};
	if (cfg.tokens !== undefined) return cfg.tokens || {};
	return legacyGlobal().tokens || {};
}

/** Whether the google-map control should enable Maps features. */
export function useGoogleMapsEnabled() {
	const cfg = useContext(GcbFieldsContext) || {};
	if (cfg.googleMapsEnabled !== undefined) return !!cfg.googleMapsEnabled;
	return !!legacyGlobal().googleMaps?.hasApiKey;
}
