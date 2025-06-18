import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";

type ProjectCategory = "all" | "web" | "mobile" | "design";

interface Project {
  id: number;
  title: string;
  description: string;
  category: Exclude<ProjectCategory, "all">;
  image: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");

  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "A full-featured online store with shopping cart, payment processing and order management.",
      category: "web",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500&auto=format&fit=crop",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      id: 2,
      title: "Social Media Dashboard",
      description:
        "Analytics dashboard for monitoring social media metrics with real-time data visualization.",
      category: "web",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop",
      tags: ["TypeScript", "D3.js", "Express", "Firebase"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      id: 3,
      title: "Fitness Tracking App",
      description:
        "Mobile application for tracking workouts, nutrition, and fitness progress.",
      category: "mobile",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop",
      tags: ["React Native", "Redux", "Firebase", "Health API"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      id: 4,
      title: "Personal Finance Manager",
      description:
        "Web application to track expenses, manage budgets, and visualize spending habits.",
      category: "web",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=500&auto=format&fit=crop",
      tags: ["Vue.js", "Vuex", "Chart.js", "Firebase"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      id: 5,
      title: "Recipe Sharing Platform",
      description:
        "A platform for food enthusiasts to share, discover, and save recipes.",
      category: "web",
      image:
        "https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=500&auto=format&fit=crop",
      tags: ["Next.js", "GraphQL", "MongoDB", "AWS S3"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      id: 6,
      title: "Weather App UI Design",
      description:
        "Modern and intuitive UI design for a weather forecasting application.",
      category: "design",
      image:
        "https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?q=80&w=500&auto=format&fit=crop",
      tags: ["Figma", "UI/UX", "Prototyping", "Design System"],
      demoUrl: "#",
    },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const categories: { value: ProjectCategory; label: string }[] = [
    { value: "all", label: "All Projects" },
    { value: "web", label: "Web Development" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "design", label: "UI/UX Design" },
  ];

  return (
    <div className="container py-12">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">My Projects</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of my work across web development, mobile applications,
            and UI/UX design. Each project represents a unique challenge and
            solution.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={activeCategory === category.value ? "default" : "outline"}
              onClick={() => setActiveCategory(category.value)}
              className="min-w-[120px]"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                {project.demoUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Code
                      <Github className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}