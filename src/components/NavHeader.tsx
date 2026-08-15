import type { FC } from "react";
import { GitHubIcon, XLogoIcon, ArchiveLogoIcon } from "./Icons";

interface NavHeaderProps {
  userCount?: number;
}

/**
 * Sticky top navigation. Kept intentionally small and quiet so it
 * doesn't compete with the hero title beneath it — a brand mark on
 * the left, outbound reference links on the right. All icons come
 * from Icons.tsx rather than emoji or an icon font, so they render
 * identically everywhere and can be sized purely from CSS.
 */
export const NavHeader: FC<NavHeaderProps> = ({ userCount }) => {
  return (
    <header className="nav-header">
      <div className="nav-inner">
        <a className="nav-brand" href="#top" aria-label="Directory, back to top">
          <span className="nav-brand-mark" aria-hidden="true">
            <XLogoIcon className="nav-brand-icon" />
          </span>
          <span className="nav-brand-text">
            Directory
            {typeof userCount === "number" && (
              <span className="nav-brand-count">{userCount}</span>
            )}
          </span>
        </a>

        <nav className="nav-links" aria-label="Reference links">
          <a
            className="nav-link"
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
          >
            <XLogoIcon className="nav-link-icon" />
            <span>X</span>
          </a>
          <a
            className="nav-link"
            href="https://web.archive.org"
            target="_blank"
            rel="noreferrer"
          >
            <ArchiveLogoIcon className="nav-link-icon" />
            <span>Wayback&nbsp;Machine</span>
          </a>
          <a
            className="nav-link nav-link-repo"
            href="https://github.com/twitterusers/twitterusers.github.io"
            target="_blank"
            rel="noreferrer"
            aria-label="View source on GitHub"
          >
            <GitHubIcon className="nav-link-icon" />
            <span>GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
};
