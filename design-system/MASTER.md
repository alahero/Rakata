# RAKATA MASTER DESIGN SYSTEM ⚡
> **Status:** Active | **Vibe:** Rebel, Underground, Brutalist

This document is the "Source of Truth" for the Rakata website. It codifies the visual identity used in the Hero section and extends it to the rest of the site.

---

## 1. 🎨 Visual DNA (Extracted from Hero)
The brand identity is **Undiluted Rebellion**. It rejects corporate smoothness in favor of raw, high-impact visuals.

| Element | Specification | Rationale |
| :--- | :--- | :--- |
| **Primary Color** | `--magenta: #e63b81` | Energy, provocation, nightlife. |
| **Secondary Color** | `--neon-green: #77d970` | Contrast, "toxic" vibrancy. |
| **Base Color** | `--void: #0A0A0A` | Depth, elegance of the night. |
| **Typography (Main)** | `Montserrat` (900 Italic) | Heavy, imposing, fast. |
| **Typography (Display)** | `Permanent Marker` | Raw "perreo" and street art feel. |
| **Key Texture** | `bg-grain` (0.05 opacity) | Adds "analog" noise to the digital experience. |

---

## 2. 🏗️ Layout Patterns
We follow a **"Brutalism Evolution"** pattern. High-density information with clear, sharp borders.

- **Grid System**: Use `grid-urban` (CSS Grid) with `2rem` gaps.
- **Borders**: Always use `brutalist-border` (4px solid white/neon). Avoid rounded corners (`border-radius: 0`).
- **Shadows**: No soft blurs. Use "Hard Shadows" (e.g., `box-shadow: 6px 6px 0 var(--magenta)`).

---

## 3. 🎬 Interactions & Motion
Movement should feel either **Twitchy** (digital error) or **Smooth-Blur** (nightlife energy).

- **The "Twitch"**: Applied to major headlines (`animation: twitch 0.2s steps(2) infinite`).
- **The "Vibe"**: Subtle motion blur for background elements.
- **UI Hover**: Buttons should "shift" rather than just change color (translate -4px, -4px).

---

## 4. 🧩 Component Guidelines

### Buttons
- **Book Now**: Magenta background, white text, green hard shadow.
- **Void Buttons**: Transparent, heavy white border, fills white on hover.

### Sections (New Content)
- **Asymmetry**: Maintain the "Tilted Wrapper" concept for sub-headers.
- **Hero Preservation**: **CRITICAL.** The current Hero section (Video BG + Twitching Title + Tilted Subtitle) is the anchor point. Do not modify its CSS values or HTML structure without explicit approval.

---

## 5. 🛡️ Anti-Patterns (What to avoid)
- ❌ **Soft Gradients**: Avoid "Instagram-style" smooth transitions. Use hard color blocks.
- ❌ **Generic Icons**: Don't use standard thin-line icons. Use bold, heavy Lucide icons or custom SVGs.
- ❌ **Standard Spacing**: Don't use standard 16px/32px padding. Use extreme spacing (e.g., 10rem padding) to create "breathing room" between intense sections.

---

*Verified by Antigravity UX Engine.*
