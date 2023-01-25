import { useSyncExternalStore } from "react";

export type OpenMobileMenu = null | 'primary' | 'secondary';

function createSubscribable() {
	const subscribers: (() => void)[] = [];
	return {
		trigger() {
			subscribers.forEach(subscription => subscription());
		},
		subscribe(callback: () => void) {
			subscribers.push(callback);
			return () => {
				const idx = subscribers.indexOf(callback);
				if (idx >= 0) subscribers.splice(idx, 1);
			};
		}
	};
}

class MobileMenuState {
	private _current: OpenMobileMenu = null;
	private _subscribers = createSubscribable();
	get current() { return this._current; }
	set current(value: OpenMobileMenu) {
		this._current = value;
		this._subscribers.trigger();
	}

	subscribe(callback: () => void) {
		return this._subscribers.subscribe(callback);
	}
}

export const mobileMenuState = new MobileMenuState();

export function useMobileMenuState() {
	const current = useSyncExternalStore((cb) => mobileMenuState.subscribe(cb), () => mobileMenuState.current, () => null);
	return [current, (value: OpenMobileMenu) => { mobileMenuState.current = value; }] as const;
}
