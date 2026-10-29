import { createFileRoute } from "@tanstack/react-router";
import SectionPage from "@/components/SectionPage";
import { getPage } from "@/lib/nav";
import { site } from "@/lib/site";

const page = getPage("/guides");

export const Route = createFileRoute("/guides")({
	head: () => ({ meta: [{ title: `Guides · ${site.name}` }] }),
	component: () => <SectionPage page={page} />,
});
