import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Github, Linkedin } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-12">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/images/profile.png"
              alt="Serin Paul"
              width={56}
              height={56}
              className="rounded-full"
            />
            <h1 className="font-[family-name:var(--font-caveat)] text-3xl text-foreground">
              Hey, I&apos;m Serin
            </h1>
          </div>

          <div className="space-y-4 text-foreground leading-relaxed">
            <p>
              Working with a portfolio of AI-first startups on product strategy, growth systems, and AI-enabled workflows.
            </p>

            <p>
              A <strong>Senior Product Manager</strong> working with a portfolio of{" "}
              <strong>AI-first startups</strong> on <strong>product strategy</strong>,{" "}
              <strong>growth systems</strong>, and <strong>AI-enabled workflows</strong>. Previously built
              disruptive products across <strong>Services</strong>, <strong>Education</strong>,{" "}
              <strong>and Marketplaces</strong> with companies like <strong>Zomato</strong>,{" "}
              <strong>Gojek</strong>, and several startups.
            </p>

            <p>
              On weekends, I enjoy <strong>building side projects</strong>,{" "}
              <strong>mentoring</strong>, participating in <strong>community events</strong>, and{" "}
              <strong>tinkering with AI research</strong>.
            </p>

            <p>
              I write about <strong>people</strong>, <strong>business</strong>,{" "}
              <strong>products</strong>, <strong>AI</strong>, and <strong>philosophy</strong>.
            </p>

            <p>Reach out anytime to chat.</p>
          </div>
        </section>

        {/* Social Links */}
        <section className="mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="https://x.com/serin_paul"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            <Link
              href="https://www.linkedin.com/in/serinpaul/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com/seringeek"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* CTA Buttons */}
        <section className="mb-8">
          <div className="flex items-center gap-3">
            <Link
              href="https://www.linkedin.com/in/serinpaul/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Quick Chat?
            </Link>
            <Link
              href="https://www.linkedin.com/in/serinpaul/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Read posts
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
