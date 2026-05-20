
export const THEMES = [
    {
    id: "the-miracle",
    className: "the-miracle",
    displayName: "The Miracle"
  },
  {
    id: "queen-ii",
    className: "queen-ii",
    displayName: "Queen II"
  },
  {
    id: "news-of-the-world",
    className: "news-of-the-world",
    displayName: "News of the World"
  },
  {
    id: "a-night-at-the-opera",
    className: "a-night-at-the-opera",
    displayName: "A Night at the Opera"
  },
  {
    id: "hot-space",
    className: "hot-space",
    displayName: "Hot Space"
  },
];

export const DEFAULT_THEME = "news-of-the-world";

export function getThemeByClassName(className: string) {
  return THEMES.find(theme => theme.className === className);
}

export function getThemeByDisplayName(displayName: string) {
  return THEMES.find(theme => theme.displayName === displayName);
}
