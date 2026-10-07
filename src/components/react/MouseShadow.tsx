"use client";

import { createPortal } from "react-dom";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface ShadowCursorProps extends PropsWithChildren {
	className?: string;
	dotSize?: number;
	trailSize?: number;
	stiffness?: number;
	damping?: number;
	cursorColor?: string;
	blendMode?: "difference" | "screen" | "exclusion" | "normal";
	poolScale?: number;
	reducedMotion?: boolean;
}

export default function ShadowCursor({
	children,
	className = "cursor-none **:cursor-none",
	dotSize = 8,
	trailSize = 36,
	stiffness = 150,
	damping = 15,
	cursorColor = "white",
	blendMode = "difference",
	poolScale = 2,
	reducedMotion = false,
}: ShadowCursorProps) {
	const [mounted, setMounted] = useState(false);
	const [visible, setVisible] = useState(false);
	const [enabled, setEnabled] = useState(false);

	const dotX = useMotionValue(-100);
	const dotY = useMotionValue(-100);
	const trailX = useSpring(-100, { stiffness, damping });
	const trailY = useSpring(-100, { stiffness, damping });
	const trailScale = useSpring(1, { stiffness: 260, damping: 26 });

	const live = useRef({ poolScale, reducedMotion });
	const visibleRef = useRef(false);
	live.current = { poolScale, reducedMotion };

	useEffect(() => {
		const media = window.matchMedia("(pointer: fine) and (hover: hover)");
		const updateEnabled = () => setEnabled(media.matches);

		updateEnabled();
		setMounted(true);

		if (!media.matches) return undefined;

		const handlePointerMove = (event: PointerEvent) => {
			const target = event.target instanceof Element ? event.target : null;
			const pool = target?.closest(
				"button, a[href], input:is([type='button'], [type='submit'], [type='reset']), select, textarea, summary, [role='button'], [data-cursor-pool]",
			) ?? null;

			if (!visibleRef.current) {
				visibleRef.current = true;
				setVisible(true);
			}

			dotX.set(event.clientX);
			dotY.set(event.clientY);

			if (pool) {
				trailScale.set(live.current.poolScale);
				const rect = pool.getBoundingClientRect();
				const centerX = rect.left + rect.width / 2;
				const centerY = rect.top + rect.height / 2;

				if (live.current.reducedMotion) {
					trailX.jump(centerX);
					trailY.jump(centerY);
				} else {
					trailX.set(centerX);
					trailY.set(centerY);
				}
				return;
			}

			trailScale.jump(1);
			trailX.set(event.clientX);
			trailY.set(event.clientY);
		};

		const handlePointerEnter = (event: PointerEvent) => {
			visibleRef.current = true;
			setVisible(true);
			dotX.set(event.clientX);
			dotY.set(event.clientY);
			trailX.jump(event.clientX);
			trailY.jump(event.clientY);
		};

		const handlePointerLeave = () => {
			visibleRef.current = false;
			setVisible(false);
			trailScale.jump(1);
		};

		window.addEventListener("pointermove", handlePointerMove, {
			capture: true,
		});
		document.documentElement.addEventListener(
			"pointerenter",
			handlePointerEnter,
			{ capture: true },
		);
		document.documentElement.addEventListener(
			"pointerleave",
			handlePointerLeave,
			{ capture: true },
		);

		return () => {
			window.removeEventListener("pointermove", handlePointerMove, {
				capture: true,
			});
			document.documentElement.removeEventListener(
				"pointerenter",
				handlePointerEnter,
				{ capture: true },
			);
			document.documentElement.removeEventListener(
				"pointerleave",
				handlePointerLeave,
				{ capture: true },
			);
		};
	}, [dotX, dotY, trailScale, trailX, trailY]);

	useEffect(() => {
		if (!reducedMotion) return;
		trailX.jump(dotX.get());
		trailY.jump(dotY.get());
	}, [dotX, dotY, reducedMotion, trailX, trailY]);

	const cursor = (
		<>
			<motion.div
				aria-hidden
				className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full transition-opacity duration-200"
				style={{
					x: trailX,
					y: trailY,
					scale: trailScale,
					width: trailSize,
					height: trailSize,
					marginLeft: -trailSize / 2,
					marginTop: -trailSize / 2,
					backgroundColor: cursorColor,
					mixBlendMode: blendMode,
					opacity: visible ? 1 : 0,
				}}
			/>

			<motion.div
				aria-hidden
				className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full transition-opacity duration-200"
				style={{
					x: dotX,
					y: dotY,
					width: dotSize,
					height: dotSize,
					marginLeft: -dotSize / 2,
					marginTop: -dotSize / 2,
					backgroundColor: cursorColor,
					mixBlendMode: blendMode,
					opacity: visible ? 1 : 0,
				}}
			/>
		</>
	);

	return (
		<div
			className={[
				"relative",
				enabled ? className : "cursor-auto",
			].filter(Boolean).join(" ")}
		>
			{children}
			{mounted && enabled ? createPortal(cursor, document.body) : null}
		</div>
	);
}
