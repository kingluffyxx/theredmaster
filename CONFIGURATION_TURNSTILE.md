# Configuration Cloudflare Turnstile (OPTIONNEL)

Cloudflare Turnstile est une alternative moderne et gratuite à reCAPTCHA qui protège votre formulaire de contact contre le spam et les bots.

⚠️ **Note importante** : Turnstile est **totalement optionnel**. Le formulaire fonctionne sans configuration Turnstile. Si vous ne configurez pas les clés, le formulaire enverra les emails normalement, sans protection anti-spam.

## 🎯 Avantages de Turnstile

- ✅ **Gratuit** et illimité
- ✅ **Plus rapide** que reCAPTCHA
- ✅ **Respectueux de la vie privée** (pas de tracking Google)
- ✅ **Expérience utilisateur améliorée** (souvent invisible)
- ✅ **Facile à intégrer**

---

## 🚀 Étape 1 : Créer un compte Cloudflare

1. Aller sur https://dash.cloudflare.com/sign-up
2. Créer un compte (gratuit)
3. Vérifier votre email

---

## 🔑 Étape 2 : Créer un site Turnstile

1. Une fois connecté, aller sur **Turnstile** dans le menu de gauche
   - Ou directement : https://dash.cloudflare.com/?to=/:account/turnstile

2. Cliquer sur **"Add site"** (Ajouter un site)

3. Remplir le formulaire :
   - **Site name** : The Red Master Portfolio
   - **Domain** : theredmaster.com
   - **Widget Mode** : **Managed** (recommandé)
   - **Description** (optionnel) : Formulaire de contact portfolio

4. Cliquer sur **"Create"**

---

## 📋 Étape 3 : Récupérer les clés

Après la création, vous verrez deux clés :

### Site Key (Publique)
```
1x00000000000000000000AA
```
Cette clé est visible côté client (pas de problème de sécurité).

### Secret Key (Privée)
```
0x0000000000000000000000000000000AA
```
⚠️ **IMPORTANT** : Ne JAMAIS exposer cette clé ! Elle doit rester côté serveur uniquement.

---

## ⚙️ Étape 4 : Configuration

### En local (développement)

Créer ou modifier le fichier `.env.local` :

```bash
# .env.local

# ... vos autres variables SMTP ...

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=votre_site_key_ici
TURNSTILE_SECRET_KEY=votre_secret_key_ici
```

