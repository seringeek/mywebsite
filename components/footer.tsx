export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="mx-auto flex max-w-3xl items-center justify-center px-6 py-6">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Serin. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
