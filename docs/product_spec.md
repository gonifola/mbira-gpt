# Mbira GPT — Product Spec v1
_Build target: Interactive DJ Station + AI Music Intelligence_

---

## What It Is

A web app that lets you mix, explore, and generate mbira music variations using a set of interactive dials — each dial encoding a dimension of mbira theory. Under the hood: an AI engine trained on the largest documented mbira corpus ever assembled.

**Tagline:** *The machine that learned the absolute.*

---

## The Six Dials

### Dial 1: Tuning System
`Gandanga ←————————→ Nyamaropa ←————→ Samaita`

Lowest register (Gandanga/Mavembe) → standard (Nyamaropa D) → brighter (Samaita). Nemakonde sits between Gandanga and Nyamaropa. **Orchestra Mode toggle**: stack multiple tunings simultaneously.

### Dial 2: Song / Progression
Select by song name or progression number (1–7). Shows active chord sequence.

### Dial 3: Voice Balance
`Kushaura only ←————→ Both ←————→ Kutsinhira only`

### Dial 4: Variation Density
`Sparse/Traditional ←————→ Dense/Improvisational`

### Dial 5: Artist Style
`Musekiwa | Forward Kwenda | Nyamasvisva | Garikayi | Chris Berry`

### Dial 6: Register Weight
`Bass heavy ←————→ Balanced ←————→ Treble bright`

---

## Build Sequence

### Phase 0 — Corpus
- Scrape mbira.online premium pages
- Tag all content with corpus schema
- Record William’s expert annotations

### Phase 1 — MVP (RAG + Dial UI)
- Build dial interface
- Build progression rule engine
- Basic audio playback

### Phase 2 — Intelligence
- Audio upload → reverse engineer
- Fine-tune model
- Artist style generation

### Phase 3 — Platform
- Voice STT interface
- Mobile app
- API for institutions
- Mandingue GPT (second vertical)

---

## Monetization

| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | 3 songs, 2 tunings |
| Student | $9/mo | All songs, all tunings, audio upload |
| Pro | $29/mo | API, style generation |
| Institutional | $199/mo | Full API, corpus licensing |
