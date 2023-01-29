import type { ImageMetadata } from '@astrojs/image/dist/vite-plugin-astro-image';
import { lightboxOpen, useAddSlide } from './slidesState';
import "yet-another-react-lightbox/styles.css";

export function PictureButton({ className, image, children }: { className?: string, image: ImageMetadata, children: React.ReactNode }) {
	const index = useAddSlide(image);

	return (
		<button type="button" className={className} onClick={launchOverlay}>
			{children}
		</button>
	);

	function launchOverlay() {
		lightboxOpen.set(index);
	}
}