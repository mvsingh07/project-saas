export function formatDateTime(date: Date | string | number, locale?: string): string {
  const dateObj = new Date(date)

  // Format the date and time according to the user's locale
  return new Intl.DateTimeFormat(locale || undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(dateObj)
}

export function formatDate(date: Date | string | number, locale?: string): string {
  const dateObj = new Date(date)

  // Format only the date according to the user's locale
  return new Intl.DateTimeFormat(locale || undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(dateObj)
}

export function formatTime(date: Date | string | number, locale?: string): string {
  const dateObj = new Date(date)

  // Format only the time according to the user's locale
  return new Intl.DateTimeFormat(locale || undefined, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(dateObj)
}

export function getCurrentDateTime(locale?: string): string {
  return formatDateTime(new Date(), locale)
}
