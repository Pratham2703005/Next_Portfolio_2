import SectionHeading from "@/components/ui/SectionHeading"
import AchievementCarousel from "@/components/ui/AchievementCarousel"

export type AchievementType1 = {
  title: string;
  description: string;
  image: string;
  link: string;
  linkText: string;
};

export type AchievementType2 = {
  title: string;
  description: string;
  image: string;
  links: LinksType[];
};

type LinksType = {
  url: string;
  text: string;
};

// `AchievementType` is an array that can hold either `AchievementType1` or `AchievementType2` items.
export type AchievementType = (AchievementType1 | AchievementType2)[];

export default function AchievementsSection() {
  const achievements: AchievementType = [
    {
      title: "🏆 SIH 2024 Finalist - Innovation Excellence",
      description:
        "Selected as one of the TOP 48 teams out of 1200+ participants in India's largest hackathon. Led development of PrithView, an innovative satellite imagery analysis platform for ISRO that democratizes geospatial intelligence. This achievement demonstrates my ability to solve complex, real-world problems under pressure while working with cutting-edge technologies and delivering solutions that matter at a national level.",
      image: "/img/sih.jpg",
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7278911940347752448/",
      linkText: "View Journey",
    },
    {
      title: "🥇 War of Codes Champion - Competitive Programming Excellence",
      description:
        "Secured GOLD MEDAL at the prestigious War of Codes technical fest, outperforming hundreds of talented developers. This victory showcases my algorithmic thinking, problem-solving speed, and ability to perform under competitive pressure. My success in competitive programming translates directly to writing efficient, optimized code in real-world applications.",
      image: "/img/codewars.jpg",
      link: "https://www.linkedin.com/posts/pratham-israni-a6b672275_warofcodes-codingcompetition-goldmedalist-activity-7201857357700554752-JWrB",
      linkText: "View LinkedIn Post",
    },
    {
      title: "🎯 HackerRank Triple Certification - Technical Validation",
      description:
        "Earned multiple industry-recognized certifications validating my expertise across the full development stack. These certifications demonstrate my commitment to continuous learning and mastery of core technologies that drive modern web development. Each certification required passing rigorous assessments that test both theoretical knowledge and practical implementation skills.",
      image: "/img/rc.png",
      links: [
        {
          text: "Problem Solving Certification",
          url: "https://www.hackerrank.com/certificates/iframe/13148a670d27",
        },
        {
          text: "JavaScript Certification",
          url: "https://www.hackerrank.com/certificates/iframe/9e4584e46e53",
        },
        {
          text: "React Certification",
          url: "https://www.hackerrank.com/certificates/iframe/b9157c3f6d35",
        },
      ],
    },
    {
      title: "💪 LeetCode Mastery - Consistent Excellence",
      description:
        "Achieved 600+ problems solved with a remarkable 350+ day streak, demonstrating unwavering dedication to algorithmic excellence. Ranked in TOP 5% across multiple contests (1783/38868 in Biweekly Contest 134). This consistent high performance proves my ability to tackle complex algorithmic challenges and optimize solutions - skills that directly translate to writing efficient, scalable code in production environments.",
      image: "/img/365Day.gif",
      link: "https://leetcode.com/u/Pratham012/",
      linkText: "View Profile",
    },
  ];

  return (
    <section id="achievements" className="min-h-[100dvh] py-5 md:pt-20 md:pb-10 relative">
      <div className="container mx-auto px-4">
        <SectionHeading>Achievements</SectionHeading>

        {/* Client component for carousel */}
        <AchievementCarousel achievements={achievements} />
      </div>
    </section>
  );
}