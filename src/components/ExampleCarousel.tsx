import { Link } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useMemo, useState } from "react";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { getPage } from "@/lib/nav";
import { cn } from "@/lib/utils";

// Time each image stays before rotating (ms)
const ROTATE_MS = 5000;
// Pause rotation while the pointer is over the panel
const PAUSE_ON_HOVER = true;
// Prev/next button inset from the panel edges (default shadcn position is outside the carousel, which the card clips)
const PREV_POSITION = "left-3";
const NEXT_POSITION = "right-3";
// Solid button fill so the buttons stay visible over the white image panel in both themes
const BUTTON_VARIANT = "secondary";
// Fixed panel height; images are letterboxed so different aspect ratios don't shift the layout
const PANEL_HEIGHT = "h-64 sm:h-96 lg:h-[30rem]";

// Slides = Examples entries in nav.ts that have an image; each links to its section on /examples
const examples = getPage("/examples");
const slides = examples.groups
	.flatMap((g) => g.items)
	.filter((item) => item.image);

export default function ExampleCarousel({ className }: { className?: string }) {
	// Plugin instance must stay stable across renders
	const plugins = useMemo(() => {
		// Respect reduced-motion: show the first slide without auto-rotating
		const reduceMotion =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		return [
			Autoplay({
				delay: ROTATE_MS,
				playOnInit: !reduceMotion,
				stopOnInteraction: false,
				stopOnMouseEnter: PAUSE_ON_HOVER,
				// Listen for hover on the whole carousel (slides + prev/next buttons), not just the slide viewport
				rootNode: (emblaRoot) => emblaRoot.parentElement ?? emblaRoot,
			}),
		];
	}, []);

	// Restart the countdown after any slide change so a button press isn't followed by an early auto step
	const [api, setApi] = useState<CarouselApi>();
	useEffect(() => {
		if (!api) return;
		const restart = () => api.plugins().autoplay?.reset();
		api.on("select", restart);
		return () => {
			api.off("select", restart);
		};
	}, [api]);

	return (
		<Carousel
			opts={{ loop: true }}
			plugins={plugins}
			setApi={setApi}
			className={className}
			aria-label="Examples"
		>
			<CarouselContent>
				{slides.map((item, i) => (
					<CarouselItem key={item.id}>
						<Link
							to={examples.to}
							hash={item.id}
							className="group flex flex-col gap-2"
						>
							<div
								className={cn(
									"flex items-center justify-center overflow-hidden rounded-lg bg-white p-2",
									PANEL_HEIGHT,
								)}
							>
								<img
									src={item.image}
									alt={item.title}
									loading={i === 0 ? "eager" : "lazy"}
									className="max-h-full max-w-full object-contain"
								/>
							</div>
							<span className="text-xs text-muted-foreground group-hover:text-foreground">
								<span className="font-medium text-foreground">
									{item.title}
								</span>
								{item.description && ` · ${item.description}`}
							</span>
						</Link>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious variant={BUTTON_VARIANT} className={PREV_POSITION} />
			<CarouselNext variant={BUTTON_VARIANT} className={NEXT_POSITION} />
		</Carousel>
	);
}
