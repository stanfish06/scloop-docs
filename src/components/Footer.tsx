import { PackageIcon } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { site } from "@/lib/site";

const linkClass =
	"inline-flex items-center gap-2 text-muted-foreground hover:text-foreground";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t">
			<div className="page-wrap flex flex-col gap-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
				<span className="text-muted-foreground">
					© {year} {site.copyright}
				</span>
				<nav aria-label="Project links" className="flex items-center gap-6">
					<a href={site.links.github} className={linkClass}>
						<GitHubIcon className="size-4" />
						GitHub
					</a>
					<a href={site.links.pypi} className={linkClass}>
						<PackageIcon className="size-4" />
						PyPI
					</a>
				</nav>
			</div>
		</footer>
	);
}
