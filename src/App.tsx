import { useEffect, useMemo, useState, type FC } from "react";
import { UserDirectory, type SortOrder } from "./services/UserDirectory";
import type { XUser } from "./models/XUser";
import { UserCard } from "./components/UserCard";
import { SearchBar } from "./components/SearchBar";
import { SortToggle } from "./components/SortToggle";
import { Footer } from "./components/Footer";
import { NavHeader } from "./components/NavHeader";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; directory: UserDirectory };

const BASE_URL = import.meta.env.BASE_URL;

export const App: FC = () => {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOrder>("alphabetical");
  const [expandedHandle, setExpandedHandle] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    UserDirectory.load(BASE_URL)
      .then((directory) => {
        if (!cancelled) setState({ status: "ready", directory });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          const message =
            error instanceof Error ? error.message : "Unable to load the directory.";
          setState({ status: "error", message });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const results: XUser[] = useMemo(() => {
    if (state.status !== "ready") return [];
    return state.directory.search(query, sort);
  }, [state, query, sort]);

  return (
    <div className="page" id="top">
      <NavHeader userCount={state.status === "ready" ? state.directory.count : undefined} />

      <header className="page-header">
        <span className="eyebrow">Directory</span>
        <h1 className="page-title">A record of who moved where</h1>
        <p className="page-tagline">
          Every card links to a current X profile by handle, with the
          archived history from the Wayback Machine one click behind it.
        </p>

        {state.status === "ready" && (
          <div className="toolbar">
            <SearchBar value={query} onChange={setQuery} />
            <SortToggle value={sort} onChange={setSort} />
            <span className="result-count">
              {results.length} of {state.directory.count}
            </span>
          </div>
        )}
      </header>

      {state.status === "loading" && (
        <p className="status-message">Loading directory...</p>
      )}

      {state.status === "error" && (
        <p className="status-message">{state.message}</p>
      )}

      {state.status === "ready" && (
        <>
          {results.length === 0 ? (
            <p className="empty-state">No matches for that search.</p>
          ) : (
            <div className="user-grid">
              {results.map((user, index) => (
                <UserCard
                  key={user.handle}
                  user={user}
                  baseUrl={BASE_URL}
                  expanded={expandedHandle === user.handle}
                  onToggle={() =>
                    setExpandedHandle((current) =>
                      current === user.handle ? null : user.handle,
                    )
                  }
                  style={{ animationDelay: `${Math.min(index, 24) * 18}ms` }}
                />
              ))}
            </div>
          )}
        </>
      )}

      <Footer />
    </div>
  );
};
