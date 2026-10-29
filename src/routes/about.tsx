import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { site } from "@/lib/site";

export const Route = createFileRoute("/about")({
	head: () => ({ meta: [{ title: `About · ${site.name}` }] }),
	component: About,
});

function About() {
	const { about } = site;

	return (
		<div className="page-wrap flex flex-col gap-10 py-10 sm:py-16">
			<section id="overview" className="flex max-w-3xl flex-col gap-3">
				<span className="text-sm text-muted-foreground">About</span>
				<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
					What scloop does
				</h1>
				<p className="text-base leading-7 text-muted-foreground">
					{site.description}
				</p>
			</section>

			<section id="how-it-works" className="flex flex-col gap-4">
				<h2 className="text-xl font-semibold tracking-tight">How it works</h2>
				<ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					{about.steps.map((step, i) => (
						<li key={step.title}>
							<Card size="sm" className="h-full">
								<CardHeader>
									<CardDescription>Step {i + 1}</CardDescription>
									<CardTitle>{step.title}</CardTitle>
								</CardHeader>
								<CardContent className="text-muted-foreground">
									{step.body}
								</CardContent>
							</Card>
						</li>
					))}
				</ol>
				<p className="text-sm text-muted-foreground">{about.implementation}</p>
			</section>

			<Separator />

			<div className="grid gap-8 sm:grid-cols-3">
				<section id="authors" className="flex flex-col gap-2">
					<h2 className="font-semibold">Authors</h2>
					<ul className="flex flex-col gap-1 text-sm">
						{about.authors.map((author) => (
							<li key={author.name}>
								{author.name}
								<span className="block text-muted-foreground">
									{author.affiliation}
								</span>
							</li>
						))}
					</ul>
				</section>
				<section id="citation" className="flex flex-col gap-2">
					<h2 className="font-semibold">Citation</h2>
					<p className="text-sm text-muted-foreground">{about.citation}</p>
				</section>
				<section id="license" className="flex flex-col gap-2">
					<h2 className="font-semibold">License</h2>
					<p className="text-sm text-muted-foreground">{site.license}. </p>
				</section>
			</div>
		</div>
	);
}
