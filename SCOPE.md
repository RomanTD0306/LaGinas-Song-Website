# LaGina Sharp Davis — Songwriter Website
## Project Scope Document

---

## Overview

A professional songwriter showcase website for **LaGina Sharp Davis**, a country-Christian songwriter. The primary goals are:

- Give publishers and music industry professionals a clean, credible place to discover her work
- Provide a shareable link she can post on Instagram and Facebook
- Display all 35+ song lyrics alongside AI-generated audio demos (Suno)
- Be easy to maintain and grow over time as she writes more songs

---

## Target Audience

1. **Music publishers and A&R representatives** — need to quickly assess quality, style, and depth of catalog
2. **General public / social media followers** — fans who find the link through Instagram/Facebook
3. **Artists looking for songs to record** — should feel the vibe (think: Eric Church, deep country with Christian undertones)

---

## Design Direction

### Aesthetic
- **Vibe:** Deep, soulful country-Christian — the emotional weight of Eric Church's catalog with a faith-rooted foundation
- **Feel:** Professional, warm, and uncluttered. Not flashy. Not overwhelming.
- **Color palette:** Greens as the primary color (earthy, natural tones — forest green, sage), paired with warm neutrals (cream, warm white, dark charcoal/near-black for text)
- **Typography:** A mix of a clean serif for song titles/headings (timeless, classic) and a readable sans-serif for body/lyrics

### Logo / Branding
- Monogram **"LD"** (LaGina Davis) combined with a musical note
- No existing photos yet — site will be designed to look complete without them, with a placeholder spot for a photo when one becomes available

---

## Site Structure

### Pages

#### 1. Home (`/`)
- Hero section with logo, her name, and a short tagline (e.g., *"Country-Christian Songwriting"* or similar)
- Brief introduction / hook — who she is, what her music is about
- Featured song or two with audio player
- Call-to-action: "Browse the Catalog" and "Get in Touch"

#### 2. Song Catalog (`/songs`)
- Grid or list of all 35+ songs
- Each song card shows: title, a short excerpt of the first line, and a play button if audio is available
- Filterable or sortable (optional for v1, useful as catalog grows)

#### 3. Individual Song Page (`/songs/song-title`)
- Full lyrics displayed cleanly
- Embedded audio player for Suno demo (if available)
- Copyright notice: *© LaGina Sharp Davis. All rights reserved.*
- "Back to Catalog" navigation

#### 4. About (`/about`)
- LaGina's bio and story as a songwriter
- Her influences and vision
- Placeholder section for a photo

#### 5. Contact (`/contact`)
- Simple contact form that sends to **LaGina@charter.net**
- Brief note inviting publishers and artists to reach out
- Copyright/licensing statement

---

## Features & Functionality

### Must Have (v1)
- [ ] Fully responsive design (looks great on mobile, tablet, desktop)
- [ ] All 35 song lyrics displayed with clean formatting
- [ ] Embedded audio players for Suno demo tracks (~10 to start)
- [ ] Contact form tied to LaGina@charter.net
- [ ] Copyright notice on every song page
- [ ] Custom domain (recommended: `laginadavis.com`)
- [ ] Fast-loading, professional appearance

### Easy Maintenance (critical)
The site must be structured so that adding a new song is simple:
- Each song stored as its own file (Markdown or similar)
- Adding a song = creating one file with: title, lyrics, audio file path (optional), date
- No need to edit multiple files or touch layout code

### Future / Phase 2
- [ ] Links to real artist recordings on Spotify/Apple Music when available
- [ ] Photo of LaGina added to About page
- [ ] Song filtering by theme or mood
- [ ] Possible admin interface if manual file editing becomes a burden

---

## Content Inventory

| Type | Status | Notes |
|---|---|---|
| Song lyrics | 35 songs ready | To be provided via email/text |
| Suno audio demos | ~10 ready | To be imported; more added over time |
| Bio / About text | To be written | LaGina to provide, can be drafted together |
| Logo / Monogram | To be designed | LD + musical note concept |
| Photo | Not yet available | Site will work without it |
| Contact email | Ready | LaGina@charter.net |

---

## Copyright & IP Protection

- All lyrics display: *© LaGina Sharp Davis. All rights reserved.*
- Site footer includes a global copyright notice
- Songs are documented on **Songbay** (timestamp/proof of authorship)
- **Recommended next step:** Register with the [U.S. Copyright Office](https://www.copyright.gov) — group registration of unpublished works is ~$85 for up to 10 songs and provides the strongest legal protection, including the right to sue for statutory damages

---

## Hosting & Domain

| Item | Recommendation | Cost |
|---|---|---|
| Domain | `laginadavis.com` (or `laginasharpdavis.com`) via Namecheap or GoDaddy | ~$10–15/year |
| Hosting | GitHub Pages (free, tied to your existing GitHub account) | Free |
| Deployment | Push updates to GitHub → site updates automatically | — |

**Why this setup:** Free hosting, version-controlled (can undo mistakes), and a professional custom domain that will show up in Google searches for "LaGina Davis songwriter."

---

## Tech Approach

- **Static site** — HTML, CSS, JavaScript (no database needed, fast, secure)
- Songs stored as individual Markdown files for easy editing
- A simple static site generator (like **Eleventy/11ty**) to compile everything into the final site
- Audio files hosted directly in the project (or via a free CDN if file sizes grow)

---

## Out of Scope (for now)

- Streaming service integrations (Spotify, Apple Music)
- User accounts or login
- E-commerce / song licensing transactions
- Blog or news section
- Video content

---

## Open Questions / Next Steps

1. **Domain purchase** — Do you want to buy `laginadavis.com`? I can walk you through it step by step.
2. **Bio text** — Can LaGina write a short paragraph (3–5 sentences) about herself and her songwriting journey?
3. **Song titles** — When you're ready, share the song titles and lyrics (email/text from your mom is fine) and we'll start building the catalog.
4. **Audio files** — What format are the Suno exports? (MP3 is ideal)
5. **Tagline** — Does LaGina have a phrase she'd want under her name, or should we brainstorm one together?

---

*Document version: 1.0 — March 2026*
