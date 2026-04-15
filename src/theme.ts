export const palette = {
  babyBlue: '#3183FF',
  metallicPurple: '#615280',
  black: '#000000',
  white: '#FFFFFF',
  zinc950: '#09090b',
  zinc900: '#18181b',
  zinc800: '#27272a',
  zinc400: '#a1a1aa',
  zinc50: '#fafafa',
};

export type ColorMode = 'dark' | 'light';

export function getTheme(mode: ColorMode) {
  const isDark = mode === 'dark';

  const background = isDark ? palette.black : palette.white;
  const card = isDark ? palette.zinc950 : '#f4f4f5';
  const border = isDark ? palette.zinc800 : '#e4e4e7';
  const text = isDark ? palette.zinc50 : '#0a0a0a';
  const mutedText = isDark ? palette.zinc400 : '#52525b';

  return {
    mode,
    background,
    card,
    border,
    text,
    mutedText,
    primary: palette.babyBlue,
    secondary: palette.metallicPurple,
    success: '#22c55e',
    danger: '#ef4444',
  };
}
