'use client';

import { useState, useEffect, useRef } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string>('');
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

      // Vérifier si déjà visible au chargement
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

    // Vérifier que Turnstile a été validé (seulement si configuré)
    const isTurnstileEnabled = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (isTurnstileEnabled && !turnstileToken) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTurnstileToken('');

      // Réinitialiser le status après 5 secondes
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire de contact :', error);
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
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">
            Une idée de projet ? Discutons-en ensemble
          </p>
        </div>

        <div className="gap-12 grid grid-cols-1 lg:grid-cols-2 mx-auto max-w-6xl">
          {/* Contact Info */}
          <div className={`space-y-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}>
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

            {/* Info Cards */}
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
                    <p className="text-gray-700">Paris,France</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`bg-white rounded-2xl shadow-xl p-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}>
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
                  className="disabled:opacity-50 px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-primary w-full transition-all disabled:cursor-not-allowed"
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
                  className="disabled:opacity-50 px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-primary w-full transition-all disabled:cursor-not-allowed"
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
                  className="disabled:opacity-50 px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-primary w-full transition-all disabled:cursor-not-allowed"
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
                  className="disabled:opacity-50 px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-primary w-full transition-all resize-none disabled:cursor-not-allowed"
                  placeholder="Votre message..."
                />
              </div>

              {/* Cloudflare Turnstile - Optionnel */}
              {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                <div className="flex justify-center">
                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onError={() => setTurnstileToken('')}
                    onExpire={() => setTurnstileToken('')}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || (!!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken)}
                className="disabled:opacity-50 w-full disabled:cursor-not-allowed btn-primary"
              >
                {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="bg-green-50 p-4 border border-green-200 rounded-lg text-green-800 text-center">
                  ✅ Votre message a bien été envoyé ! Je vous répondrai dans les plus brefs délais.
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 p-4 border border-red-200 rounded-lg text-red-800 text-center">
                  ❌ Erreur lors de l'envoi. Veuillez réessayer ou m'écrire directement à contact@theredmaster.com
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
