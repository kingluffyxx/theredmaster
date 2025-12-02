# Alternative : Intégration EmailJS pour envoi automatique

Si vous souhaitez que les emails s'envoient automatiquement sans ouvrir le client email du visiteur, vous pouvez utiliser EmailJS (gratuit jusqu'à 200 emails/mois).

## 🚀 Configuration EmailJS

### Étape 1 : Créer un compte EmailJS

1. Aller sur https://www.emailjs.com/
2. Créer un compte gratuit
3. Vérifier votre email

### Étape 2 : Configurer le service email

1. Dans le dashboard EmailJS, aller dans **Email Services**
2. Cliquer sur **Add New Service**
3. Choisir votre fournisseur email (Gmail, Outlook, etc.)
4. Suivre les instructions pour connecter votre compte
5. Noter le **Service ID** (ex: `service_abc123`)

### Étape 3 : Créer un template d'email

1. Aller dans **Email Templates**
2. Cliquer sur **Create New Template**
3. Configurer le template :

```
To Email: contact@theredmaster.com
From Name: {{from_name}}
From Email: {{from_email}}
Subject: {{subject}}

Message:
Nom: {{from_name}}
Email: {{from_email}}

{{message}}
```

4. Noter le **Template ID** (ex: `template_xyz789`)

### Étape 4 : Obtenir la clé publique

1. Aller dans **Account** > **General**
2. Noter votre **Public Key** (ex: `user_abcdef123456`)

### Étape 5 : Installer EmailJS dans le projet

```bash
pnpm add @emailjs/browser
```

### Étape 6 : Modifier le composant Contact

Remplacer le contenu de `components/Contact.tsx` par :

```tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);

      const rect = currentRef.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInViewport) {
        setIsVisible(true);
      }
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Remplacer par vos IDs EmailJS
      const serviceId = 'YOUR_SERVICE_ID';
      const templateId = 'YOUR_TEMPLATE_ID';
      const publicKey = 'YOUR_PUBLIC_KEY';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section ref={sectionRef} id="contact" className="bg-gradient-to-br from-gray-50 to-gray-100 py-32">
      <div className="container-custom">
        <div className={\`text-center mb-16 transition-all duration-700 \${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }\`}>
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">
            Une idée de projet ? Discutons-en ensemble
          </p>
        </div>

        <div className="gap-12 grid grid-cols-1 lg:grid-cols-2 mx-auto max-w-6xl">
          {/* Contact Info */}
          <div className={\`space-y-8 transition-all duration-700 delay-200 \${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }\`}>
            <div>
              <h3 className="mb-6 font-heading font-bold text-gray-900 text-2xl">
                Restons en contact
              </h3>
              <p className="mb-8 text-gray-700 leading-relaxed">
                Je suis toujours ouvert aux nouvelles opportunités et collaborations.
                <br />
                N'hésitez pas à me contacter pour discuter de votre projet.
              </p>
            </div>

            <div className="gap-4 grid grid-cols-1 mt-8">
              <div className="bg-white shadow-lg p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="mb-1 font-semibold text-gray-900">Email</h5>
                    <p className="text-gray-700">contact@theredmaster.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-lg p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="mb-1 font-semibold text-gray-900">Localisation</h5>
                    <p className="text-gray-700">Paris, France</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={\`bg-white rounded-2xl shadow-xl p-8 transition-all duration-700 delay-300 \${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }\`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-semibold text-gray-900 text-sm">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-primary w-full transition-all disabled:opacity-50"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-semibold text-gray-900 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-primary w-full transition-all disabled:opacity-50"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 font-semibold text-gray-900 text-sm">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-primary w-full transition-all disabled:opacity-50"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-semibold text-gray-900 text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                  rows={6}
                  className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-primary w-full transition-all resize-none disabled:opacity-50"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

              {status === 'success' && (
                <div className="bg-green-50 p-4 border border-green-200 rounded-lg text-green-800 text-center">
                  ✅ Votre message a bien été envoyé !
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 p-4 border border-red-200 rounded-lg text-red-800 text-center">
                  ❌ Erreur lors de l'envoi. Veuillez réessayer.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Étape 7 : Configurer les variables

Dans le code ci-dessus, remplacer :
```javascript
const serviceId = 'YOUR_SERVICE_ID';      // Remplacer par votre Service ID
const templateId = 'YOUR_TEMPLATE_ID';    // Remplacer par votre Template ID
const publicKey = 'YOUR_PUBLIC_KEY';      // Remplacer par votre Public Key
```

### Étape 8 : Tester

1. Rebuild le projet : `pnpm run build`
2. Tester le formulaire
3. Vérifier que vous recevez l'email sur contact@theredmaster.com

## ✅ Avantages EmailJS

- ✅ Envoi automatique sans ouvrir le client email
- ✅ Meilleure expérience utilisateur
- ✅ Protection anti-spam
- ✅ Gratuit jusqu'à 200 emails/mois
- ✅ Historique des emails envoyés

## 📊 Comparaison

| Méthode | Avantage | Inconvénient |
|---------|----------|--------------|
| **Mailto (actuel)** | Simple, aucune config | Ouvre le client email |
| **EmailJS** | Envoi automatique | Configuration nécessaire |
| **Formspree** | Alternative similaire | 50 emails/mois gratuit |

Voulez-vous que j'intègre EmailJS ?
