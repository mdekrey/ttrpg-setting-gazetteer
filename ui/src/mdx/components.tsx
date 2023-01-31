import { Children, cloneElement, ComponentProps, ReactNode } from 'react';
import type { MDXProvider } from '@mdx-js/react';
import { mergeStyles } from '@/core/jsx/mergeStyles';
import { JsxMutator, pipeJsx } from '@/core/jsx/pipeJsx';
import { twMerge } from 'tailwind-merge';
import { recurse } from '@/core/jsx/recurse';

const headerLink: JsxMutator = (el) => {
	if (el.props.id) return el;
	const id = Children.map(el.props.children as ReactNode[], (child) => {
		if (typeof child === 'string') return child;
		return '';
	})
		?.filter((v) => v)
		?.join(' ')
		.trim()
		.replaceAll(/[']/g, '')
		.replaceAll(/[^a-zA-Z0-9]/g, '-')
		.replaceAll(/-+/g, '-');
	if (id)
		return cloneElement(el, {
			...el.props,
			id,
		});
	return el;
};

export const headerTemplate = mergeStyles(
	<i
		className={twMerge('font-header font-bold', 'mt-4 first:mt-0')}
		style={{ pageBreakAfter: 'avoid' }}
	/>
);
export const rowTemplate = mergeStyles(
	<tr className="even:bg-gradient-to-r from-tan-fading to-white odd:bg-tan-accent border-b-2 border-white font-info" />
);
export const infoFontTemplate = mergeStyles(<i className="font-info" />);

export const components: ComponentProps<typeof MDXProvider>['components'] = {
	h1: ({ children, className, ...props }: JSX.IntrinsicElements['h1']) =>
		pipeJsx(
			<h2 className={twMerge('text-theme text-2xl', className)} {...props}>
				{children}
			</h2>,
			headerTemplate,
			headerLink
		),
	h2: ({ children, className, ...props }: JSX.IntrinsicElements['h2']) =>
		pipeJsx(
			<h3 className={twMerge('text-theme text-xl', className)} {...props}>
				{children}
			</h3>,
			headerTemplate,
			headerLink
		),
	h3: ({ children, className, ...props }: JSX.IntrinsicElements['h3']) =>
		pipeJsx(
			<h4 className={twMerge('text-lg', className)} {...props}>
				{children}
			</h4>,
			headerTemplate,
			headerLink
		),
	h4: ({ children, className, ...props }: JSX.IntrinsicElements['h4']) =>
		pipeJsx(
			<h5 className={twMerge('text-base', className)} {...props}>
				{children}
			</h5>,
			headerTemplate,
			headerLink
		),
	h5: ({ children, className, ...props }: JSX.IntrinsicElements['h5']) =>
		pipeJsx(
			<h6 className={twMerge('text-sm', className)} {...props}>
				{children}
			</h6>,
			headerTemplate,
			headerLink
		),
	h6: ({ children, className, ...props }: JSX.IntrinsicElements['h6']) =>
		pipeJsx(
			<h6 className={twMerge('text-xs', className)} {...props}>
				{children}
			</h6>,
			headerTemplate,
			headerLink
		),
	p: ({ children, className, ...props }: JSX.IntrinsicElements['p']) => (
		<p className={twMerge('my-2', className)} {...props}>
			{children}
		</p>
	),
	table: ({
		children,
		className,
		...props
	}: JSX.IntrinsicElements['table']) => (
		<div
			className="overflow-auto print:overflow-visible my-2"
			style={{ breakInside: 'avoid' }}
		>
			<table
				className={twMerge('w-full border-collapse', className)}
				style={{ breakInside: 'avoid' }}
				{...props}
			>
				{children}
			</table>
		</div>
	),
	a: ({ children, className, ...props }: JSX.IntrinsicElements['a']) => (
		<a className={twMerge('underline text-theme', className)} {...props}>
			{children}
		</a>
	),
	thead: ({
		children,
		className,
		...props
	}: JSX.IntrinsicElements['thead']) => (
		<thead className={twMerge('bg-theme text-white', className)} {...props}>
			{children}
		</thead>
	),
	tbody: ({ children, ...props }: JSX.IntrinsicElements['tbody']) => (
		<tbody {...props}>{pipeJsx(<>{children}</>, recurse(rowTemplate))}</tbody>
	),
	td: ({
		children,
		className,
		...props
	}: JSX.IntrinsicElements['td'] & { isHeader?: boolean }) => (
		<td className={twMerge('px-2 font-bold align-top', className)} {...props}>
			{children}
		</td>
	),
	th: ({
		children,
		className,
		...props
	}: JSX.IntrinsicElements['th'] & { isHeader?: boolean }) => (
		<th
			className={twMerge('px-2 font-bold align-bottom', className)}
			{...props}
		>
			{children}
		</th>
	),
	ul: ({
		children,
		className,
		...props
	}: JSX.IntrinsicElements['ul'] & { ordered?: boolean }) => (
		<ul className={twMerge('list-disc ml-6', className)} {...props}>
			{children}
		</ul>
	),
	ol: ({
		children,
		className,
		...props
	}: JSX.IntrinsicElements['ol'] & { ordered?: boolean }) => (
		<ul className={twMerge('list-decimal ml-6', className)} {...props}>
			{children}
		</ul>
	),
	li: ({
		children,
		className,
		...props
	}: JSX.IntrinsicElements['li'] & { ordered?: boolean }) => (
		<li className={twMerge('my-1', className)} {...props}>
			{children}
		</li>
	),
	hr: ({ className, ...props }: JSX.IntrinsicElements['hr']) => (
		<hr className={twMerge('border-0 my-1.5', className)} {...props} />
	),
	blockquote: ({
		children,
		className,
		...props
	}: JSX.IntrinsicElements['blockquote']) => (
		<blockquote
			className={twMerge(
				'bg-gradient-to-r from-tan-fading p-2 my-4',
				className
			)}
			style={{ pageBreakInside: 'avoid' }}
			{...props}
		>
			{pipeJsx(<>{children}</>, recurse(infoFontTemplate))}
		</blockquote>
	),
	img: ({ src, alt, ...props }: JSX.IntrinsicElements['img']) => (
		<img src={src} alt={alt} {...props} />
	),
	strong: ({ children, ...props }: JSX.IntrinsicElements['strong']) => (
		<span className="font-bold" {...props}>
			{children}
		</span>
	),
};
