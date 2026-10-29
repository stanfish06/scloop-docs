import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// How long the check mark stays after copying (ms)
const COPIED_RESET_MS = 1500;

export default function CodeBlock({
	code,
	prompt,
	className,
}: {
	code: string;
	// Shell prompt shown before single-line commands, e.g. "$"
	prompt?: string;
	className?: string;
}) {
	const [copied, setCopied] = useState(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			setTimeout(() => setCopied(false), COPIED_RESET_MS);
		} catch {
			// Clipboard blocked (insecure origin or denied permission): leave the button as is
		}
	}

	return (
		<div className={cn("relative rounded-lg bg-muted", className)}>
			<pre className="overflow-x-auto p-4 pr-12 font-mono text-[0.8rem] leading-relaxed">
				<code>
					{prompt && (
						<span className="text-muted-foreground select-none">{prompt} </span>
					)}
					{code}
				</code>
			</pre>
			<Button
				variant="ghost"
				size="icon-sm"
				className="absolute top-2 right-2"
				onClick={copy}
				aria-label={copied ? "Copied" : "Copy code"}
			>
				{copied ? <CheckIcon /> : <CopyIcon />}
			</Button>
		</div>
	);
}
