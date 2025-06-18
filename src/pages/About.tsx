import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  GraduationCap,
  Star,
  Award,
  Heart,
  Coffee,
} from "lucide-react";

export default function About() {
  const timeline = [
    {
      id: 1,
      date: "2022 - Present",
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      description:
        "Leading the frontend development team, architecting scalable web applications, and implementing best practices.",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      id: 2,
      date: "2019 - 2022",
      title: "Frontend Developer",
      company: "Digital Innovations",
      description:
        "Developed responsive web applications using React, TypeScript, and modern CSS frameworks.",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      id: 3,
      date: "2017 - 2019",
      title: "Junior Web Developer",
      company: "CreativeWeb Studios",
      description:
        "Built and maintained client websites, collaborated with designers, and implemented UI components.",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      id: 4,
      date: "2017",
      title: "Computer Science Degree",
      company: "University of Technology",
      description:
        "Bachelor's degree in Computer Science with a focus on web technologies and software engineering.",
      icon: <GraduationCap className="h-5 w-5" />,
    },
  ];

  const interests = [
    {
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      title: "Open Source",
      description:
        "Contributing to open-source projects and building tools for the community.",
    },
    {
      icon: <Award className="h-5 w-5 text-blue-500" />,
      title: "Accessibility",
      description:
        "Ensuring digital experiences are accessible to everyone regardless of abilities.",
    },
    {
      icon: <Heart className="h-5 w-5 text-red-500" />,
      title: "UI/UX Design",
      description:
        "Creating intuitive user interfaces and meaningful user experiences.",
    },
    {
      icon: <Coffee className="h-5 w-5 text-amber-700" />,
      title: "Coffee & Coding",
      description:
        "Exploring new technologies and frameworks while enjoying a good cup of coffee.",
    },
  ];

  return (
    <div className="container py-12 max-w-4xl">
      <div className="space-y-12">
        {/* About Me Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">About Me</h1>
            <p className="text-muted-foreground">
              My journey, experience, and what drives me
            </p>
          </div>

          <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-start">
            <div className="space-y-4">
              <p>
                Hi there! I'm a passionate frontend developer with over 5 years
                of experience creating engaging and user-friendly web
                applications. I specialize in modern JavaScript frameworks,
                responsive design, and building accessible user interfaces.
              </p>
              <p>
                My approach to development focuses on creating clean,
                maintainable code that delivers exceptional user experiences. I'm
                constantly learning and exploring new technologies to stay at the
                forefront of web development.
              </p>
              <p>
                When I'm not coding, you can find me hiking in the mountains,
                reading tech blogs, or experimenting with new recipes in the
                kitchen.
              </p>
            </div>

            <div className="aspect-square overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop"
                alt="Profile picture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Career Timeline */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">My Journey</h2>
            <p className="text-muted-foreground">
              Professional experience and education
            </p>
          </div>

          <div className="relative pl-8 border-l space-y-8">
            {timeline.map((item) => (
              <div key={item.id} className="relative">
                <div className="absolute -left-10 p-1 rounded-full bg-background border">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    {item.date}
                  </div>
                  <h3 className="text-xl font-medium">{item.title}</h3>
                  <div className="font-medium text-primary">{item.company}</div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interests & Passions */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">
              Interests & Passions
            </h2>
            <p className="text-muted-foreground">
              What keeps me motivated and inspired
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {interests.map((interest, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-muted shrink-0">
                      {interest.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">{interest.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {interest.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}