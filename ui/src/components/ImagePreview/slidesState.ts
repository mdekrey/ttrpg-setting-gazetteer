import {
	createSubscribableList,
	createSubscribableValue,
} from '@/util/subscribables';
import type { ImageMetadata } from '@astrojs/image/dist/vite-plugin-astro-image';
import { useRef, useSyncExternalStore } from 'react';
import type { Slide } from 'yet-another-react-lightbox/dist/types';

export const lightboxSlides = createSubscribableList<Slide>();
export const lightboxOpen = createSubscribableValue<false | number>(false);

export function useSlidesState() {
	const slides = useSyncExternalStore(
		(cb) => lightboxSlides.subscribe(cb),
		() => lightboxSlides.get(),
		() => lightboxSlides.get()
	);
	const isLightboxOpen = useSyncExternalStore(
		(cb) => lightboxOpen.subscribe(cb),
		() => lightboxOpen.get(),
		(): false => false
	);
	return [isLightboxOpen, slides, lightboxOpen.set] as const;
}

export function useAddSlide(image: ImageMetadata) {
	const isAdded = useRef<false | number>(false);
	if (isAdded.current === false) {
		isAdded.current = lightboxSlides.add(image);
	}
	return isAdded.current;
}
