"use client";

import { useEffect, useState } from "react";

export interface BlueprintCardProps {
	accentColor?: string;
	dashed?: boolean;
	dotSize?: number;
	glowIntensity?: number;
	animated?: boolean;
	duration?: number;
	reducedMotion?: boolean;
	className?: string;
	children: React.ReactNode;
}

const INSET = 16;

const DOT_POSITIONS: [string, string][] = [
	[`${INSET}px`, `${INSET}px`],
	[`calc(100% - ${INSET}px)`, `${INSET}px`],
	[`${INSET}px`, `calc(100% - ${INSET}px)`],
	[`calc(100% - ${INSET}px)`, `calc(100% - ${INSET}px)`],
];

export default function BlueprintCard({
	accentColor = "#a855f7",
	dashed = true,
	dotSize = 4,
	glowIntensity = 0.15,
	animated = true,
	duration = 0.6,
	reducedMotion = false,
	className,
	children,
}: BlueprintCardProps) {
	const skip = !animated || reducedMotion;
	const [drawn, setDrawn] = useState(skip);

	useEffect(() => {
		if (skip) {
			setDrawn(true);
			return;
		}
		const raf = requestAnimationFrame(() => setDrawn(true));
		return () => cancelAnimationFrame(raf);
	}, [skip]);

	const line = `color-mix(in srgb, ${accentColor} 90%, transparent)`;
	const ease = "cubic-bezier(0.22, 0.61, 0.36, 1)";
	const transition = (prop: string, delay: number) =>
		skip ? undefined : `${prop} ${duration}s ${ease} ${delay}s`;

	return (
		<div
			className={["relative backdrop-blur-md", className].filter(Boolean).join(" ")}
			style={{
				border: `1px ${dashed ? "dashed" : "solid"} color-mix(in srgb, ${accentColor} 35%, transparent)`,
				background: `color-mix(in srgb, ${accentColor} 4%, transparent)`,
			}}
		>
			{(["top", "bottom"] as const).map((edge, i) => (
				<div
					key={edge}
					className="absolute inset-x-0 h-px"
					style={{
						[edge]: INSET,
						background: line,
						transformOrigin: i === 0 ? "left" : "right",
						transform: `scaleX(${drawn ? 1 : 0})`,
						transition: transition("transform", 0.1),
					}}
				/>
			))}
			{(["left", "right"] as const).map((edge) => (
				<div
					key={edge}
					className="absolute inset-y-0 w-px"
					style={{
						[edge]: INSET,
						background: line,
						transformOrigin: "top",
						transform: `scaleY(${drawn ? 1 : 0})`,
						transition: transition("transform", 0.25),
					}}
				/>
			))}
			{DOT_POSITIONS.map(([left, top], i) => (
				<span
					key={i}
					className="absolute rounded-full"
					style={{
						left,
						top,
						width: dotSize,
						height: dotSize,
						marginLeft: -dotSize / 2,
						marginTop: -dotSize / 2,
						background: accentColor,
						boxShadow: `0 0 0 ${Math.max(4, dotSize * 1.5)}px var(--sg-panel, #101014)`,
						transform: `scale(${drawn ? 1 : 0})`,
						transition: transition("transform", 0.45 + i * 0.08),
					}}
				/>
			))}
			<div
				className="pointer-events-none absolute inset-0 blur-sm"
				style={{
					background: `linear-gradient(to bottom, transparent 55%, color-mix(in srgb, ${accentColor} ${glowIntensity * 100}%, transparent))`,
					opacity: drawn ? 1 : 0,
					transition: transition("opacity", 0.6),
				}}
			/>
			<div
				className="relative z-10"
				style={{
					padding: INSET * 2,
					opacity: drawn ? 1 : 0,
					transition: transition("opacity", 0.4),
				}}
			>
				{children}
			</div>
		</div>
	);
}
