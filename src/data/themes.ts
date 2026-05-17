export const THEMES = [
  {
    id: "news-of-the-world",
    className: "news-of-the-world",
    displayName: "News of the World"
  },
  {
    id: "queen-ii",
    className: "queen-ii",
    displayName: "Queen II"
  },
  {
    id: "a-night-at-the-opera",
    className: "a-night-at-the-opera",
    displayName: "A Night at the Opera"
  },
  {
    id: "jazz",
    className: "jazz",
    displayName: "Jazz"
  },
  {
    id: "the-game",
    className: "the-game",
    displayName: "The Game"
  }
];

export const DEFAULT_THEME = "news-of-the-world";

export function getThemeByClassName(className: string) {
  return THEMES.find(theme => theme.className === className);
}

export function getThemeByDisplayName(displayName: string) {
  return THEMES.find(theme => theme.displayName === displayName);
}
