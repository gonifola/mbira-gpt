# Mbira GPT

> *The machine that learned the absolute.*

An interactive DJ station + AI music intelligence for Zimbabwean mbira. Six dials. Every tuning system. Every master's style. The full theory — encoded.

## What It Is

Mbira GPT is the first AI system that actually understands mbira theory — not vibes, not genre tags, but the actual logic: chord progressions, kushaura/kutsinhira structure, tuning systems, variation rules, and artist style profiles.

It lets you:
- **Mix** mbira patterns across tuning systems, songs, and artist styles
- **Explore** the theory interactively through 6 dials
- **Reverse-engineer** any mbira recording (upload audio → get: song, tuning, progression, style)
- **Generate** valid variations constrained by the tradition's own rules

## The Six Dials

| Dial | Range | What It Controls |
|------|-------|------------------|
| Tuning | Gandanga → Nyamaropa → Samaita | Modal identity + pitch register |
| Song / Progression | 60+ songs, Progressions 1–7 | Active chord sequence |
| Voice Balance | Kushaura → Both → Kutsinhira | Part emphasis |
| Variation Density | Sparse → Dense | Note substitution freedom |
| Artist Style | Musekiwa / Forward / Nyamasvisva / Garikayi / Chris Berry | Pattern vocabulary |
| Register Weight | Bass → Balanced → Treble | Spectral character |

## The Theory

Mbira uses a **7-note scale** mapped to **7 chords** grouped into **7 progressions**.

Every mbira song is an expression of one of these progressions. Same song in a different tuning = different progression number (not just transposition — a modal shift).

The mixing engine uses this theory as its constraint system — the same way an LLM uses context to constrain next-token probability. Valid note choices are determined by: active progression × tuning × voice × variation density.

## Corpus

Built from:
- mbira.online premium archive (100+ songs, top Zimbabwean masters)
- Andy Fowler / mbiramagic.com (248 videos, Forward Kwenda lessons)
- YouTube channels: Chris Berry (173 videos), Mbira DzeNharira, Garikayi Tirikoti, Mawungira eNharira, Musekiwa Chingodza
- First-person expert annotations by William Jackson (mbira player, teacher)

## Status

🔴 **Phase 0 — Corpus building** (active)

- [ ] Scrape + tag mbira.online premium pages
- [ ] Extract theory metadata (progression × tuning per song)
- [ ] Record expert annotations
- [ ] Build rule engine
- [ ] Build dial UI

## Tech Stack

- **Frontend:** React
- **Backend:** Firebase
- **AI:** RAG (Phase 1) → Fine-tune (Phase 2)
- **Audio:** Tone.js + sampled mbira audio

## The Deeper Play

This is cultural sovereignty infrastructure. African music knowledge encoded in machines, owned and built by Africans. Diaspora kids who never sat with a gogo can now have the tradition explained by a machine that was taught by the masters.

Skynet learning mbira before it decides anything about humanity is, objectively, a good sign.

---

Built by William Jackson. Taos, NM.
