import { createFileRoute } from "@tanstack/react-router";
import SectionPage from "@/components/SectionPage";
import { getPage } from "@/lib/nav";
import { site } from "@/lib/site";

const page = getPage("/examples");

export const Route = createFileRoute("/examples")({
	head: () => ({ meta: [{ title: `Examples · ${site.name}` }] }),
	component: () => <SectionPage page={page} />,
});
