export function capitalize(string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0) + word.slice(1, word.length).toLowerCase())
    .join(" ");
}
