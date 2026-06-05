/**
 * useTokens — theme.json + built-in design tokens.
 *
 * Theme tokens come from GcbFieldsProvider when a host injects them, else fall
 * back to window.gcbLite.tokens (handled inside useTokensConfig). Built-ins are
 * merged in by getAllTokenGroups.
 */
import { useState, useEffect } from '@wordpress/element';
import { getAllTokenGroups } from '../utils/token-helper';
import { useTokensConfig } from '../provider';

export function useTokens() {
	const themeTokens = useTokensConfig();
	const [tokens, setTokens] = useState(() => getAllTokenGroups(themeTokens));

	useEffect(() => {
		setTokens(getAllTokenGroups(themeTokens));
	}, [themeTokens]);

	return { tokens, loading: false, error: null };
}

/**
 * Resolve a `tokenGroup` value (e.g. "custom:gap") to its tokens array.
 */
export function getTokensByGroup(allTokens, tokenGroup) {
	if (!allTokens || !tokenGroup) return null;
	const [categoryKey, subKey] = tokenGroup.split(':');
	const category = allTokens[categoryKey];
	if (!category?.children) return null;
	return category.children[subKey]?.tokens || null;
}

/**
 * Build a `key → { label, token }` map for SelectField / RangeField legacy shape.
 */
export function generateMapFromTokens(tokens) {
	if (!Array.isArray(tokens)) return null;
	const map = {};
	tokens.forEach((t) => {
		map[t.key] = { label: t.label, token: t.slug || t.value };
	});
	return map;
}
