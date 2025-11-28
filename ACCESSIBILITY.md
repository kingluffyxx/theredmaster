# Accessibilité - The Red Master V2

## Améliorations du contraste

### Changements apportés pour respecter WCAG 2.1 AA

#### Couleurs principales
- **Primary color** : Changement de `#e63946` vers `#d62828` pour un meilleur contraste avec le blanc
- **Texte foncé** : Utilisation de `gray-900` (#111827) au lieu de `dark` personnalisé
- **Texte secondaire** : Utilisation de `gray-700` (#374151) au lieu de `gray-600`
- **Footer** : Texte passé de `gray-400` à `gray-300` pour meilleur contraste sur fond sombre

#### Ratios de contraste visés
- **Texte normal** : Minimum 4.5:1
- **Texte large (>18px)** : Minimum 3:1
- **Boutons et éléments interactifs** : Minimum 3:1

## Fonctionnalités d'accessibilité

### Navigation au clavier
- [x] Tous les éléments interactifs sont accessibles au clavier
- [x] Ordre de tabulation logique
- [x] Focus visible sur tous les éléments interactifs
- [x] Menu mobile fermable avec Échap (à implémenter)

### Attributs ARIA
- [x] `aria-label` sur les boutons sans texte (menu hamburger)
- [x] `aria-label` sur les liens sociaux
- [ ] `aria-current` pour la navigation active (à implémenter)
- [ ] `aria-expanded` pour les menus déroulants (à implémenter)
- [ ] `aria-live` pour les notifications (à implémenter)

### Structure sémantique
- [x] Utilisation correcte des balises HTML5 (`header`, `nav`, `main`, `section`, `footer`)
- [x] Hiérarchie des titres respectée (H1 > H2 > H3)
- [x] Liens descriptifs
- [x] Labels de formulaires associés

## Tests à effectuer

### Outils recommandés
1. **Lighthouse** (Chrome DevTools)
   - Score d'accessibilité visé : >90
   - Tester sur mobile et desktop

2. **WAVE** (Web Accessibility Evaluation Tool)
   - Vérifier les erreurs de contraste
   - Vérifier la structure des titres

3. **axe DevTools**
   - Scanner automatique des problèmes d'accessibilité
   - Tests de conformité WCAG

4. **Lecteurs d'écran**
   - NVDA (Windows)
   - JAWS (Windows)
   - VoiceOver (macOS)
   - TalkBack (Android)

### Checklist de tests manuels

#### Navigation au clavier
- [ ] Tab/Shift+Tab fonctionne correctement
- [ ] Entrée active les boutons et liens
- [ ] Échap ferme les modales et menus
- [ ] Flèches pour navigation dans les menus (optionnel)

#### Contraste visuel
- [x] Texte sur fond clair : ratio >4.5:1
- [x] Texte sur fond foncé : ratio >4.5:1
- [x] Boutons et éléments interactifs : ratio >3:1
- [ ] États de focus visibles avec ratio >3:1

#### Responsive et zoom
- [ ] Texte lisible à 200% de zoom
- [ ] Pas de défilement horizontal à 320px de largeur
- [ ] Tous les contenus accessibles sur mobile

#### Formulaires
- [x] Labels associés aux champs
- [ ] Messages d'erreur clairs et accessibles
- [ ] Validation accessible
- [ ] Indicateurs requis/optionnel

## Améliorations futures

### Court terme
1. Ajouter des états de focus plus visibles (outline personnalisé)
2. Implémenter `aria-current` pour la navigation active
3. Ajouter un bouton "Skip to main content"
4. Améliorer les messages d'erreur du formulaire

### Moyen terme
1. Ajouter un mode à contraste élevé
2. Support complet du clavier pour le carousel
3. Transcriptions pour les vidéos motion design
4. Textes alternatifs descriptifs pour toutes les images

### Long terme
1. Mode dyslexie (police OpenDyslexic)
2. Réduction des animations pour `prefers-reduced-motion`
3. Support RTL pour l'internationalisation
4. Tests automatisés d'accessibilité dans CI/CD

## Ressources

### Standards
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Outils
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

### Documentation
- [Next.js Accessibility](https://nextjs.org/docs/accessibility)
- [React Accessibility](https://react.dev/learn/accessibility)
- [Tailwind CSS Accessibility](https://tailwindcss.com/docs/screen-readers)
