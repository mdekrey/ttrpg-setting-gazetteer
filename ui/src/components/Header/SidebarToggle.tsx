import { OpenMobileMenu, useMobileMenuState } from '@/util/mobile-menu-state';
import { useEffect } from 'react';

const MenuToggle = ({ className, sidebarClass, mobileMenu, children, title }: { className: string; sidebarClass: string; mobileMenu: OpenMobileMenu; children?: React.ReactNode; title: string }) => {
	const [currentMobileMenu, setMobileMenu] = useMobileMenuState();

	const isActive = currentMobileMenu === mobileMenu;

	useEffect(() => {
		const body = document.getElementsByTagName('body')[0]!;

		if (isActive) {
			body.classList.add(sidebarClass);
			document.querySelectorAll('aside nav details').forEach((e) => {
				e.removeAttribute('open');
			});
			document
				.querySelector('details a[data-current-parent="true"]')
				?.closest('details')
				?.setAttribute('open', '');
		} else {
			body.classList.remove(sidebarClass);
			document.querySelectorAll('aside nav details').forEach((e) => {
				e.setAttribute('open', '');
			});
		}
	}, [isActive]);

	return (
		<button
			className={className}
			data-sidebar-class={sidebarClass}
			type="button"
			aria-pressed={isActive ? 'true' : 'false'}
			onClick={toggleMenu}
		>
			{children}
			<span className="sr-only">{title}</span>
		</button>
	);

	function toggleMenu() {
		setMobileMenu(isActive ? null : mobileMenu);
	}
};

export default MenuToggle;