<<<<<<< HEAD
// Importing the BackgroundPaths component
import { BackgroundPaths } from "@/components/ui/background-paths"

/**
 * HeroDemo component - Displays the main hero section with animated background paths
 * Uses the BackgroundPaths UI component with custom title, subtitle and button
 */
function HeroDemo() {
  return (
    <BackgroundPaths
      title="AI that works for your finances."
      subtitle="Transform your financial management with intelligent automation. Simple, powerful, reliable."
      buttonText="Get Started"
      buttonHref="/dashboard"
    />
  );
}

export { HeroDemo }
=======
// Importing the Hero component from UI library
import { Hero } from "../ui/hero"

/**
 * HeroDemo component - Displays the main hero section with title, subtitle and call-to-action
 * Uses the Hero UI component with custom styling props
 */
export function HeroDemo() {
  return (
    <Hero
      // Main headline text
      title="AI that works for your finances."
      // Supporting subtitle text
      subtitle=""
      // Array of action buttons with their properties
      actions={[
        {
          label: "Discover Excellence",
          href: "/dashboard",
          variant: "ghost",
          icon: "→"
        }
      ]}
      // Custom class names for styling different elements
      titleClassName="text-7xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80"
      subtitleClassName=""
      actionsClassName="mt-8"
    />
  );
}
>>>>>>> 2146296071cff410f9a68ade4e4165fe540a4f66
