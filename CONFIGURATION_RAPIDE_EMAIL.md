# Configuration Rapide - Email SMTP Ionos

## 📧 Paramètres Ionos (officiels)

```
Serveur SMTP : smtp.ionos.fr
Port : 465
Sécurité : SSL/TLS activé
Authentification : Oui
```

---

## ⚡ Configuration en 2 minutes

### 1️⃣ En local (développement)

Créer le fichier `.env.local` à la racine du projet :

```bash
SMTP_HOST=smtp.ionos.fr
SMTP_PORT=465
SMTP_USER=contact@theredmaster.com
SMTP_PASSWORD=VotreMotDePasseEmailIci
CONTACT_EMAIL=contact@theredmaster.com
```

⚠️ Remplacez `VotreMotDePasseEmailIci` par le mot de passe de votre boîte email `contact@theredmaster.com`

### 2️⃣ Redémarrer le serveur

```bash
pnpm dev
```

### 3️⃣ Tester

Aller sur http://localhost:3000/#contact et envoyer un message de test.

---

## 🚀 Sur Vercel (production)

### Ajouter les variables d'environnement :

1. Vercel Dashboard > Votre projet
2. **Settings** > **Environment Variables**
3. Ajouter ces 5 variables :

| Name | Value |
|------|-------|
| `SMTP_HOST` | `smtp.ionos.fr` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `contact@theredmaster.com` |
| `SMTP_PASSWORD` | [Votre mot de passe email] |
| `CONTACT_EMAIL` | `contact@theredmaster.com` |

4. **Save** et **Redeploy**

---

## 🔐 Où trouver votre mot de passe ?

### Si vous ne le connaissez pas :

1. Connectez-vous sur https://www.ionos.fr/
2. Allez dans **Email**
3. Sélectionnez `contact@theredmaster.com`
4. Cliquez sur **Réinitialiser le mot de passe**
5. Définissez un nouveau mot de passe
6. Utilisez-le dans les configurations ci-dessus

---

## ✅ Vérifier que ça marche

1. **En local** : Tester le formulaire, vérifier la console pour les erreurs
2. **En production** : Aller sur https://theredmaster.com/#contact et envoyer un test
3. **Vérifier** votre boîte email `contact@theredmaster.com`

---

## 🐛 Problèmes courants

### Erreur "Authentication failed"
- ✅ Vérifier que `SMTP_USER` est bien `contact@theredmaster.com` (complet)
- ✅ Vérifier le mot de passe (pas d'espace avant/après)
- ✅ Essayer de vous connecter au webmail avec les mêmes identifiants

### Rien ne se passe
- ✅ Vérifier les logs Vercel (Settings > Logs)
- ✅ Vérifier que toutes les variables sont configurées
- ✅ Redéployer après avoir ajouté les variables

### Les emails n'arrivent pas
- ✅ Vérifier les spams
- ✅ Vérifier que l'adresse `contact@theredmaster.com` existe bien dans Ionos
- ✅ Attendre 1-2 minutes (délai de livraison)

---

## 📝 Récapitulatif

Configuration = **3 étapes** :
1. ✅ Créer `.env.local` avec les 5 variables
2. ✅ Ajouter les mêmes variables dans Vercel
3. ✅ Tester le formulaire

C'est tout ! 🎉

Le formulaire envoie maintenant les emails directement depuis votre serveur SMTP Ionos vers `contact@theredmaster.com`.
