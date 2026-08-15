import type { FC, KeyboardEvent } from "react";
import { Avatar } from "./Avatar";
import {
  LocationIcon,
  CalendarIcon,
  VerifiedIcon,
  PencilIcon,
  DeviceIcon,
  LockIcon,
  GlobeIcon,
  SoundCloudIcon,
  LinkIcon,
  XLogoIcon,
  ArchiveLogoIcon,
} from "./Icons";
import type { XUser } from "../models/XUser";

interface UserCardProps {
  user: XUser;
  baseUrl: string;
  expanded: boolean;
  onToggle: () => void;
  style?: React.CSSProperties;
}

/** Strips the protocol/www and trailing slash for a compact display label. */
function formatLinkLabel(url: string): string {
  try {
    const parsed = new URL(url);
    return (parsed.host + parsed.pathname).replace(/^www\./, "").replace(/\/$/, "");
  } catch {
    return url;
  }
}

/** Picks an icon for a link by its label, so new link types don't need new UI. */
function iconForLink(label: string) {
  const key = label.trim().toLowerCase();
  if (key === "soundcloud") return SoundCloudIcon;
  if (key === "web" || key === "website") return GlobeIcon;
  return LinkIcon;
}

/**
 * Collapsed by default: just the avatar and handle, so the grid can
 * pack many entries into a small footprint. Clicking (or pressing
 * Enter/Space on) the card toggles it open in place to reveal the
 * display name and the two outbound links. Only the expanded links
 * navigate away, so a stray click never leaves the page.
 *
 * Expand/collapse state is owned by the parent (one `expandedHandle`
 * for the whole grid) rather than local state here, so opening a new
 * card automatically closes whichever one was open before.
 */
export const UserCard: FC<UserCardProps> = ({
  user,
  baseUrl,
  expanded,
  onToggle,
  style,
}) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      className={`user-card${expanded ? " user-card-expanded" : ""}`}
      style={style}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`${expanded ? "Collapse" : "Expand"} ${user.displayName}`}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
    >
      <div className="user-card-top">
        <Avatar user={user} baseUrl={baseUrl} />
        <div className="user-text">
          <div className="user-handle">
            @{user.handle}
            {user.isPrivate && (
              <LockIcon className="private-badge" aria-label="Private account" />
            )}
          </div>
          {expanded && (
            <div className="user-name">
              {user.displayName}
              {user.verifiedSince && (
                <VerifiedIcon className="verified-badge" aria-label="Verified" />
              )}
            </div>
          )}
        </div>
      </div>

      {expanded &&
        (user.location ||
          user.joined ||
          user.verifiedSince ||
          user.usernameChangeSummary ||
          user.connectedVia ||
          user.links.length > 0 ||
          user.isPrivate) && (
          <div className="user-card-meta">
            {user.isPrivate && (
              <div className="user-meta-row">
                <LockIcon className="user-meta-icon" />
                Private account
              </div>
            )}
            {user.location && (
              <div className="user-meta-row">
                <LocationIcon className="user-meta-icon" />
                {user.location}
              </div>
            )}
            {user.joined && (
              <div className="user-meta-row">
                <CalendarIcon className="user-meta-icon" />
                Joined {user.joined}
              </div>
            )}
            {user.verifiedSince && (
              <div className="user-meta-row">
                <VerifiedIcon className="user-meta-icon" />
                Verified since {user.verifiedSince}
              </div>
            )}
            {user.usernameChangeSummary && (
              <div className="user-meta-row">
                <PencilIcon className="user-meta-icon" />
                {user.usernameChangeSummary}
              </div>
            )}
            {user.connectedVia && (
              <div className="user-meta-row">
                <DeviceIcon className="user-meta-icon" />
                {user.connectedVia}
              </div>
            )}
            {user.links.map((link) => {
              const Icon = iconForLink(link.label);
              return (
                <a
                  key={link.url}
                  className="user-meta-row user-meta-link"
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Icon className="user-meta-icon" />
                  {formatLinkLabel(link.url)}
                </a>
              );
            })}
          </div>
        )}

      {expanded && (
        <div className="user-card-links">
          <a
            className="user-link"
            href={user.xProfileUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${user.displayName} on X`}
            title="Open on X"
            onClick={(event) => event.stopPropagation()}
          >
            <XLogoIcon className="user-link-icon" />
          </a>
          <a
            className="user-link"
            href={user.archiveProfileUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${user.displayName}'s archived history on the Wayback Machine`}
            title="Open on the Wayback Machine"
            onClick={(event) => event.stopPropagation()}
          >
            <ArchiveLogoIcon className="user-link-icon" />
          </a>
        </div>
      )}
    </div>
  );
};
