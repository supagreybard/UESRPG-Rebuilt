export function localize(
  key: string,
  data?: Record<string, string>,
): string {
  if (data) {
    return game.i18n?.format(key, data) ?? key;
  }

  return game.i18n?.localize(key) ?? key;
}
