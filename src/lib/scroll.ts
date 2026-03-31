/**
 * Scroll the page smoothly to the element with the given id.
 */
export function scrollToSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
