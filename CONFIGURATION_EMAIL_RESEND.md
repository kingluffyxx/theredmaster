# Configuration Email avec Resend

Le formulaire de contact envoie maintenant les emails **directement depuis le serveur** vers `contact@theredmaster.com` en utilisant Resend.

## 📋 Prérequis

- Un compte Resend (gratuit jusqu'à 3000 emails/mois)
- Votre site déployé sur Vercel

---

## 🚀 Étape 1 : Créer un compte Resend

1. Aller sur https://resend.com/
2. Cliquer sur **"Get Started"** ou **"Sign Up"**
3. Créer un compte (avec GitHub ou email)
4. Vérifier votre email

---

## 🔑 Étape 2 : Obtenir votre clé API

### En local (développement)

1. Dans le dashboard Resend, aller dans **API Keys**
2. Cliquer sur **"Create API Key"**
3. Donner un nom (ex: "The Red Master Dev")
4. Cliquer sur **"Add"**
5. **Copier** la clé (elle commence par `re_...`)

6. Créer un fichier `.env.local` à la racine du projet :

```bash
# .env.local
RESEND_API_KEY=re_votre_cle_ici
```

⚠️ **IMPORTANT** : Ne jamais committer ce fichier ! Il est déjà dans `.gitignore`.

### Sur Vercel (production)

1. Aller sur **Vercel Dashboard**
2. Ouvrir votre projet
3. Aller dans **Settings > Environment Variables**
4. Ajouter une nouvelle variable :
   - **Name** : `RESEND_API_KEY`
   - **Value** : Votre clé API Resend
   - **Environment** : Cocher **Production**, **Preview**, et **Development**
5. Cliquer sur **"Save"**

---

## 📧 Étape 3 : Configurer votre domaine (optionnel mais recommandé)

Par défaut, Resend envoie les emails depuis `onboarding@resend.dev`. Pour utiliser votre propre domaine :

### 1. Ajouter votre domaine dans Resend

1. Dans Resend, aller dans **Domains**
2. Cliquer sur **"Add Domain"**
3. Entrer votre domaine : `theredmaster.com`

### 2. Configurer les enregistrements DNS dans Vercel

Resend vous donnera 3 enregistrements à ajouter :

#### Dans Vercel Dashboard > Domains > theredmaster.com > DNS Records :

```
Type: TXT
Name: @
Value: v=spf1 include:amazonses.com ~all

Type: MX
Name: @
Value: feedback-smtp.eu-west-1.amazonses.com
Priority: 10

Type: CNAME
Name: resend._domainkey
Value: resend._domainkey.amazonses.com
```

⚠️ **ATTENTION** : Cela va remplacer vos emails Ionos ! Lisez la section "Problème" ci-dessous.

### 3. Vérifier le domaine

1. Attendre 5-10 minutes
2. Dans Resend, cliquer sur **"Verify Domain"**
3. Une fois vérifié, modifier le code dans `app/api/contact/route.ts` :

```typescript
// Remplacer cette ligne :
from: 'Portfolio Contact <onboarding@resend.dev>',

// Par :
from: 'Portfolio Contact <noreply@theredmaster.com>',
```

---

## ⚠️ Problème : Conflit avec les emails Ionos

Si vous configurez votre domaine dans Resend, **vos emails Ionos cesseront de fonctionner** car les enregistrements MX seront remplacés.

### 💡 Solutions :

#### Option 1 : Ne pas configurer le domaine Resend (RECOMMANDÉ)
- Garder `from: 'Portfolio Contact <onboarding@resend.dev>'`
- Les emails arrivent quand même à `contact@theredmaster.com`
- Vos emails Ionos continuent de fonctionner
- ✅ Plus simple et sans risque

#### Option 2 : Utiliser un sous-domaine
1. Créer un sous-domaine dans Resend : `mail.theredmaster.com`
2. Ajouter les enregistrements DNS pour ce sous-domaine uniquement
3. Utiliser `from: 'Portfolio Contact <noreply@mail.theredmaster.com>'`
4. Vos emails principaux @theredmaster.com continuent via Ionos

#### Option 3 : Migrer tous vos emails vers Resend
- ❌ Plus complexe
- ❌ Resend ne fournit pas de boîte de réception
- ❌ Vous devrez gérer la réception des emails ailleurs

---

## ✅ Tester le formulaire

### En local :

1. Démarrer le serveur :
```bash
pnpm dev
```

2. Aller sur http://localhost:3000/#contact
3. Remplir le formulaire
4. Vérifier que l'email arrive sur contact@theredmaster.com

### En production :

1. Pusher le code sur GitHub
2. Vercel redéploie automatiquement
3. Aller sur https://theredmaster.com/#contact
4. Tester le formulaire

---

## 🐛 Troubleshooting

### Erreur "RESEND_API_KEY is not defined"

**Solution** : Vérifier que la variable d'environnement est bien configurée

En local :
```bash
# Vérifier que .env.local existe et contient :
RESEND_API_KEY=re_...
```

Sur Vercel :
- Vérifier dans Settings > Environment Variables
- Redéployer le projet après avoir ajouté la variable

### Les emails n'arrivent pas

1. **Vérifier les logs Vercel** :
   - Aller dans Vercel > Votre projet > Logs
   - Chercher les erreurs 500

2. **Vérifier le dashboard Resend** :
   - Aller sur https://resend.com/emails
   - Voir l'historique des emails envoyés
   - Vérifier le statut (delivered, bounced, etc.)

3. **Vérifier les spams** :
   - L'email peut être dans les spams
   - Marquer comme "Non spam" pour les prochains

### Erreur 429 "Too many requests"

**Cause** : Limite gratuite dépassée (100 emails/jour ou 3000/mois)

**Solutions** :
- Attendre 24h
- Passer au plan payant Resend
- Utiliser un autre service (EmailJS, Formspree)

---

## 📊 Limites du plan gratuit Resend

| Limite | Valeur |
|--------|--------|
| Emails/jour | 100 |
| Emails/mois | 3 000 |
| Domaines | 1 |
| API Keys | Illimité |

Pour un portfolio, c'est largement suffisant ! 🎉

---

## 🔄 Alternative : Ne pas configurer le domaine

**Recommandation** : Pour simplifier, **ne configurez PAS votre domaine dans Resend**.

L'email sera envoyé depuis `onboarding@resend.dev` mais arrivera bien à `contact@theredmaster.com`.

✅ **Avantages** :
- Configuration immédiate
- Pas de conflit avec Ionos
- Emails fonctionnent tout de suite
- Vous pouvez toujours répondre aux emails

❌ **Inconvénient** :
- L'expéditeur est `onboarding@resend.dev` au lieu de `noreply@theredmaster.com`
- Mais le champ "Reply-To" est l'email du visiteur, donc vous pouvez répondre directement

---

## ✅ Checklist de configuration

### Configuration minimale (5 minutes)

- [ ] Compte Resend créé
- [ ] Clé API obtenue
- [ ] Variable `RESEND_API_KEY` dans Vercel
- [ ] Site redéployé
- [ ] Formulaire testé
- [ ] Email reçu sur contact@theredmaster.com

### Configuration avancée (optionnel)

- [ ] Domaine ajouté dans Resend
- [ ] Enregistrements DNS configurés
- [ ] Domaine vérifié dans Resend
- [ ] Code modifié pour utiliser votre domaine
- [ ] Site redéployé

---

## 📞 Support

- Documentation Resend : https://resend.com/docs
- Support Resend : https://resend.com/support
- Status Resend : https://status.resend.com/

---

## 🎯 Récapitulatif

Le formulaire de contact fonctionne maintenant ainsi :

1. **Visiteur** remplit le formulaire sur votre site
2. **Next.js API** (`/api/contact`) reçoit les données
3. **Resend** envoie l'email à `contact@theredmaster.com`
4. **Vous** recevez l'email dans votre boîte Ionos
5. **Vous** pouvez répondre directement (Reply-To est l'email du visiteur)

✅ Pas besoin d'ouvrir le client email
✅ Meilleure expérience utilisateur
✅ Protection anti-spam
✅ Historique des messages dans Resend
