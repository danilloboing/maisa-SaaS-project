export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src="/placeholder.svg?height=96&width=96"
              alt="Company Logo"
              className="w-full h-full object-cover"
            />
          </div> */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Maisa ltda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}