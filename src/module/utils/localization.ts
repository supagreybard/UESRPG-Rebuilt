export function localize(key: string): string {
  return game.i18n?.localize(key) ?? key;
}
