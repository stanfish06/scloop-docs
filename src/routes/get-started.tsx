import { createFileRoute } from "@tanstack/react-router";
import SectionPage from "@/components/SectionPage";
import { getPage } from "@/lib/nav";
import { site } from "@/lib/site";

const page = getPage("/get-started");

export const Route = createFileRoute("/get-started")({
	head: () => ({ meta: [{ title: `Get started · ${site.name}` }] }),
	component: () => <SectionPage page={page} />,
});
