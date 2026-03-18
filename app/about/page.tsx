import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"

const skills = [
  "Product Strategy",
  "Growth & Experimentation",
  "AI-enabled Products",
  "Data & Analytics",
  "Marketplaces",
  "APIs / SaaS",
  "Operations",
]

const interests = [
  "AI Systems",
  "Product Thinking",
  "Marketplaces",
  "Startup Building",
  "Community & Mentorship",
]

const experience = [
  {
    title: "Fractional Product Leader",
    company: "",
    isCurrent: true,
    description: "Working with a portfolio of AI-first startups on product strategy, growth systems, and AI-enabled workflows.",
  },
  {
    title: "Senior Product Manager",
    company: "AIMER",
    isCurrent: false,
    description:
      "Built AI-driven marketing and learning systems improving engagement, hiring efficiency, and CAC.",
  },
  {
    title: "Senior Product Manager",
    company: "Gojek",
    isCurrent: false,
    description:
      "Scaled logistics products used by millions of users across Southeast Asia.",
  },
  {
    title: "Head of Product",
    company: "Tonguestun (Acquired by Zomato)",
    isCurrent: false,
    description: "Scaled marketplace from 1.5M to 36M monthly transactions.",
  },
]

const highlights = [
  "Mentor to 500+ product professionals across PM communities",
  "Speaker at product forums and startup communities",
  "Built Learning Curv, a PM learning platform later acquired by AIMER",
  "Run a YouTube channel on AI, product, and growth deep dives",
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-12">
        {/* Header */}
        <section className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Serin Paul</h1>
          <p className="text-muted-foreground">Product, Growth, AI</p>
        </section>

        {/* Bio */}
        <section className="mb-8">
          <p className="text-foreground leading-relaxed italic">
            I enjoy building products that scale. Over the last decade I&apos;ve worked across
            startups and global companies, taking products from 0→1 and from PMF to hypergrowth.
          </p>
          <p className="text-foreground leading-relaxed italic mt-4">
            I like operating at the intersection of product, growth, and technology, using
            experimentation, data, and increasingly AI systems to solve real business problems.
          </p>
          <p className="text-foreground leading-relaxed italic mt-4">
            Outside work, I enjoy mentoring product managers, building side projects, and exploring
            emerging technologies shaping the future of work and intelligence.
          </p>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="outline" className="font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge key={interest} variant="outline" className="font-normal">
                {interest}
              </Badge>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-dashed border-border my-6" />

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="flex gap-3">
                <div className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{exp.title}</h3>
                    {exp.isCurrent && (
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  {exp.company && (
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                  )}
                  {exp.description && (
                    <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-dashed border-border my-6" />

        {/* Highlights */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Highlights</h2>
          <ul className="space-y-2">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2 text-foreground">
                <span className="text-primary mt-1">✦</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  )
}
