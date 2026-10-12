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

## Style
Vibrant & Block-based (#6) + Vintage/craft (#68) : grands blocs de couleur, typographie massive,
grain papier statique, transitions de 200 à 300 ms, aucune animation infinie.

## Couleurs (Brewery #64, adaptées au fond crème)
| Token | Clair | Sombre |
|---|---|---|
| --bg | #FBF3E6 | #170C08 |
| --surface | #FFFFFF | #22130D |
| --fg | #450A0A | #F6E9D7 |
| --muted | #6B4A3A | #C2AC98 |
| --primary | #7C2D12 | #E0643F |
| --secondary | #B91C1C | #F07A5A |
| --accent (or) | #A16207 | #E8A23B |
| --border | #E8D5BE | #3A2418 |

Texte ≥ 4.5:1 sur son fond. L'or est réservé aux grands textes et aux éléments décoratifs en mode clair.

## Typographie : « Retro Vintage » (#10)
- Abril Fatface : titres du hero et grands titres uniquement.
- Merriweather 300/400/700 : texte courant, 17px, interligne 1.7, lignes de 65 caractères maximum.

## UX (ux-guidelines.csv)
Défilement fluide et `scroll-padding-top` égal à la hauteur de la nav (#1, #2, #100) · lien d'évitement (#45) ·
navigation complète au clavier avec focus visible (#41) · `prefers-reduced-motion` (#9, #99) · espace réservé
pour la carte avec `aspect-ratio` (#19) · zones tactiles ≥ 44 px · pas de défilement horizontal.
