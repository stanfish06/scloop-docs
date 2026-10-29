import { createFileRoute } from "@tanstack/react-router";
import SectionPage from "@/components/SectionPage";
import { getPage } from "@/lib/nav";
import { site } from "@/lib/site";

const page = getPage("/tutorials");

export const Route = createFileRoute("/tutorials")({
	head: () => ({ meta: [{ title: `Tutorials · ${site.name}` }] }),
	component: () => <SectionPage page={page} />,
});
