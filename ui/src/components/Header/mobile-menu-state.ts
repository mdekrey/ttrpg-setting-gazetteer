import { useSyncExternalStore } from 'react';
import { createSubscribableValue } from '../../util/subscribables';

export type OpenMobileMenu = null | 'primary' | 'secondary';

export const mobileMenuState = createSubscribableValue<OpenMobileMenu>(null);

export function useMobileMenuState() {
	const current = useSyncExternalStore(
		(cb) => mobileMenuState.subscribe(cb),
		() => mobileMenuState.get(),
		() => null
	);
	return [current, mobileMenuState.set] as const;
}
