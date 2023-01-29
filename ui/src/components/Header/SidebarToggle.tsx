import { OpenMobileMenu, useMobileMenuState } from '@/components/Header/mobile-menu-state';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const MenuToggle = ({ sidebarClass, mobileMenu, children, title }: { sidebarClass: string; mobileMenu: OpenMobileMenu; children?: React.ReactNode; title: string }) => {
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
			// document.querySelectorAll('aside nav details').forEach((e) => {
			// 	e.setAttribute('open', '');
			// });
		}
	}, [isActive]);

	return (
		<button
			className={twMerge('border rounded-md border-transparent bg-transparent p-2 md:hidden', isActive && 'border-slate-500 bg-slate-200')}
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