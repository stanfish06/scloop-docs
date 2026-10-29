// Site navigation: one entry per page.
// - `header` puts the page in the header (plain link or dropdown), in array order
// - `groups` are the sections on that page; the sidebar lists them for the current page,
//   and dropdown items link to them as <page>#<item.id>

export type NavItem = {
	title: string;
	// Anchor id of the section on the page
	id: string;
	description?: string;
	// Thumbnail for "cards" dropdowns (path under public/)
	image?: string;
};

export type NavGroup = {
	title: string;
	items: NavItem[];
};

// Dropdown layout:
// "list"    one column, title + description
// "columns" one column per group
// "cards"   thumbnail grid
export type MenuLayout = "list" | "columns" | "cards";

export type NavPage = {
	title: string;
	// Route path; add the route file in src/routes when adding a page
	to:
		| "/"
		| "/get-started"
		| "/tutorials"
		| "/guides"
		| "/examples"
		| "/api"
		| "/about";
	description: string;
	// Header entry: "link" = plain link, a MenuLayout = dropdown; omit to leave out of the header
	header?: "link" | MenuLayout;
	// Render item and group titles in monospace (API names)
	mono?: boolean;
	groups: NavGroup[];
};

export const pages: NavPage[] = [
	{
		title: "Home",
		to: "/",
		description: "Single-cell loop analysis.",
		groups: [
			{
				title: "Home",
				items: [
					{
						title: "About",
						id: "about",
						description: "",
					},
					{
						title: "Framework",
						id: "framework",
						description: "",
					},
					{
						title: "Benchmark",
						id: "benchmark",
						description: "",
					},
				],
			},
		],
	},
	{
		title: "Get started",
		to: "/get-started",
		description: "Install scloop and run your first analysis.",
		header: "link",
		groups: [
			{
				title: "Get started",
				items: [
					{
						title: "Installation",
						id: "installation",
						description:
							"Install from PyPI or build from source. Requires Python 3.12.",
					},
					{
						title: "Quickstart",
						id: "quickstart",
						description: "Find loops in an AnnData object with four calls.",
					},
				],
			},
		],
	},
	{
		title: "Tutorials",
		to: "/tutorials",
		description: "End-to-end walkthroughs on real datasets.",
		header: "list",
		groups: [
			{
				title: "Tutorials",
				items: [
					{
						title: "Basic run",
						id: "first-loop-analysis",
						description:
							"Preprocess a dataset, find significant loops, and plot them.",
					},
					{
						title: "Comparing loops across datasets",
						id: "cross-dataset",
						description: "Match loops between two time points.",
					},
				],
			},
		],
	},
	{
		title: "Guides",
		to: "/guides",
		description: "Task-focused sections grouped by pipeline stage.",
		header: "columns",
		groups: [
			{
				title: "Preprocessing",
				items: [
					{
						title: "Prepare AnnData",
						id: "prepare-adata",
						description: "Downsample cells and build the embedding.",
					},
					{
						title: "Feature selection",
						id: "feature-selection",
						description: "Select variable genes.",
					},
				],
			},
			{
				title: "Finding loops",
				items: [
					{
						title: "Find loops",
						id: "find-loops",
						description: "Detect loops and test them on bootstrap samples.",
					},
					{
						title: "Bootstrap settings",
						id: "bootstrap",
						description: "Sample count, sampling method, presence test.",
					},
				],
			},
			{
				title: "Analyzing loops",
				items: [
					{
						title: "Trajectories and gene trends",
						id: "trajectories",
						description:
							"Fit paths around a loop and smooth gene expression along them.",
					},
					{
						title: "Hodge decomposition",
						id: "hodge",
						description: "Embed loop edges with the Hodge Laplacian.",
					},
					{
						title: "Plotting",
						id: "plotting",
						description: "Persistence diagrams, loop landscapes, loop rank.",
					},
				],
			},
			{
				title: "Matching and I/O",
				items: [
					{
						title: "Match loops",
						id: "match-loops",
						description: "Match loops between datasets.",
					},
					{
						title: "Save and load",
						id: "save-load",
						description: "Write and read scloop results with h5ad.",
					},
				],
			},
		],
	},
	{
		title: "Examples",
		to: "/examples",
		description: "Figures produced by scloop, with the code behind them.",
		header: "cards",
		groups: [
			{
				title: "Examples",
				items: [
					{
						title: "Analysis overview",
						id: "overview",
						description: "Loops, trajectories, and matching on one dataset.",
						image: "/images/loop.webp",
					},
					{
						title: "Loop landscape",
						id: "loop-landscape",
						description: "Loop landscape over the embedding.",
						image: "/images/landscape.webp",
					},
					{
						title: "Loop rank",
						id: "loop-rank",
						description: "Loops ranked by bootstrap confidence.",
						image: "/images/loop_rank.webp",
					},
				],
			},
		],
	},
	{
		title: "API",
		to: "/api",
		description:
			"Reference for the public functions in scl.pp, scl.tl, scl.pl, and scl.io.",
		header: "columns",
		mono: true,
		// scl.ben (benchmarking) is internal and left out
		groups: [
			{
				title: "scl.pp",
				items: [
					{ title: "prepare_adata", id: "pp.prepare_adata" },
					{ title: "delve_fs", id: "pp.delve_fs" },
				],
			},
			{
				title: "scl.tl",
				items: [
					{ title: "find_loops", id: "tl.find_loops" },
					{ title: "analyze_loops", id: "tl.analyze_loops" },
					{ title: "match_loops", id: "tl.match_loops" },
				],
			},
			{
				title: "scl.pl",
				items: [
					{ title: "loops", id: "pl.loops" },
					{ title: "persistence_diagram", id: "pl.persistence_diagram" },
					{ title: "bar_lifetimes", id: "pl.bar_lifetimes" },
					{ title: "hist_lifetimes", id: "pl.hist_lifetimes" },
					{ title: "loop_embedding", id: "pl.loop_embedding" },
					{ title: "loop_rank", id: "pl.loop_rank" },
					{ title: "loop_landscape", id: "pl.loop_landscape" },
					{ title: "loop_edge_embedding", id: "pl.loop_edge_embedding" },
					{ title: "loop_edge_overlay", id: "pl.loop_edge_overlay" },
					{ title: "match_loops_overlay", id: "pl.match_loops_overlay" },
					{ title: "plot_trajectory", id: "pl.plot_trajectory" },
					{ title: "plot_gene_trends", id: "pl.plot_gene_trends" },
				],
			},
			{
				title: "scl.io",
				items: [
					{ title: "save_scloop", id: "io.save_scloop" },
					{ title: "load_scloop", id: "io.load_scloop" },
					{ title: "load_scloop_adata", id: "io.load_scloop_adata" },
				],
			},
		],
	},
	{
		title: "About",
		to: "/about",
		description: "What scloop does and how it works.",
		groups: [
			{
				title: "About",
				items: [
					{ title: "What scloop does", id: "overview" },
					{ title: "How it works", id: "how-it-works" },
					{ title: "Authors", id: "authors" },
					{ title: "Citation", id: "citation" },
					{ title: "License", id: "license" },
				],
			},
		],
	},
];

export const headerPages = pages.filter((p) => p.header);

export function getPage(to: NavPage["to"]): NavPage {
	const page = pages.find((p) => p.to === to);
	if (!page) throw new Error(`No nav entry for ${to}`);
	return page;
}
