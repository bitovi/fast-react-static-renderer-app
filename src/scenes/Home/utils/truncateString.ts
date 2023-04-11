export const truncateString = (text: string): string => {
  return text?.length > 100 ? `${text.substr(0, 100)}...` : text
}
