'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Détection de la section active
      const sections = ['accueil', 'services', 'travaux', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset pour déclencher plus tôt

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'ACCUEIL', href: '#accueil', id: 'accueil' },
    { name: 'SERVICES', href: '#services', id: 'services' },
    { name: 'TRAVAUX', href: '#travaux', id: 'travaux' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const getNavItemClasses = (itemId: string) => {
    if (activeSection === itemId) return 'text-primary';
    if (isScrolled) return 'text-gray-900 hover:text-primary';
    return 'text-white hover:text-primary-light';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <nav className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="#accueil" className="flex items-center space-x-3">
            <img
              src="/images/logo.jpg"
              alt="The Red Master Logo"
              className="rounded-full w-12 h-12 object-cover"
            />
            <div className="font-heading font-bold text-2xl">
              <span className={`${isScrolled ? 'text-primary' : 'text-white'} transition-colors`}>
                The Red Master
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-semibold transition-colors ${getNavItemClasses(item.id)}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-xl mt-4 py-4 rounded-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 font-semibold transition-colors ${
                  activeSection === item.id
                    ? 'bg-primary text-white'
                    : 'text-gray-900 hover:bg-primary hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
