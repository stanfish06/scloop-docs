import { createFileRoute } from "@tanstack/react-router";
import SectionPage from "@/components/SectionPage";
import { getPage } from "@/lib/nav";
import { site } from "@/lib/site";

const page = getPage("/api");

export const Route = createFileRoute("/api")({
	head: () => ({ meta: [{ title: `API · ${site.name}` }] }),
	component: () => <SectionPage page={page} />,
});
