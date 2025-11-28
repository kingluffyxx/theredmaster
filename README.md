# The Red Master V2

Portfolio professionnel de Sékou BAYOGO - Version 2 modernisée avec Next.js et Tailwind CSS

## À propos

Site portfolio présentant les travaux de Sékou BAYOGO dans les domaines du :
- Design graphique
- Illustration
- Motion design
- Design numérique et web

## Technologies utilisées

- **Next.js 16** - Framework React pour la production
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **pnpm** - Gestionnaire de paquets

## Installation

1. Cloner le repository
```bash
git clone <url-du-repo>
cd RedMasterV2
```

2. Installer les dépendances
```bash
pnpm install
```

3. Lancer le serveur de développement
```bash
pnpm dev
```

4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Scripts disponibles

- `pnpm dev` - Lance le serveur de développement
- `pnpm build` - Compile l'application pour la production
- `pnpm start` - Lance le serveur de production
- `pnpm lint` - Vérifie le code avec ESLint

## Structure du projet

```
RedMasterV2/
├── app/                    # App Router Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── components/            # Composants React
│   ├── Header.tsx        # En-tête avec navigation
│   ├── Hero.tsx          # Section hero avec carousel
│   ├── Services.tsx      # Section services
│   ├── Portfolio.tsx     # Galerie de projets
│   ├── Contact.tsx       # Formulaire de contact
│   └── Footer.tsx        # Pied de page
├── public/               # Fichiers statiques
│   └── images/          # Images du site
└── ...
```

## Fonctionnalités

### ✅ Implémenté

- [x] Design responsive (mobile, tablette, desktop)
- [x] Navigation fixe avec effet au scroll
- [x] Hero section avec carousel automatique
- [x] Section services avec 4 catégories
- [x] Portfolio filtrable par catégorie
- [x] Lightbox pour afficher les projets
- [x] Formulaire de contact fonctionnel
- [x] Animations et transitions fluides
- [x] SEO optimisé
- [x] Performance optimisée

### 🚀 À venir

- [ ] Intégration des vraies images des projets
- [ ] Backend pour le formulaire de contact
- [ ] Mode sombre/clair
- [ ] Blog intégré
- [ ] Système de CMS pour gérer les projets
- [ ] Animations avancées avec Framer Motion
- [ ] Internationalisation (FR/EN)

## Personnalisation

### Couleurs

Les couleurs principales sont définies dans `tailwind.config.ts` :
- Primary: #e63946 (rouge)
- Dark: #1a1a1a (noir)

### Contenu

Pour modifier le contenu :
- **Services** : `components/Services.tsx`
- **Projets** : `components/Portfolio.tsx`
- **Informations de contact** : `components/Contact.tsx`
- **Réseaux sociaux** : `components/Footer.tsx`

## Déploiement

Le site peut être déployé sur :
- [Vercel](https://vercel.com) (recommandé)
- [Netlify](https://netlify.com)
- Tout hébergeur supportant Next.js

```bash
pnpm build
```

## Support

Pour toute question ou suggestion, contactez Sékou BAYOGO.

## Licence

Copyright © 2025 The Red Master | Sékou Bayogo - Tous droits réservés
