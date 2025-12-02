# Configuration Email avec SMTP Ionos

Le formulaire de contact envoie maintenant les emails **directement depuis votre serveur SMTP Ionos** vers `contact@theredmaster.com`.

✅ **Avantages** :
- Pas besoin de service externe (Resend, EmailJS, etc.)
- Pas de limite d'emails (ou celle de votre forfait Ionos)
- Les emails viennent directement de votre domaine
- Gratuit, inclus dans votre hébergement
- Configuration simple

---

## 🔑 Étape 1 : Obtenir vos identifiants SMTP Ionos

### Méthode 1 : Depuis votre espace client Ionos

1. Connectez-vous à https://www.ionos.fr/
2. Allez dans **Email** > **Configuration**
3. Cliquez sur votre adresse email `contact@theredmaster.com`
4. Cliquez sur **Paramètres serveur** ou **Configuration SMTP**

Vous trouverez :
```
Serveur SMTP : smtp.ionos.fr (ou smtp.ionos.com)
Port : 587 (recommandé avec STARTTLS)
    ou 465 (avec SSL)
    ou 25 (non recommandé)
Authentification : Oui
Nom d'utilisateur : contact@theredmaster.com
Mot de passe : [Votre mot de passe email]
```

### Méthode 2 : Consulter la documentation Ionos

Les paramètres SMTP Ionos standard sont :
- **Serveur SMTP** : `smtp.ionos.fr` (France) ou `smtp.ionos.com` (international)
- **Port** :
  - `587` avec STARTTLS (recommandé)
  - `465` avec SSL
- **Authentification** : Obligatoire
- **Nom d'utilisateur** : Votre adresse email complète
- **Mot de passe** : Le mot de passe de votre email

---

## ⚙️ Étape 2 : Configuration

### En local (développement)

1. **Créer un fichier `.env.local`** à la racine du projet :

```bash
# .env.local
SMTP_HOST=smtp.ionos.fr
SMTP_PORT=587
SMTP_USER=contact@theredmaster.com
SMTP_PASSWORD=votre_mot_de_passe_email_ici
CONTACT_EMAIL=contact@theredmaster.com
```

⚠️ **IMPORTANT** :
- Remplacez `votre_mot_de_passe_email_ici` par votre vrai mot de passe
- Ne jamais committer ce fichier ! (Il est dans `.gitignore`)
- Utilisez le mot de passe de votre boîte email Ionos

2. **Redémarrer le serveur** :
```bash
pnpm dev
```

3. **Tester le formulaire** sur http://localhost:3000/#contact

### Sur Vercel (production)

1. **Aller dans Vercel Dashboard**
2. Ouvrir votre projet
3. Aller dans **Settings > Environment Variables**
4. Ajouter **5 variables** :

```
Name: SMTP_HOST
Value: smtp.ionos.fr
Environment: Production, Preview, Development

Name: SMTP_PORT
Value: 587
Environment: Production, Preview, Development

Name: SMTP_USER
Value: contact@theredmaster.com
Environment: Production, Preview, Development

Name: SMTP_PASSWORD
Value: [votre mot de passe email]
Environment: Production, Preview, Development

Name: CONTACT_EMAIL
Value: contact@theredmaster.com
Environment: Production, Preview, Development
```

5. **Sauvegarder** et **redéployer** le projet

⚠️ **Sécurité** : Les variables d'environnement dans Vercel sont chiffrées et sécurisées.

---

## 🧪 Tester le formulaire

### Test en local

1. Aller sur http://localhost:3000/#contact
2. Remplir le formulaire :
   - Nom : Test Local
   - Email : votre-email-perso@gmail.com
   - Sujet : Test formulaire local
   - Message : Ceci est un test
3. Cliquer sur "Envoyer le message"
4. Vérifier que l'email arrive sur `contact@theredmaster.com`

### Test en production

1. Pusher le code sur GitHub :
```bash
git add .
git commit -m "Configuration SMTP Ionos"
git push
```

2. Attendre que Vercel déploie (2-3 minutes)
3. Aller sur https://theredmaster.com/#contact
4. Remplir et envoyer le formulaire
5. Vérifier la réception

---

## 🔍 Trouver vos paramètres SMTP si vous les avez perdus

### Option 1 : Créer un nouveau mot de passe email

Si vous ne trouvez plus votre mot de passe :

1. Aller dans Ionos > Email
2. Sélectionner votre adresse `contact@theredmaster.com`
3. Cliquer sur **Réinitialiser le mot de passe**
4. Définir un nouveau mot de passe
5. Utiliser ce nouveau mot de passe dans les variables d'environnement

### Option 2 : Contacter le support Ionos

- Chat : Depuis votre espace client
- Téléphone : Disponible sur ionos.fr/aide
- Email : Via le formulaire de contact

---

## 🐛 Troubleshooting

### Erreur "Invalid login: 535 5.7.8 Authentication failed"

