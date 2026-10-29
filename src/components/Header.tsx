import { Link, useLocation } from "@tanstack/react-router";
import { MenuIcon } from "lucide-react";
import MegaMenu from "@/components/MegaMenu";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Site name: same 36px row (h-9) and 14px text as the menu items so the text lines up;
// font-semibold marks it as the logo (use font-medium to match the menu exactly)
const LOGO_CLASS = "mr-2 inline-flex h-9 items-center text-2xl font-semibold";

// Burger (opens the sidebar) | site name | page dropdowns | theme toggle
export default function Header() {
	const { toggleSidebar } = useSidebar();
	// No bottom border on home so the landing card attaches to the header
	const isHome = useLocation({ select: (l) => l.pathname === "/" });

	return (
		<header
			className={cn(
				"sticky top-0 z-50 flex h-(--header-height) w-full items-center gap-2 bg-background/80 px-4 backdrop-blur",
				!isHome && "border-b",
			)}
		>
			<Button
				variant="ghost"
				size="icon"
				onClick={toggleSidebar}
				aria-label="Toggle menu"
			>
				<MenuIcon />
			</Button>
			<Link to="/" className={LOGO_CLASS}>
				{site.name}
			</Link>

			<MegaMenu className="hidden sm:flex" />

			<div className="ml-auto flex items-center">
				<ThemeToggle />
			</div>
		</header>
	);
}
