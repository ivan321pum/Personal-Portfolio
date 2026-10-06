import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollHorizontal() {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	//const totalDistance = (items.length - 1) * (ITEM_WIDTH + GAP);
	//const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);

	return (
		<div>
			<section>
				<h1>HOla</h1>
			</section>
		</div>
	);
}
