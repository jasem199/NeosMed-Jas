const THEME_KEY = 'neosmed-primary-color';
const DEFAULT_PRIMARY_COLOR = '#3949FE';

/**
 * Applies the primary color to the document root and saves it to localStorage.
 * @param {string} color Hex color string
 */
export function applyPrimaryColor(color) {
  if (!color) return;
  document.documentElement.style.setProperty('--color-primary', color);
  
  // Also calculate and set the pressed color (slightly darker)
  // Simple darkening function for hex
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);
  
  // Darken by 15%
  r = Math.floor(r * 0.85);
  g = Math.floor(g * 0.85);
  b = Math.floor(b * 0.85);
  
  const pressedColor = `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
  document.documentElement.style.setProperty('--color-primary-pressed', pressedColor);
  
  localStorage.setItem(THEME_KEY, color);
}

/**
 * Initializes the theme from localStorage on app load.
 */
export function initTheme() {
  const savedColor = localStorage.getItem(THEME_KEY);
  if (savedColor) {
    applyPrimaryColor(savedColor);
  }
}

/**
 * Gets the current primary color, falling back to default.
 */
export function getPrimaryColor() {
  return localStorage.getItem(THEME_KEY) || DEFAULT_PRIMARY_COLOR;
}
