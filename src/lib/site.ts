// Site-wide settings used by the header, landing card, and footer.
export const site = {
	name: "scloop",
	title: "scloop · single-cell loop analysis",
	tagline: "Single-cell loop analysis",
	description:
		"scloop finds statistically significant loops in single-cell RNA-seq data. It bootstraps the cells, matches loops across bootstrap samples by image homology and topological equivalence, and assigns each loop a confidence score. Loops can also be matched across datasets.",
	// Badge above the title; set to "" to hide
	status: "Pre-alpha",
	version: "0.1.28",
	install: "pip install scloop",
	quickstart: `import scloop as scl

# Preprocess AnnData
scl.pp.prepare_adata(adata, downsample=True, n_downsample=500)
# Identify statistically significant loops
scl.tl.find_loops(adata)
# Trajectories, gene trends, and features of each loop
scl.tl.analyze_loops(adata)
# Match loops across datasets
scl.tl.match_loops([adata1, adata2])`,
	links: {
		github: "https://github.com/stanfish06/scloop",
		pypi: "https://pypi.org/project/scloop",
		issues: "https://github.com/stanfish06/scloop/issues",
		license: "https://github.com/stanfish06/scloop/blob/master/LICENSE",
	},
	license: "Apache-2.0",
	copyright: "Zhiyuan (Stan) Yu and Idse Heemskerk",
	// About page content
	about: {
		steps: [
			{
				title: "Bootstrap",
				body: "Resample the cells many times and compute persistent homology on each sample.",
			},
			{
				title: "Match",
				body: "Match loops across bootstrap samples by image homology and topological equivalence.",
			},
			{
				title: "Score",
				body: "Assign each loop a confidence from how often and how well it reappears across samples.",
			},
			{
				title: "Analyze",
				body: "Fit trajectories around each loop, smooth gene trends, and rank features. Match loops across datasets.",
			},
		],
		authors: [
			{
				name: "Zhiyuan (Stan) Yu",
				affiliation: "Heemskerk Lab, University of Michigan",
			},
			{
				name: "LiAng Yao",
				affiliation: "Heemskerk Lab, University of Michigan",
			},
			{
				name: "Idse Heemskerk",
				affiliation: "Heemskerk Lab, University of Michigan",
			},
		],
		citation: "Manuscript in preparation",
		implementation: "",
	},
};
