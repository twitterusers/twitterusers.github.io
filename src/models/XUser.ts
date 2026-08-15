/**
 * Raw shape stored in src/data/users.json. Deliberately minimal: a
 * handle and a display name are all this dataset needs, since every
 * link this site produces (the live X profile, the archived history,
 * the local avatar) is derived from the handle alone.
 */
export interface XUserRecord {
  handle: string;
  displayName: string;
  /** Optional "Joined <Month year>" text, shown in the expanded card if present. */
  joined?: string;
  /** Optional free-text location, shown in the expanded card if present. */
  location?: string;
}

/**
 * OOP wrapper around a single directory entry. Everything a card needs
 * to render or link out to is exposed as a getter here, so components
 * stay dumb and the handle-to-URL rules live in exactly one place.
 */
export class XUser {
  readonly handle: string;
  readonly displayName: string;
  readonly joined?: string;
  readonly location?: string;

  /** Extension expected for locally supplied avatars, see public/images/users/README.md */
  private static readonly imageExtension = "webp";

  constructor(record: XUserRecord) {
    this.handle = record.handle.trim();
    this.displayName = record.displayName.trim() || record.handle.trim();
    this.joined = record.joined?.trim() || undefined;
    this.location = record.location?.trim() || undefined;
  }

  /** The live profile on X, e.g. https://x.com/jfjfj */
  get xProfileUrl(): string {
    return `https://x.com/${this.handle}`;
  }

  /**
   * The Wayback Machine's calendar view for that same handle's old
   * Twitter profile. A "*" wildcard on the capture timestamp lands on
   * every snapshot archive.org holds for twitter.com/<handle>, across
   * all years, rather than requiring one exact date.
   *
   * Scheme matters here: old Twitter profile pages were served over
   * plain http, not https (Twitter didn't move to https-by-default
   * until years later), and most of the earliest Wayback captures are
   * filed under the http:// URL. Using https:// in the target URL
   * causes the calendar to miss those early snapshots, so this always
   * points at http://twitter.com/<handle>.
   */
  get archiveProfileUrl(): string {
    return `https://web.archive.org/web/*/http://twitter.com/${this.handle}`;
  }

  /** Local avatar path, matched by filename to the handle (lowercase). */
  get localImagePath(): string {
    return `images/users/${this.handle.toLowerCase()}.${XUser.imageExtension}`;
  }

  /** One or two letters shown when no avatar image is available. */
  get initials(): string {
    const trimmed = this.displayName.trim();
    if (!trimmed) return "?";
    const parts = trimmed.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  /** Whether this entry matches a free text search query. */
  matches(query: string): boolean {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      this.handle.toLowerCase().includes(q) ||
      this.displayName.toLowerCase().includes(q)
    );
  }

  static fromRecord(record: XUserRecord): XUser {
    return new XUser(record);
  }
}
