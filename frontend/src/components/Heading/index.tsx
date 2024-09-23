import { cn } from "@/lib/utils"

interface HeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export function Heading({ title, subtitle, className }: HeadingProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h1 className="font-bold tracking-tight text-foreground sm:text-xl md:text-3xl">
        {title}
      </h1>
      {subtitle && (
        <p className="text-md text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  )
}