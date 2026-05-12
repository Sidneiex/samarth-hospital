import type { SVGProps } from "react";

export default function SamarthLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Diamond border */}
      <rect
        x="8"
        y="8"
        width="64"
        height="64"
        rx="6"
        transform="rotate(45 40 40)"
        stroke="#C9A84C"
        strokeWidth="2"
        fill="none"
      />
      {/* Caduceus staff */}
      <line x1="40" y1="18" x2="40" y2="62" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" />
      {/* Top wing bar */}
      <path d="M31 26 Q40 22 49 26" stroke="#C9A84C" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Snake 1 - left coil */}
      <path
        d="M40 26 C34 30 34 36 40 38 C46 40 46 46 40 50"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Snake 2 - right coil */}
      <path
        d="M40 26 C46 30 46 36 40 38 C34 40 34 46 40 50"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Snakes head */}
      <circle cx="40" cy="24" r="2.5" fill="#C9A84C" />
    </svg>
  );
}
