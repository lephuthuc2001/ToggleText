import Fuse from "fuse.js";

export default function useSearch(data, keys) {
  const fuse = new Fuse(data, {
    isCaseSensitive: false,
    // includeScore: false,
    shouldSort: true,
    includeMatches: false,
    findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.2,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: keys,
  });

  function search(query) {
    return fuse.search(query);
  }

  return {
    search,
  };
}
