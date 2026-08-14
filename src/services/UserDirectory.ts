import { XUser, type XUserRecord } from "../models/XUser";

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

  /** Entries whose handle or display name matches the given query. */
  search(query: string): XUser[] {
    if (!query.trim()) return this.users;
    return this.users.filter((user) => user.matches(query));
  }

  static fromRecords(records: XUserRecord[]): UserDirectory {
    const seen = new Set<string>();
    const users: XUser[] = [];
    for (const record of records) {
      const user = XUser.fromRecord(record);
      const key = user.handle.toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      users.push(user);
    }
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
