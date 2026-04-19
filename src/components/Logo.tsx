interface LogoProps {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="5-Star Handyman"
      className={className}
    />
  )
}