⚠️ **Note** : Les variables préfixées par `NEXT_PUBLIC_` sont exposées côté client (c'est normal pour la site key).

### Sur Vercel (production)

1. Aller dans **Vercel Dashboard** > Votre projet
2. **Settings** > **Environment Variables**
3. Ajouter **2 variables** :

```
Name: NEXT_PUBLIC_TURNSTILE_SITE_KEY
Value: [Votre Site Key]
Environment: Production, Preview, Development

Name: TURNSTILE_SECRET_KEY
Value: [Votre Secret Key]
Environment: Production, Preview, Development
```

4. **Save** et **Redeploy**

---

## 🧪 Étape 5 : Tester

### Test en développement

1. Démarrer le serveur :
```bash
pnpm dev
```

2. Aller sur http://localhost:3000/#contact

3. Vous devriez voir le widget Turnstile apparaître :
   - Une petite checkbox qui se coche automatiquement
   - Ou un challenge interactif (selon votre comportement)

4. Remplir le formulaire et envoyer
   - Le bouton reste désactivé tant que Turnstile n'est pas validé
   - Si tout est ok, l'email est envoyé

### Test en production

1. Aller sur https://theredmaster.com/#contact
2. Tester le formulaire
3. Vérifier que l'email arrive bien

---

## 🎨 Personnalisation du widget

Dans `components/Contact.tsx`, vous pouvez changer :

### Thème
```tsx
theme="light"  // ou "dark" ou "auto"
```

### Taille
```tsx
size="normal"  // ou "compact"
```

### Exemple complet :
```tsx
<Turnstile
  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
  onSuccess={(token) => setTurnstileToken(token)}
  onError={() => setTurnstileToken('')}
  onExpire={() => setTurnstileToken('')}
  theme="auto"      // S'adapte au mode clair/sombre
  size="compact"    // Plus petit
/>
```

---

## 📊 Widget Modes expliqués

### Managed (Recommandé) ✅
- Cloudflare décide automatiquement du niveau de challenge
- Souvent invisible pour les utilisateurs normaux
- Challenge uniquement pour les comportements suspects
- **Meilleure expérience utilisateur**

### Non-Interactive
- Toujours invisible
- Pas de challenge visuel
- Analyse en arrière-plan
- Peut bloquer plus de faux positifs

### Invisible
- Pas de widget visible
- Challenge modal si nécessaire
- Bon compromis

---

## 🔍 Monitoring

### Dashboard Cloudflare

1. Aller dans **Turnstile** > Votre site
2. Voir les statistiques :
   - Nombre de vérifications
   - Taux de blocage
   - Graphiques en temps réel

### Analytics détaillées

- Nombre de challenges réussis/échoués
- Pays d'origine
- Type de challenge présenté

---

## 🐛 Troubleshooting

### Erreur "Invalid site key"

**Cause** : La site key est incorrecte ou n'est pas définie

**Solutions** :
1. Vérifier que `NEXT_PUBLIC_TURNSTILE_SITE_KEY` est bien définie
2. Vérifier qu'il n'y a pas d'espace avant/après la clé
3. Redémarrer le serveur après avoir modifié `.env.local`

### Erreur "Verification failed"

**Cause** : La secret key est incorrecte ou la vérification côté serveur échoue

**Solutions** :
1. Vérifier que `TURNSTILE_SECRET_KEY` est correcte dans Vercel
2. Vérifier les logs Vercel pour voir l'erreur exacte
3. Tester avec les clés de test de Cloudflare :
   - Site Key : `1x00000000000000000000AA` (toujours réussit)
   - Secret Key : `1x0000000000000000000000000000000AA`

### Le widget ne s'affiche pas

**Causes possibles** :
1. Bloqueur de publicités actif
2. JavaScript désactivé
3. Problème de réseau

**Solution** :
- Désactiver temporairement les bloqueurs de pub pour tester
- Vérifier la console navigateur pour les erreurs

### Le bouton reste désactivé

**Cause** : Turnstile n'a pas encore validé

**Solution** :
- Attendre quelques secondes (le widget se charge)
- Rafraîchir la page
- Vérifier que les clés sont correctes

---

## 🔒 Sécurité

### Bonnes pratiques

✅ **À FAIRE** :
- Toujours vérifier le token côté serveur (déjà implémenté)
- Ne jamais faire confiance au client uniquement
- Utiliser HTTPS en production (Vercel le fait automatiquement)
- Renouveler les clés si elles sont compromises

❌ **À NE PAS FAIRE** :
- Exposer la Secret Key dans le code ou sur GitHub
- Désactiver la vérification côté serveur
- Utiliser les clés de test en production

### Si vos clés sont exposées

1. Aller dans Cloudflare Turnstile
2. Régénérer les clés (bouton **"Rotate keys"**)
3. Mettre à jour les variables d'environnement
4. Redéployer

---

## 💡 Mode test (développement)

Pour tester sans créer de compte Cloudflare, utilisez les clés de test :

```bash
# .env.local (TEST UNIQUEMENT)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

Ces clés :
- ✅ Valident toujours le captcha
- ✅ Permettent de tester l'interface
- ❌ Ne bloquent aucun bot
- ❌ Ne doivent JAMAIS être utilisées en production

---

## 📈 Limites du plan gratuit

Cloudflare Turnstile est **totalement gratuit** avec :
- ✅ Vérifications illimitées
- ✅ Tous les modes de widget
- ✅ Analytics complet
- ✅ Support communautaire

**Aucune limite !** Parfait pour un portfolio. 🎉

---

## ✅ Checklist de configuration

- [ ] Compte Cloudflare créé
- [ ] Site Turnstile créé
- [ ] Site Key et Secret Key récupérées
- [ ] Variables ajoutées dans `.env.local`
- [ ] Variables ajoutées dans Vercel
- [ ] Serveur redémarré (local)
- [ ] Vercel redéployé (production)
- [ ] Widget visible sur le formulaire
- [ ] Test d'envoi réussi en local
- [ ] Test d'envoi réussi en production

---

## 🎯 Résultat

Après configuration, votre formulaire de contact est protégé contre :
- 🛡️ Les bots spammeurs
- 🛡️ Les attaques automatisées
- 🛡️ Les soumissions massives
- 🛡️ Les scripts malveillants

Tout en gardant une expérience utilisateur fluide ! ✨

---

## 📞 Support

- Documentation Turnstile : https://developers.cloudflare.com/turnstile/
- Dashboard : https://dash.cloudflare.com/
- Communauté : https://community.cloudflare.com/
