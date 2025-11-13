"use client";

import { useEffect, useRef, useState } from "react";
import { Accessibility, Minus, Plus, RefreshCw, X } from "lucide-react";
import { useDraggable } from "@/hooks/useDraggable";
import { createPortal } from "react-dom";

const localStorageKey = "accessibility-settings";

/**
 * Accessibility settings stored in localStorage and applied globally.
 */
interface AccessibilitySettings {
	fontSize: number;
	highContrast: boolean;
	readableFont: boolean;
	underlineLinks: boolean;
	reduceMotion: boolean;
}

/**
 * Default accessibility values used on first load or after reset.
 */
const defaultSettings: AccessibilitySettings = {
	fontSize: 100,
	highContrast: false,
	readableFont: false,
	underlineLinks: false,
	reduceMotion: false,
};

/**
 * Toggle-able accessibility features with labels (RTL Hebrew support).
 */
const toggleSettings = [
	{ key: "highContrast", label: "ניגודיות גבוהה" },
	{ key: "readableFont", label: "פונט קריא" },
	{ key: "underlineLinks", label: "הדגש קישורים" },
	{ key: "reduceMotion", label: "הפחת תנועות" },
] as const;

export default function AccessibilityWidget() {
	const size = 52;
	const [initialPosition, setInitialPosition] = useState<{ x: number; y: number } | null>(null);
	const [settings, setSettings] = useState<AccessibilitySettings>(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem(localStorageKey);
			return stored ? JSON.parse(stored) : defaultSettings;
		}
		return defaultSettings;
	});
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const overlayRef = useRef<HTMLDivElement>(null);

	// Set initial position of the draggable button (bottom-left)
	useEffect(() => {
		const timeout = setTimeout(() => {
		  const cookieNoticeHeight = localStorage.getItem("cookie-consent")
			? 0
			: document.querySelector(".cookie-notice")?.clientHeight || 0;
		  const bannerHeight = document.querySelector('[data-fixed-banner]')?.clientHeight || 0; // Get the height of the fixed banner
	  
		  const x = 8;
		  const y = window.innerHeight - size - cookieNoticeHeight - bannerHeight - 8;
		  setInitialPosition({ x, y });
	  
		  console.log("Final Y:", y);
		}, 0); // next tick
	  
		return () => clearTimeout(timeout);
	  }, []);

	const { position, handleMouseDown, handleTouchStart, wasDragged, isDragging } = useDraggable({
		size,
		initialPosition,
		disabled: isOpen,
	});

	// Trigger animation once position is available
	useEffect(() => {
		if (position) setIsVisible(true);
	}, [position]);

	// Apply settings to <html> and persist to localStorage
	useEffect(() => {
		const root = document.documentElement;
		root.style.fontSize = `${settings.fontSize}%`;
		root.classList.toggle("accessibility-readable-font", settings.readableFont);
		root.classList.toggle("accessibility-underline-links", settings.underlineLinks);

		if (settings.highContrast) {
			root.classList.add("contrast-mode");
		} else {
			root.classList.remove("contrast-mode");
		}

		if (settings.reduceMotion) {
			root.classList.add("accessibility-reduce-motion");
			root.setAttribute("data-reduce-motion", "true");
		} else {
			root.classList.remove("accessibility-reduce-motion");
			root.removeAttribute("data-reduce-motion");
		}

		localStorage.setItem(localStorageKey, JSON.stringify(settings));
	}, [settings]);

	if (!position) return null;

	const updateSetting = (key: keyof AccessibilitySettings, value: boolean | number) => {
		setSettings((prev) => ({ ...prev, [key]: value }));
	};

	const resetSettings = () => setSettings(defaultSettings);

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === overlayRef.current) {
			setIsOpen(false);
		}
	};

	return (
		<div
			onMouseDown={handleMouseDown}
			onTouchStart={handleTouchStart}
			className={`fixed z-50 rounded-full
				${isDragging ? "" : "transition-all duration-500 ease-out"
				} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
			style={{ left: position.x, top: position.y }}
		>

			<button
				onClick={() => {
					if (!wasDragged.current) setIsOpen(!isOpen);
				}}
				className="rounded-full bg-blue-300 hover:bg-blue-400 shadow-lg border border-black flex items-center justify-center"
				aria-label="כלי נגישות"
				style={{
					width: `${size}px`,
					height: `${size}px`,
				}}
			>
				<Accessibility size={24} color="black" />
			</button>

			{isOpen &&
				createPortal(
					<div
						ref={overlayRef}
						onClick={handleOverlayClick}
						className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center"
					>

						<div className="bg-white border shadow-lg rounded-[12px] p-[20px] w-[340px] min-h-[380px] rtl:text-right text-right space-y-[16px] z-50 text-[18px] leading-[1.6] font-sans">
							<header className="flex justify-between items-center">
								<h2 className="text-[20px] font-bold">כלי נגישות</h2>
								<button
									onClick={() => setIsOpen(false)}
									aria-label="סגור את החלון"
									className="text-gray-500 hover:text-black transition rounded-full border border-gray-500 hover:border-black p-[4px]"
								>
									<X size={20} />
								</button>
							</header>

							<div className="space-y-[12px]">
								{/* Font size controls */}
								<label className="flex items-center justify-between">
									<span className="text-[18px]">גודל גופן</span>
									<div className="flex gap-[8px]">
										<button
											className="px-[16px] bg-gray-200 rounded text-[16px]"
											onClick={() => updateSetting("fontSize", Math.max(80, settings.fontSize - 10))}
											aria-label="כפתור הקטנת גודל המלל"
										>
											<Minus size={12} />
										</button>
										<span className="min-w-[50px] text-[18px] text-center">
											{settings.fontSize}%
										</span>
										<button
											className="px-[16px] bg-gray-200 rounded text-[16px]"
											onClick={() => updateSetting("fontSize", Math.min(200, settings.fontSize + 10))}
											aria-label="כפתור הגדלת גודל המלל"
										>
											<Plus size={12} />
										</button>
									</div>
								</label>

								{/* Toggle switches */}
								{toggleSettings.map(({ key, label }) => (
									<label key={key} className="flex items-center gap-[8px]">
										<input
											type="checkbox"
											checked={settings[key]}
											onChange={(e) => updateSetting(key, e.target.checked)}
											aria-label={`${label}`}
										/>
										<span className="text-[18px]">{label}</span>
									</label>
								))}

								{/* Reset + Close buttons */}
								<button
									onClick={resetSettings}
									className="text-[18px] py-[8px] flex items-center gap-[8px]"
									aria-label="כפתור איפוס הגדרות"
								>
									<RefreshCw size={20} /> אפס הגדרות
								</button>

								<button
									onClick={() => setIsOpen(false)}
									className="w-full mt-[8px] text-[18px] py-[8px] border rounded-[6px] text-center bg-gray-100 hover:bg-gray-200"
									aria-label="סגור את החלון"
								>
									סגור
								</button>
							</div>
						</div>
					</div>,
					document.body // Mount outside the draggable button
				)}
		</div>
	);
}
