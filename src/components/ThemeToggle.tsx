import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type ThemeMode = "light" | "dark";

// Used when nothing valid is stored; keep in sync with THEME_INIT_SCRIPT and <html> in __root.tsx
const DEFAULT_MODE: ThemeMode = "dark";

function getInitialMode(): ThemeMode {
	if (typeof window === "undefined") {
		return DEFAULT_MODE;
	}

	const stored = window.localStorage.getItem("theme");
	return stored === "light" || stored === "dark" ? stored : DEFAULT_MODE;
}

function applyThemeMode(mode: ThemeMode) {
	document.documentElement.classList.remove("light", "dark");
	document.documentElement.classList.add(mode);
	document.documentElement.style.colorScheme = mode;
}

export default function ThemeToggle() {
	const [mode, setMode] = useState<ThemeMode>(DEFAULT_MODE);

	useEffect(() => {
		const initialMode = getInitialMode();
		setMode(initialMode);
		applyThemeMode(initialMode);
	}, []);

	function toggleMode() {
		const nextMode: ThemeMode = mode === "dark" ? "light" : "dark";
		setMode(nextMode);
		applyThemeMode(nextMode);
		window.localStorage.setItem("theme", nextMode);
	}

	const label = `Theme: ${mode}. Click to switch to ${mode === "dark" ? "light" : "dark"}.`;
	const Icon = mode === "dark" ? MoonIcon : SunIcon;

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleMode}
			aria-label={label}
			title={label}
		>
			<Icon />
		</Button>
	);
}
