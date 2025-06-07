
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
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
				},
				// Cyberpunk theme colors
				cyber: {
					background: '#0a0a0f',
					surface: '#141421',
					primary: '#00f5ff',
					secondary: '#8b5cf6',
					accent: '#ff0080',
					success: '#00ff88',
					warning: '#ffaa00',
					error: '#ff3366',
					text: '#e4e4e7',
					muted: '#71717a'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 5px rgba(0, 245, 255, 0.5)',
					},
					'50%': {
						boxShadow: '0 0 20px rgba(0, 245, 255, 0.8), 0 0 30px rgba(0, 245, 255, 0.4)',
					}
				},
				'circuit-pulse': {
					'0%': {
						opacity: '0.3',
						transform: 'scale(1)',
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1.05)',
					},
					'100%': {
						opacity: '0.3',
						transform: 'scale(1)',
					}
				},
				'data-flow': {
					'0%': {
						transform: 'translateX(-100%)',
						opacity: '0',
					},
					'10%': {
						opacity: '1',
					},
					'90%': {
						opacity: '1',
					},
					'100%': {
						transform: 'translateX(100%)',
						opacity: '0',
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)',
					},
					'50%': {
						transform: 'translateY(-10px)',
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'circuit-pulse': 'circuit-pulse 3s ease-in-out infinite',
				'data-flow': 'data-flow 2s ease-in-out',
				'float': 'float 3s ease-in-out infinite'
			},
			backgroundImage: {
				'circuit-pattern': `
					radial-gradient(circle at 25% 25%, rgba(0, 245, 255, 0.1) 0%, transparent 25%),
					radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 25%),
					linear-gradient(90deg, rgba(0, 245, 255, 0.05) 1px, transparent 1px),
					linear-gradient(rgba(0, 245, 255, 0.05) 1px, transparent 1px)
				`,
				'hologram-grid': `
					linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px),
					linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px)
				`
			},
			backgroundSize: {
				'circuit-pattern': '100px 100px, 100px 100px, 20px 20px, 20px 20px',
				'hologram-grid': '20px 20px, 20px 20px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
