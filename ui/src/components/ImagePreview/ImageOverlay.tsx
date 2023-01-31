import { Lightbox } from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { useSlidesState } from './slidesState';

export function ImageOverlay() {
	const [isLightboxOpen, slides, setIsLightboxOpen] = useSlidesState();

	return (
		<Lightbox
			open={isLightboxOpen !== false}
			index={isLightboxOpen === false ? 0 : isLightboxOpen}
			close={() => setIsLightboxOpen(false)}
			slides={[...slides]}
			plugins={[Zoom]}
		/>
	);
}
