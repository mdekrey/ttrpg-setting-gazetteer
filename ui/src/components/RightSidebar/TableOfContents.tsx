import type { TocItem } from '@/util/generateToc';
import { mobileMenuState } from '@/util/mobile-menu-state';
import { unescape } from 'html-escaper';
import React, { useState, useEffect } from 'react';

interface Props {
	toc: TocItem[];
}

function TableOfContentsItem({ heading, currentHeadingSlug, onLinkClick }: { heading: TocItem; currentHeadingSlug: string; onLinkClick: React.MouseEventHandler<HTMLAnchorElement>; }) {
	const { slug, text, children } = heading;
	return (
		<li>
			<a
				className={currentHeadingSlug === slug ? 'bg-blue-200 font-bold block px-1' : 'block px-1'}
				href={`#${slug}`}
				onClick={onLinkClick}
			>
				{unescape(text)}
			</a>
			{children.length > 0 ? (
				<ul className="ml-2 pt-1">
					{children.map((heading) => (
						<TableOfContentsItem key={heading.slug} heading={heading} currentHeadingSlug={currentHeadingSlug} onLinkClick={onLinkClick} />
					))}
				</ul>
			) : null}
		</li>
	);
}

const TableOfContents = ({ toc }: Props) => {
	const [currentHeading, setCurrentHeading] = useState(toc[0]?.slug ?? '');
	const onThisPageID = 'on-this-page-heading';

	useEffect(() => {
		const setCurrent: IntersectionObserverCallback = (entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					const { id } = entry.target;
					if (id === onThisPageID) continue;
					setCurrentHeading(entry.target.id);
					break;
				}
			}
		};

		const observerOptions: IntersectionObserverInit = {
			// Negative top margin accounts for `scroll-margin`.
			// Negative bottom margin means heading needs to be towards top of viewport to trigger intersection.
			rootMargin: `${window.getComputedStyle(document.documentElement).getPropertyValue('scroll-padding-top')} 0% -66%`,
			threshold: 1,
		};

		const headingsObserver = new IntersectionObserver(setCurrent, observerOptions);

		// Observe all the headings in the main page content.
		document.querySelectorAll('article :is(h1,h2,h3)').forEach((h) => headingsObserver.observe(h));

		// Stop observing when the component is unmounted.
		return () => headingsObserver.disconnect();
	}, []);

	const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		mobileMenuState.current = null;
		setCurrentHeading(e.currentTarget.getAttribute('href')!.replace('#', ''));
	};

	return (
		<>
			<h2 className="mb-4 font-bold text-blue-dark">Table of Contents</h2>
			<ul>
				{toc.map((heading) => (
					<TableOfContentsItem key={heading.slug} heading={heading} currentHeadingSlug={currentHeading} onLinkClick={onLinkClick} />
				))}
			</ul>
		</>
	);
};

export default TableOfContents;