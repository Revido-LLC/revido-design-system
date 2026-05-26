import type { Config } from 'tailwindcss'

function colorScale(name: string) {
  const shades = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  const scale: Record<string, string> = {}
  for (const shade of shades) {
    scale[shade] = `var(--rds-color-${name}-${shade})`
  }
  return scale
}

export function revido(): Partial<Config> {
  return {
    theme: {
      extend: {
        colors: {
          primary: colorScale('primary'),
          secondary: colorScale('secondary'),
          destructive: colorScale('destructive'),
          success: colorScale('success'),
          warning: colorScale('warning'),
          background: 'var(--rds-color-background)',
          foreground: 'var(--rds-color-foreground)',
          muted: {
            DEFAULT: 'var(--rds-color-muted)',
            foreground: 'var(--rds-color-muted-foreground)',
          },
          border: 'var(--rds-color-border)',
          ring: 'var(--rds-color-ring)',
          input: 'var(--rds-color-input)',
        },
        fontFamily: {
          sans: ['var(--rds-font-sans)'],
          mono: ['var(--rds-font-mono)'],
        },
        fontSize: {
          xs: 'var(--rds-font-size-xs)',
          sm: 'var(--rds-font-size-sm)',
          md: 'var(--rds-font-size-md)',
          lg: 'var(--rds-font-size-lg)',
          xl: 'var(--rds-font-size-xl)',
          '2xl': 'var(--rds-font-size-2xl)',
          '3xl': 'var(--rds-font-size-3xl)',
          '4xl': 'var(--rds-font-size-4xl)',
        },
        borderRadius: {
          none: 'var(--rds-radius-none)',
          sm: 'var(--rds-radius-sm)',
          md: 'var(--rds-radius-md)',
          lg: 'var(--rds-radius-lg)',
          xl: 'var(--rds-radius-xl)',
          '2xl': 'var(--rds-radius-2xl)',
          full: 'var(--rds-radius-full)',
        },
        boxShadow: {
          xs: 'var(--rds-shadow-xs)',
          sm: 'var(--rds-shadow-sm)',
          md: 'var(--rds-shadow-md)',
          lg: 'var(--rds-shadow-lg)',
          xl: 'var(--rds-shadow-xl)',
          '2xl': 'var(--rds-shadow-2xl)',
        },
      },
    },
  }
}
