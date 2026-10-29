import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import {
	headerPages,
	type MenuLayout,
	type NavItem,
	type NavPage,
} from "@/lib/nav";
import { cn } from "@/lib/utils";

// Dropdown width per layout
const LAYOUT_WIDTH: Record<MenuLayout, string> = {
	list: "w-80",
	columns: "w-[min(56rem,calc(100vw-2rem))]",
	cards: "w-[min(44rem,calc(100vw-2rem))]",
};
// Narrower columns for monospace pages (short API names, no descriptions)
const MONO_COLUMNS_WIDTH = "w-[min(44rem,calc(100vw-2rem))]";

// Horizontal header nav: plain links and dropdowns, in nav.ts order.
// Dropdown items jump to a section on that page.
export default function MegaMenu({ className }: { className?: string }) {
	return (
		<NavigationMenu className={className}>
			<NavigationMenuList>
				{headerPages.map((page) => (
					<NavigationMenuItem key={page.to}>
						{page.header === "link" ? (
							<NavigationMenuLink
								closeOnClick
								render={<Link to={page.to} />}
								className={navigationMenuTriggerStyle()}
							>
								{page.title}
							</NavigationMenuLink>
						) : (
							<>
								<NavigationMenuTrigger>{page.title}</NavigationMenuTrigger>
								<NavigationMenuContent>
									<PagePanel page={page} layout={page.header ?? "list"} />
								</NavigationMenuContent>
							</>
						)}
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}

function PagePanel({ page, layout }: { page: NavPage; layout: MenuLayout }) {
	const items = page.groups.flatMap((g) => g.items);

	return (
		<div
			className={cn(
				"flex flex-col gap-1",
				page.mono && layout === "columns"
					? MONO_COLUMNS_WIDTH
					: LAYOUT_WIDTH[layout],
			)}
		>
			{layout === "list" && (
				<ul className="flex flex-col">
					{items.map((item) => (
						<li key={item.id}>
							<ItemLink page={page} item={item} />
						</li>
					))}
				</ul>
			)}

			{layout === "columns" && (
				<div
					className="grid gap-2"
					style={{
						gridTemplateColumns: `repeat(${page.groups.length}, minmax(0, 1fr))`,
					}}
				>
					{page.groups.map((group) => (
						<div key={group.title} className="flex flex-col">
							<span
								className={cn(
									"px-2 pt-2 pb-1 text-xs font-medium text-muted-foreground",
									page.mono && "font-mono",
								)}
							>
								{group.title}
							</span>
							<ul className="flex flex-col">
								{group.items.map((item) => (
									<li key={item.id}>
										<ItemLink page={page} item={item} />
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			)}

			{layout === "cards" && (
				<ul className="grid grid-cols-3 gap-1">
					{items.map((item) => (
						<li key={item.id}>
							<NavigationMenuLink
								closeOnClick
								render={<Link to={page.to} hash={item.id} />}
								className="flex-col items-start gap-1.5"
							>
								{item.image && (
									<img
										src={item.image}
										alt=""
										loading="lazy"
										className="aspect-4/3 w-full rounded-md bg-white object-contain p-1 ring-1 ring-foreground/10"
									/>
								)}
								<span className="font-medium">{item.title}</span>
								{item.description && (
									<span className="line-clamp-2 text-muted-foreground">
										{item.description}
									</span>
								)}
							</NavigationMenuLink>
						</li>
					))}
				</ul>
			)}

			<Separator />
			<NavigationMenuLink
				closeOnClick
				render={<Link to={page.to} />}
				className="justify-between text-muted-foreground"
			>
				Go to {page.title}
				<ArrowRightIcon />
			</NavigationMenuLink>
		</div>
	);
}

function ItemLink({ page, item }: { page: NavPage; item: NavItem }) {
	return (
		<NavigationMenuLink
			closeOnClick
			render={<Link to={page.to} hash={item.id} />}
			className="flex-col items-start gap-1"
		>
			<span
				className={cn(
					"leading-none font-medium",
					page.mono && "font-mono text-[0.8rem] font-normal",
				)}
			>
				{item.title}
			</span>
			{item.description && (
				<span className="line-clamp-2 text-muted-foreground">
					{item.description}
				</span>
			)}
		</NavigationMenuLink>
	);
}
