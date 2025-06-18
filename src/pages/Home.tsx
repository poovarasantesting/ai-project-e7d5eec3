import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const skills = [
    "JavaScript", "TypeScript", "React", "Node.js", 
    "UI/UX Design", "Tailwind CSS", "Next.js", "GraphQL"
  ];

  const featuredProjects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured online store with shopping cart, payment processing and order management.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500&auto=format&fit=crop",
      tags: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
      id: 2,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for monitoring social media metrics with real-time data visualization.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop",
      tags: ["TypeScript", "D3.js", "Express", "Firebase"]
    }
  ];

  return (
    <div className="flex flex-col gap-16 py-8 md:py-16">
      {/* Hero Section */}
      <section className="container flex flex-col items-center text-center gap-6 pt-8 md:pt-12">
        <Badge variant="secondary" className="px-4 py-1 text-sm">
          Welcome to my portfolio
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Hi, I'm <span className="text-primary">Your Name</span>
        </h1>
        <p className="max-w-[700px] text-lg md:text-xl text-muted-foreground">
          I'm a frontend developer specializing in building exceptional digital experiences
          that are accessible, inclusive, and user-centered.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button asChild size="lg">
            <Link to="/projects">
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container">
        <div className="flex flex-col gap-6 text-center">
          <h2 className="text-3xl font-bold">My Skills</h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Here are some technologies and tools I work with on a daily basis.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              A selection of my recent work. These projects showcase my skills and expertise.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" size="sm">
                        View Project
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link to="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}