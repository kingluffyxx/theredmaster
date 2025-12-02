# Guide de Déploiement sur Ionos

## 📋 Prérequis
- Accès à votre compte Ionos
- Accès FTP à votre serveur
- Node.js et pnpm installés localement

---

## 🚀 Méthode 1 : Vercel + Domaine Ionos (RECOMMANDÉ)

### Avantages
✅ Déploiement automatique à chaque commit
✅ SSL/HTTPS automatique
✅ Performance optimale (CDN global)
✅ Prévisualisation des branches
✅ Pas de configuration serveur

### Étapes

#### 1. Déployer sur Vercel
```bash
# 1. Créer un compte sur vercel.com
# 2. Installer Vercel CLI (optionnel)
npm i -g vercel

# 3. Se connecter
vercel login

# 4. Déployer
vercel
```

Ou simplement :
1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer sur "Import Project"
3. Connecter votre repository GitHub
4. Vercel détecte automatiquement Next.js et déploie

#### 2. Configurer le domaine dans Ionos

1. **Dans Vercel** :
   - Aller dans **Settings > Domains**
   - Ajouter votre domaine : `theredmaster.com`
   - Vercel vous donne les DNS à configurer

2. **Dans Ionos** :
   - Aller dans **Domaines & SSL**
   - Sélectionner votre domaine
   - Cliquer sur **Gérer les DNS**
   - Ajouter les enregistrements fournis par Vercel :
     ```
     Type: A
     Nom: @
     Valeur: 76.76.21.21 (IP Vercel)

     Type: CNAME
     Nom: www
     Valeur: cname.vercel-dns.com
     ```

3. Attendre la propagation DNS (15 min - 24h)

---

## 🔧 Méthode 2 : Export Statique sur Ionos

### Avantages
✅ Hébergement sur votre serveur Ionos
✅ Contrôle total
✅ Pas de coûts supplémentaires

### Configuration déjà appliquée
- ✅ `next.config.ts` configuré avec `output: 'export'`
- ✅ Images configurées avec `unoptimized: true`
- ✅ `.htaccess` créé pour Apache

### Étapes de déploiement

#### 1. Builder le projet
```bash
# Dans le dossier du projet
pnpm install
pnpm run build
```

Cette commande crée un dossier `out/` avec les fichiers statiques.

#### 2. Préparer les fichiers

Le dossier `out/` contient tout ce qu'il faut uploader :
```
out/
├── index.html
├── _next/
│   ├── static/
│   └── ...
├── images/
├── sites/
└── ...
```

#### 3. Upload via FTP

##### Option A : FileZilla (Interface graphique)
1. Télécharger [FileZilla](https://filezilla-project.org/)
2. Se connecter à votre serveur Ionos :
   - Hôte : `ftp.votredomaine.com` ou IP fournie par Ionos
   - Utilisateur : votre login FTP
   - Mot de passe : votre mot de passe FTP
   - Port : 21
3. Naviguer vers le dossier racine (généralement `/` ou `/html/`)
4. Uploader **tout le contenu** du dossier `out/` (pas le dossier lui-même)

##### Option B : Ligne de commande
```bash
# Depuis le dossier du projet
cd out

# Upload via SFTP
sftp votre-login@ftp.votredomaine.com
put -r *
```

#### 4. Vérifier le déploiement
1. Aller sur `https://votredomaine.com`
2. Vérifier que le site fonctionne
3. Tester la navigation entre les sections

### ⚠️ Important
- Le fichier `.htaccess` doit être à la racine
- Vérifier que les fichiers ont les bonnes permissions (644 pour les fichiers, 755 pour les dossiers)
- Si les images ne s'affichent pas, vérifier les chemins relatifs

---

## 🔄 Mise à jour du site

### Avec Vercel
Simplement pusher sur GitHub - le déploiement est automatique !
```bash
git add .
git commit -m "Mise à jour"
git push
```

### Avec FTP
1. Rebuild le projet : `pnpm run build`
2. Re-uploader le contenu du dossier `out/`

---

## 🐛 Troubleshooting

### Les images ne s'affichent pas
- Vérifier que le dossier `images/` a été uploadé
- Vérifier les permissions (755 pour dossiers, 644 pour fichiers)
- Vérifier la console navigateur pour les erreurs 404

### Les vidéos ne se chargent pas
- Les vidéos sont hébergées sur Vercel Blob Storage (URLs `https://xk3ldx3o22d35md8.public.blob.vercel-storage.com/`)
- Vérifier votre connexion internet
- Vérifier que les URLs sont accessibles

### Erreur 404 sur les routes
- Vérifier que le fichier `.htaccess` est présent à la racine
- Vérifier que le module `mod_rewrite` est activé sur le serveur

### Le site ne force pas HTTPS
- Vérifier le certificat SSL dans Ionos
- Activer "Let's Encrypt" dans les paramètres du domaine Ionos

---

## 📞 Support

### Ionos
- Support : [ionos.fr/aide](https://www.ionos.fr/aide)
- Documentation FTP : Dans votre espace client

### Vercel
- Documentation : [vercel.com/docs](https://vercel.com/docs)
- Support : [vercel.com/support](https://vercel.com/support)

---

## ✅ Checklist finale

- [ ] Le site est accessible via votre domaine
- [ ] HTTPS fonctionne
- [ ] Toutes les images s'affichent
- [ ] Les vidéos se chargent
- [ ] La navigation fonctionne
- [ ] Le formulaire de contact fonctionne
- [ ] Le site est responsive (mobile/desktop)
- [ ] Les animations fonctionnent
