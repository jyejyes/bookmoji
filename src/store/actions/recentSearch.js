export const ADD_RECENT_SEARCH = "recentSearch/ADD_RECENT_SEARCH";
export const REMOVE_RECENT_SEARCH = "recentSearch/REMOVE_RECENT_SEARCH";

export const addRecentSearch = (word) => ({
  type: ADD_RECENT_SEARCH,
  word: word,
});

export const removeRecentSearch = (word) => ({
  type: REMOVE_RECENT_SEARCH,
  word,
});
