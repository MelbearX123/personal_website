/** 0 → "01", the numbering used on playlist-style lists. */
export const trackNumber = (index: number) => String(index + 1).padStart(2, '0')
