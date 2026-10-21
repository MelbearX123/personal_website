// All copy and links for the site live here so sections stay purely presentational.

export const NAV_LINKS = [
  { href: '#about', label: 'about' },
  { href: '#experience', label: 'experience' },
  { href: '#projects', label: 'work' },
  { href: '#contact', label: 'contact' },
]

export const FOCUS_AREAS = ['frontend', 'fullstack', 'computer vision']

export const HOBBIES = ['Video games', 'Gym', 'Music', 'Erhu']

export interface Experience {
  title: string
  href?: string
  summary: string
  dates: string
}

export const EXPERIENCE: Experience[] = [
  {
    title: 'Software Developer Intern — Miovision Technologies',
    href: 'https://miovision.com/',
    summary:
      'Modernized frontend and optimized production data flows for a traffic-intelligence platform serving 17,000+ cities.',
    dates: 'May 2026 — Aug 2026',
  },
  {
    title: 'Autonomy Developer — Waterloo Aerial Robotics Group',
    href: 'https://www.uwarg.com/',
    summary:
      "Building the real-time computer-vision and messaging systems that feed an autonomous drone's onboard localization.",
    dates: 'May 2026 — Present',
  },
  {
    title: 'Software Developer Intern — Port 443 Inc.',
    href: 'https://www.port443.io/',
    summary: 'Refactored frontend and backend API handling across three production brands serving 15,000+ users.',
    dates: 'Sep 2025 — Dec 2025',
  },
  {
    title: 'University of Waterloo',
    summary: 'BASc, Computer Engineering — Honours, 3× Excellent Standing.',
    dates: 'Sept 2024 — May 2029',
  },
]

export type ProjectId = 'lamp' | 'chromaforge' | 'handcursorx' | 'digivolve'

export interface Project {
  id: ProjectId
  title: string
  summary: string
  stack: string[]
  href: string // source code
  demo?: string // live site, when there is one
}

export const PROJECTS: Project[] = [
  {
    id: 'lamp',
    title: 'Interactive Lamp Sim',
    summary: 'A simulated 5-DOF lamp character that reacts to people with vision, speech and motion.',
    stack: ['Python', 'OpenCV', 'MuJoCo'],
    href: 'https://github.com/MelbearX123/cv_monorepo/tree/main/projects/interactive_lamp',
  },
  {
    id: 'handcursorx',
    title: 'handcursorx',
    summary: 'Webcam-driven hands-free cursor control. Pinch to click, move to point, gesture to scroll.',
    stack: ['Python', 'MediaPipe', 'OpenCV'],
    href: 'https://github.com/MelbearX123/handcursorx',
  },
  {
    id: 'digivolve',
    title: 'Digivolve Target',
    summary:
      'Finds the fastest digivolution route from one Digimon to another in Digimon Story: Time Stranger.',
    stack: ['React', 'FastAPI', 'TypeScript'],
    href: 'https://github.com/MelbearX123/digivolve-target',
    demo: 'https://digivolve-target.vercel.app/',
  },
  {
    id: 'chromaforge',
    title: 'ChromaForge',
    summary: 'Splits an image into its colour layers to generate custom game background assets.',
    stack: ['Python', 'NumPy'],
    href: 'https://github.com/MelbearX123/cv_monorepo/tree/main/projects/chromaforge',
  },
]

export const EMAIL = 'mxiong@uwaterloo.ca'

export const SOCIALS = [
  { label: 'github', href: 'https://github.com/MelbearX123' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/melodie-xiong' },
]