**Causes possibles** :
- Mauvais mot de passe
- Mauvaise adresse email (vérifier qu'elle est complète avec @theredmaster.com)
- Compte email désactivé

**Solutions** :
1. Vérifier que `SMTP_USER` est bien `contact@theredmaster.com` (complet)
2. Vérifier le mot de passe (pas d'espaces avant/après)
3. Tester de se connecter au webmail avec les mêmes identifiants
4. Réinitialiser le mot de passe si nécessaire

### Erreur "Connection timeout"

**Causes possibles** :
- Port bloqué par un firewall
- Mauvais serveur SMTP

**Solutions** :
1. Vérifier `SMTP_HOST` : `smtp.ionos.fr`
2. Essayer le port 465 au lieu de 587 :
```
SMTP_PORT=465
```
Et modifier le code dans `app/api/contact/route.ts` :
```typescript
secure: true, // au lieu de false
```

3. Vérifier que vous avez bien accès à Internet

### Erreur "Recipient address rejected"

**Cause** : L'adresse de destination n'existe pas ou est invalide

**Solution** :
- Vérifier que `CONTACT_EMAIL` est bien `contact@theredmaster.com`
- Vérifier que cette adresse existe dans votre compte Ionos

### Les emails n'arrivent pas

**Checklist** :
1. ✅ Vérifier les logs Vercel (Settings > Logs) pour voir les erreurs
2. ✅ Vérifier que toutes les variables d'environnement sont configurées
3. ✅ Vérifier les spams dans votre boîte email
4. ✅ Tester d'envoyer un email depuis votre client email avec les mêmes identifiants
5. ✅ Vérifier que l'adresse `contact@theredmaster.com` existe et est active

### Les emails partent en spam

**Solutions** :
1. Ajouter contact@theredmaster.com à vos contacts
2. Marquer l'email comme "Non spam"
3. Vérifier que vos enregistrements SPF/DKIM sont bien configurés dans les DNS (déjà fait normalement avec Ionos)

---

## 📧 Format de l'email reçu

Quand quelqu'un envoie un message via le formulaire, vous recevrez un email HTML stylisé avec :

```
📧 Nouveau message depuis le portfolio

👤 Nom : Jean Dupont
📧 Email : jean.dupont@example.com
📝 Sujet : Demande de collaboration
💬 Message : Bonjour, j'aimerais discuter d'un projet...
```

**Répondre** : Cliquez simplement sur "Répondre" et l'email sera envoyé directement à jean.dupont@example.com (grâce au champ Reply-To)

---

## 🔐 Sécurité

### Bonnes pratiques

✅ **À FAIRE** :
- Utiliser un mot de passe fort pour votre email
- Ne jamais committer les fichiers `.env.local` ou `.env`
- Utiliser des variables d'environnement dans Vercel
- Activer l'authentification à 2 facteurs sur Ionos

❌ **À NE PAS FAIRE** :
- Mettre les identifiants SMTP directement dans le code
- Partager votre mot de passe email
- Utiliser le même mot de passe partout
- Committer les fichiers contenant des secrets

### Si votre mot de passe a fuité

1. **Changer immédiatement** votre mot de passe email dans Ionos
2. **Mettre à jour** la variable `SMTP_PASSWORD` dans Vercel
3. **Redéployer** le projet
4. **Vérifier** qu'aucun email suspect n'a été envoyé

---

## 📊 Limites

### Limites Ionos (selon votre forfait)

La plupart des forfaits Ionos permettent d'envoyer plusieurs centaines d'emails par jour, largement suffisant pour un formulaire de contact.

Si vous dépassez les limites :
- Ionos peut bloquer temporairement l'envoi
- Vous recevrez un email de notification
- Contactez le support Ionos pour augmenter les limites

Pour un portfolio, vous recevrez probablement quelques emails par semaine maximum, donc pas de problème ! 😊

---

## ✅ Checklist finale

- [ ] Variables d'environnement configurées dans `.env.local`
- [ ] Serveur de développement redémarré
- [ ] Formulaire testé en local
- [ ] Email reçu avec succès
- [ ] Variables d'environnement ajoutées dans Vercel
- [ ] Code poussé sur GitHub
- [ ] Vercel a redéployé le projet
- [ ] Formulaire testé en production
- [ ] Email reçu en production

---

## 🎯 Récapitulatif

Le formulaire fonctionne maintenant ainsi :

1. **Visiteur** remplit le formulaire sur votre site
2. **Next.js API** (`/api/contact`) reçoit les données
3. **Nodemailer** se connecte au **serveur SMTP Ionos**
4. **Email envoyé** depuis `contact@theredmaster.com`
5. **Vous** recevez l'email dans votre boîte Ionos
6. **Vous** pouvez répondre directement (Reply-To = email du visiteur)

✅ Pas de service externe nécessaire
✅ Gratuit (inclus dans Ionos)
✅ Illimité (ou presque)
✅ 100% contrôlé par vous

---

## 📞 Support

- Support Ionos : https://www.ionos.fr/aide
- Documentation SMTP Ionos : Dans l'espace client > Aide
- Téléphone Ionos : Disponible sur leur site

---

## 🔄 Passer de Resend à SMTP Ionos

Si vous aviez commencé avec Resend, pas de problème !

1. Supprimer `resend` :
```bash
pnpm remove resend
```

2. Le code a déjà été modifié pour utiliser Nodemailer + SMTP Ionos

3. Configurer les variables d'environnement comme indiqué ci-dessus

4. Tester et redéployer

C'est tout ! 🎉
