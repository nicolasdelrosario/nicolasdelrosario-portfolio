import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "../ui/badge";

type Skill = {
	category: string;
	technologies: string[];
};

export function SkillsCarousel({ skills }: { skills: Skill[] }) {
	const chunkArray = (array: Skill[], size: number) => {
		const chunkedArr = [];
		for (let i = 0; i < array.length; i += size) {
			chunkedArr.push(array.slice(i, i + size));
		}
		return chunkedArr;
	};

	const groupedSkills = chunkArray(skills, 2);

	return (
		<Carousel>
			<CarouselContent>
				{groupedSkills.map((skillPair, index) => {
					const key = skillPair.map((s) => s.category).join("-");
					return (
						<CarouselItem key={key} className="basis-full">
							<div className="grid grid-cols-2 gap-4 h-full">
								{skillPair.map(({ category, technologies }) => (
									<Card
										key={category}
										className="bg-main/50 text-main-foreground h-full"
									>
										<CardContent className="p-4 flex flex-col gap-2">
											<CardTitle className="text-lg leading-relaxed">
												{category}
											</CardTitle>
											<div className="flex flex-wrap gap-2 mt-2">
												{technologies?.map((badge) => (
													<Badge
														key={badge}
														variant={"neutral"}
														className="text-xs px-2 py-0.5"
													>
														{badge}
													</Badge>
												))}
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</CarouselItem>
					);
				})}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
