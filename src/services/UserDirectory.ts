import { XUser, type XUserRecord } from "../models/XUser";

/** The two ways the directory grid can be ordered. */
export type SortOrder = "alphabetical" | "recentlyUpdated";

/**
 * Loads and holds the full set of XUser entries. Kept as a small class
 * rather than a bag of free functions so that ordering, deduping, and
 * search all live behind one object with a clear lifecycle: build once
 * from JSON, then query it as many times as needed.
 */
export class UserDirectory {
  private readonly users: XUser[];

  private constructor(users: XUser[]) {
    this.users = users;
  }

  /** All entries, sorted alphabetically by handle. */
  all(): XUser[] {
    return this.users;
  }

  get count(): number {
    return this.users.length;
  }

  /**
   * Entries whose handle or display name matches the given query,
   * ordered per `sort`: "alphabetical" (A-Z by handle) or
   * "recentlyUpdated" (most recently added or edited first).
   */
  search(query: string, sort: SortOrder = "alphabetical"): XUser[] {
    const matches = query.trim()
      ? this.users.filter((user) => user.matches(query))
      : this.users;

    if (sort === "recentlyUpdated") {
      return [...matches].sort((a, b) => b.updatedOrder - a.updatedOrder);
    }
    return matches;
  }

  static fromRecords(records: XUserRecord[]): UserDirectory {
    const seen = new Set<string>();
    const users: XUser[] = [];
    records.forEach((record, index) => {
      const user = XUser.fromRecord(record, index);
      const key = user.handle.toLowerCase();
      if (!key || seen.has(key)) return;
      seen.add(key);
      users.push(user);
    });
    users.sort((a, b) =>
      a.handle.toLowerCase().localeCompare(b.handle.toLowerCase())
    );
    return new UserDirectory(users);
  }

  /** Fetches src/data/users.json (served from the app's base URL at runtime). */
  static async load(baseUrl: string): Promise<UserDirectory> {
    const response = await fetch(`${baseUrl}data/users.json`);
    if (!response.ok) {
      throw new Error(`Failed to load user directory: ${response.status}`);
    }
    const records = (await response.json()) as XUserRecord[];
    return UserDirectory.fromRecords(records);
  }
}
