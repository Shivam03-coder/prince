import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			inter: [
  				'var(--font-inter)',
                    ...fontFamily.sans
                ],
  			poppins: [
  				'var(--font-poppins)',
                    ...fontFamily.sans
                ],
  			lexend: [
  				'var(--font-lexend)',
                    ...fontFamily.sans
                ],
  			spaceGrotesk: [
  				'var(--font-spaceGrotesk)',
                    ...fontFamily.sans
                ],
  			manrope: [
  				'var(--font-manrope)',
                    ...fontFamily.sans
                ]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			primary: 'var(--color-primary, #1F2937)',
  			secondary: 'var(--color-secondary, #4B5563)',
  			main: 'var(--color-main, #9CA3AF)',
  			dark: 'var(--color-dark, #111827)',
  			card: {
  				DEFAULT: 'hsl(var(--card, 210 11% 15%))',
  				foreground: 'hsl(var(--card-foreground, 210 11% 85%))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover, 210 11% 10%))',
  				foreground: 'hsl(var(--popover-foreground, 210 11% 90%))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted, 210 8% 20%))',
  				foreground: 'hsl(var(--muted-foreground, 210 8% 80%))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent, 210 60% 50%))',
  				foreground: 'hsl(var(--accent-foreground, 210 60% 95%))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive, 0 50% 50%))',
  				foreground: 'hsl(var(--destructive-foreground, 0 50% 95%))'
  			},
  			border: 'hsl(var(--border, 210 10% 30%))',
  			input: 'hsl(var(--input, 210 10% 20%))',
  			ring: 'hsl(var(--ring, 210 100% 50%))',
  			chart: {
  				'1': 'hsl(var(--chart-1, 210 90% 40%))',
  				'2': 'hsl(var(--chart-2, 210 70% 50%))',
  				'3': 'hsl(var(--chart-3, 210 50% 60%))',
  				'4': 'hsl(var(--chart-4, 210 30% 70%))',
  				'5': 'hsl(var(--chart-5, 210 10% 80%))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
} satisfies Config;
