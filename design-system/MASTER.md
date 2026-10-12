# Le Baromètre — Design System (MASTER)

Généré avec le skill **UI UX Pro Max** (données `products.csv`, `ui-reasoning.csv`, `colors.csv`,
`typography.csv`, `landing.csv`, `styles.csv`, `ux-guidelines.csv`), interrogées manuellement
(pas de Python sur la machine). Requête : `restaurant brewery bar craft` → profils #34 Restaurant/Food Service + #64 Brewery/Winery.

## Pattern
- **Landing** : Hero-Centric + Conversion (#34) avec une touche Storytelling (#64).
- **Ordre** : Hero (+ bloc « Aujourd'hui » : horaires/adresse) → Carte → Comptoir bières → Agenda → Infos/Accès → FAQ → Footer.
- **CTA** : « Appeler » dans le hero, la nav, et une barre d'actions fixe en bas sur mobile.
- **Must-have** : menu visible, horaires et accès bien en vue, photos de qualité (à fournir).
- **Anti-patterns** : horaires inventés/obsolètes, photos de mauvaise qualité, contenu qui défile sans pause.

## Identité (prioritaire sur les palettes du skill)
Reprise de l'identité existante du Baromètre : logo noir / blanc / rouge vif, rouge #C32B2B et polices
du site d'origine (Abril Fatface, Libre Baskerville, Josefin Sans). Les règles UX du skill restent appliquées.

## Style
Vibrant & Block-based (#6) en noir / blanc / rouge : grands blocs, typographie massive, ombres nettes,
transitions de 200 à 300 ms, aucune animation infinie.

## Couleurs
| Token | Clair | Sombre |
|---|---|---|
| --bg | #FFFFFF | #0E0E0E |
| --paper | #F4F2EF | #141414 |
| --fg | #111111 | #F5F5F5 |
| --muted | #555555 | #B3B3B3 |
| --primary (rouge du site) | #C32B2B | #FF5A5F |
| --secondary (noir du logo) | #1A1A1A | #F5F5F5 |
| --accent (rouge vif du logo) | #E00010 | #FF3B3F |
| --ink-accent (rouge sur noir) | #FF5A5F | #FF5A5F |

Texte ≥ 4.5:1 sur son fond (vérifié dans les deux thèmes).

## Typographie (polices du site d'origine)
- Abril Fatface : titres.
- Libre Baskerville : texte courant, 16px, interligne 1.75, lignes de 65 caractères maximum.
- Josefin Sans : libellés, navigation, boutons (majuscules espacées).

## UX (ux-guidelines.csv)
Défilement fluide et `scroll-padding-top` égal à la hauteur de la nav (#1, #2, #100) · lien d'évitement (#45) ·
navigation complète au clavier avec focus visible (#41) · `prefers-reduced-motion` (#9, #99) · espace réservé
pour la carte avec `aspect-ratio` (#19) · zones tactiles ≥ 44 px · pas de défilement horizontal.
