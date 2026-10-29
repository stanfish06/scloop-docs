import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import ExampleCarousel from "@/components/ExampleCarousel";
import { PageSections } from "@/components/SectionPage";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getPage } from "@/lib/nav";
import { site } from "@/lib/site";

export const Route = createFileRoute("/")({ component: Home });

// Sections below the landing card; edit them in nav.ts under "/"
const page = getPage("/");

// Frame that attaches the landing card to the header (tanstack.com: 8px side inset, 4px padding)
const CARD_FRAME = "bg-muted sm:mx-2 sm:rounded-2xl sm:p-1";
// Card corners: square edge-to-edge on phones, rounded inside the frame from sm up
const CARD_CORNERS = "rounded-none sm:rounded-xl";

function Home() {
	return (
		<div className="flex flex-col gap-12 pb-10 sm:pb-16">
			<div className={CARD_FRAME}>
				<Card className={CARD_CORNERS}>
					<CardHeader className="gap-3">
						{site.status && (
							<Badge variant="secondary" className="w-fit">
								{site.status}
							</Badge>
						)}
						<CardTitle>
							<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
								{site.name}
							</h1>
						</CardTitle>
						<CardDescription className="text-base">
							{site.tagline}
						</CardDescription>
					</CardHeader>

					<CardContent className="grid gap-8 lg:grid-cols-2">
						<div className="flex flex-col gap-6">
							<p className="text-base leading-7 text-muted-foreground">
								{site.description}
							</p>
							<div className="flex flex-wrap gap-2">
								<Link to="/about" className={buttonVariants({ size: "lg" })}>
									About scloop
									<ArrowRightIcon data-icon="inline-end" />
								</Link>
							</div>
						</div>

						<div className="flex min-w-0 flex-col gap-3">
							<CodeBlock code={site.install} prompt="$" />
							<CodeBlock code={site.quickstart} />
						</div>
					</CardContent>

					<CardFooter className="flex-col items-stretch">
						<ExampleCarousel />
					</CardFooter>
				</Card>
			</div>
			<div className="page-wrap flex flex-col gap-12">
				<PageSections page={page} />
			</div>
		</div>
	);
}
