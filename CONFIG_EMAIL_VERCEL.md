# Configuration des Emails dans Vercel

## 📧 Enregistrements DNS à ajouter dans Vercel

Allez dans : **Vercel Dashboard > Votre Projet > Settings > Domains > [Votre domaine] > DNS Records**

### 1. Enregistrements MX (Email Reception)

Cliquez sur **"Add Record"** et ajoutez :

```
Type: MX
Name: @ (ou laisser vide)
Value: mx00.ionos.fr
Priority: 10
```

Ajoutez un deuxième enregistrement MX :

```
Type: MX
Name: @ (ou laisser vide)
Value: mx01.ionos.fr
Priority: 10
```

### 2. Enregistrement SPF (Anti-spam)

```
Type: TXT
Name: @ (ou laisser vide)
Value: v=spf1 include:_spf-eu.ionos.com ~all
```

### 3. Enregistrements DKIM (Signature emails)

```
Type: CNAME
Name: s1-ionos._domainkey
Value: s1.dkim.ionos.com
```

```
Type: CNAME
Name: s2-ionos._domainkey
Value: s2.dkim.ionos.com
```

```
Type: CNAME
Name: s42582890._domainkey
Value: s42582890.dkim.ionos.com
```

### 4. Autodiscover (Configuration email automatique)

```
Type: CNAME
Name: autodiscover
Value: adsredir.ionos.info
```

---

## ✅ Configuration complète finale

Après ajout de tous les enregistrements, vous devriez avoir dans Vercel DNS :

| Type | Name | Value | Priority/TTL |
|------|------|-------|--------------|
| A | @ | 76.76.21.21 | Auto |
| CNAME | www | cname.vercel-dns.com | Auto |
| MX | @ | mx00.ionos.fr | 10 |
| MX | @ | mx01.ionos.fr | 10 |
| TXT | @ | v=spf1 include:_spf-eu.ionos.com ~all | Auto |
| CNAME | s1-ionos._domainkey | s1.dkim.ionos.com | Auto |
| CNAME | s2-ionos._domainkey | s2.dkim.ionos.com | Auto |
| CNAME | s42582890._domainkey | s42582890.dkim.ionos.com | Auto |
| CNAME | autodiscover | adsredir.ionos.info | Auto |

---

## 🧪 Tester les emails

### Test en ligne (MX Lookup)
1. Aller sur https://mxtoolbox.com/SuperTool.aspx
2. Choisir "MX Lookup"
3. Entrer votre domaine
4. Vérifier que mx00.ionos.fr et mx01.ionos.fr apparaissent

### Test réel
1. Envoyer un email de test à votre adresse @theredmaster.com
2. Vérifier la réception dans votre boîte Ionos
3. Répondre à cet email
4. Vérifier que la réponse arrive bien

---

## ⚠️ Troubleshooting

### Les emails n'arrivent plus
- Attendre 1-2 heures (propagation DNS)
- Vérifier que TOUS les enregistrements MX sont dans Vercel
- Vérifier avec MXToolbox que les MX sont actifs

### Les emails partent en spam
- Vérifier que l'enregistrement SPF (TXT) est présent
- Vérifier que les DKIM (CNAME) sont configurés

### Impossible d'envoyer des emails
- Vérifier les paramètres SMTP dans votre client email
- Les paramètres SMTP Ionos n'ont pas changé :
  - Serveur SMTP : smtp.ionos.fr
  - Port : 587 (TLS) ou 465 (SSL)
  - Authentification : Oui

---

## 📞 Support

Si les emails ne fonctionnent toujours pas après 24h :
- Support Ionos : https://www.ionos.fr/aide
- Vérifier l'état des services : https://status.ionos.fr/
