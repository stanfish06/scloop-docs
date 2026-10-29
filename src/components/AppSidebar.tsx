import { Link, useLocation } from "@tanstack/react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { headerPages, pages } from "@/lib/nav";
import { cn } from "@/lib/utils";

// Sidebar adapts to the current page: lists that page's sections (nav.ts groups)
export default function AppSidebar() {
	const { pathname, hash } = useLocation({
		select: (l) => ({ pathname: l.pathname, hash: l.hash }),
	});
	const page = pages.find((p) => p.to === pathname);
	const { isMobile, setOpenMobile } = useSidebar();
	// Close the mobile sheet after navigating; desktop sidebar stays as is
	const close = () => {
		if (isMobile) setOpenMobile(false);
	};

	return (
		<Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!">
			<SidebarContent>
				{/* Header links are hidden below sm, so repeat them here */}
				<SidebarGroup className="sm:hidden">
					<SidebarGroupLabel>Pages</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{[pages[0], ...headerPages].map((p) => (
								<SidebarMenuItem key={p.to}>
									<SidebarMenuButton
										isActive={p.to === pathname}
										render={<Link to={p.to} onClick={close} />}
									>
										{p.title}
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{page?.groups.map((group) => (
					<SidebarGroup key={group.title}>
						<SidebarGroupLabel className={cn(page.mono && "font-mono")}>
							{group.title}
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{group.items.map((item) => (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton
											isActive={hash === item.id}
											className={cn(page.mono && "font-mono text-xs")}
											render={
												<Link to={page.to} hash={item.id} onClick={close} />
											}
										>
											{item.title}
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
		</Sidebar>
	);
}
