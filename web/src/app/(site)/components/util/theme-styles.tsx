type ThemeStyleProps = {
  theme: Record<string, string>;
};

export default function ThemeStyle({ theme }: ThemeStyleProps) {
  if (!theme) return null;

  const cssVars = Object.entries(theme)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');

  return (
    <style>{`:root {\n${cssVars}\n}`}</style>
  );
}
