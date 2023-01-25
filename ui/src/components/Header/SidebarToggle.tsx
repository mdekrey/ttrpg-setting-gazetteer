import { useState } from 'react';

const MenuToggle = ({ className, sidebarClass, otherSidebarClasses, children, title }: { className: string; sidebarClass: string; otherSidebarClasses: string[]; children?: React.ReactNode; title: string }) => {
	const [sidebarShown, setSidebarShown] = useState(false);

	return (
		<button
			className={className}
			data-sidebar-class={sidebarClass}
			type="button"
			aria-pressed={sidebarShown ? 'true' : 'false'}
			onClick={toggleMenu}
		>
			{children}
			<span className="sr-only">{title}</span>
		</button>
	);

	function toggleMenu() {
		const body = document.getElementsByTagName('body')[0]!;
		const sidebarShown = body.classList.contains(sidebarClass);
		setSidebarShown(!sidebarShown);
		if (!sidebarShown) {
			body.classList.remove(...otherSidebarClasses);
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
	}
};

export default MenuToggle;