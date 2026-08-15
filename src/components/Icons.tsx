import type { FC, SVGProps } from "react";

/**
 * Small inline SVG icon set for the user card. Every icon uses
 * currentColor and a fixed viewBox so it can be sized purely from CSS
 * (font-size / width+height) wherever it's dropped in, with no emoji
 * font, no external request, and no per-platform rendering
 * differences.
 */

export const LocationIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const CalendarIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="4.5" width="18" height="16" rx="2" />
    <path d="M16 2.5v4M8 2.5v4M3 9.5h18" />
  </svg>
);

/** Official X (formerly Twitter) wordmark logo. */
export const XLogoIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231ZM17.083 19.77h1.833L7.084 4.126H5.117Z" />
  </svg>
);

/** The Internet Archive's stylized rounded-square-and-columns mark. */
export const ArchiveLogoIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.14" />
    <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth={1.3} />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
    <path d="M4 10.2h16M4 13.8h16" stroke="currentColor" strokeWidth={1.3} />
  </svg>
);
