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

/** Simple directory/grid glyph used as the site's brand mark. */
export const GridIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
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
    <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
    <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
    <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
  </svg>
);

/** Verified-account badge: filled scalloped seal with a checkmark. */
export const VerifiedIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2.5 14.4 4.6 17.5 4l1 3 3 1-.6 3.1 2.1 2.4-2.1 2.4.6 3.1-3 1-1 3-3.1-.6L12 23.5l-2.4-2.1-3.1.6-1-3-3-1 .6-3.1L1 12l2.1-2.4L2.5 6.5l3-1 1-3 3.1.6L12 2.5Z" />
    <path
      d="m8.4 12.3 2.4 2.4 4.8-4.8"
      fill="none"
      stroke="var(--surface, #08090b)"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Pencil glyph for a history of username/handle changes. */
export const PencilIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

/** Device/client glyph for the "Connected via" field. */
export const DeviceIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
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
    <rect x="6" y="2.5" width="12" height="19" rx="2.2" />
    <path d="M10.5 18.5h3" />
  </svg>
);

/** Padlock glyph marking a private/protected account. */
export const LockIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
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
    <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
    <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
  </svg>
);

export const GitHubIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 1.5C6.201 1.5 1.5 6.278 1.5 12.166c0 4.71 3.011 8.704 7.19 10.115.526.1.719-.233.719-.518 0-.256-.01-1.1-.015-1.997-2.925.643-3.542-1.26-3.542-1.26-.478-1.234-1.167-1.563-1.167-1.563-.954-.665.072-.652.072-.652 1.056.075 1.611 1.101 1.611 1.101.938 1.635 2.46 1.163 3.06.89.095-.692.367-1.164.668-1.432-2.335-.269-4.79-1.192-4.79-5.302 0-1.149.402-2.089 1.06-2.825-.106-.269-.46-1.35.1-2.812 0 0 .864-.281 2.83 1.079a9.71 9.71 0 0 1 2.575-.35 9.71 9.71 0 0 1 2.575.35c1.965-1.36 2.828-1.079 2.828-1.079.562 1.462.208 2.543.102 2.812.66.736 1.058 1.676 1.058 2.825 0 4.12-2.46 5.028-4.803 5.292.377.331.714.98.714 1.976 0 1.427-.013 2.577-.013 2.928 0 .287.191.622.724.517C19.492 20.865 22.5 16.874 22.5 12.166 22.5 6.278 17.799 1.5 12 1.5Z"
    />
  </svg>
);
