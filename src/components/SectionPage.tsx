import type { NavPage } from "@/lib/nav";
import { cn } from "@/lib/utils";

// Page body for a nav entry: title + one anchored section per item
export default function SectionPage({ page }: { page: NavPage }) {
	return (
		<div className="page-wrap flex flex-col gap-12 py-10 sm:py-16">
			<div className="flex max-w-3xl flex-col gap-2">
				<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
					{page.title}
				</h1>
				<p className="text-base text-muted-foreground">{page.description}</p>
			</div>
			<PageSections page={page} />
		</div>
	);
}

// Anchored sections for a page's nav items (targets of the sidebar and header dropdowns)
export function PageSections({ page }: { page: NavPage }) {
	const grouped = page.groups.length > 1;
	const ItemHeading = grouped ? "h3" : "h2";

	return page.groups.map((group) => (
		<div key={group.title} className="flex flex-col gap-8">
			{grouped && (
				<h2
					className={cn(
						"text-xl font-semibold tracking-tight",
						page.mono && "font-mono",
					)}
				>
					{group.title}
				</h2>
			)}
			{group.items.map((item) => (
				<section
					key={item.id}
					id={item.id}
					className="flex max-w-3xl flex-col gap-3 border-t pt-6"
				>
					<ItemHeading
						className={cn("text-lg font-semibold", page.mono && "font-mono")}
					>
						{item.title}
					</ItemHeading>
					{item.description && (
						<p className="text-muted-foreground">{item.description}</p>
					)}
					{item.image && (
						<img
							src={item.image}
							alt={item.title}
							loading="lazy"
							className="w-full rounded-lg bg-white p-2 ring-1 ring-foreground/10"
						/>
					)}
					<p className="text-sm text-muted-foreground italic">
						Content coming soon.
					</p>
				</section>
			))}
		</div>
	));
}
