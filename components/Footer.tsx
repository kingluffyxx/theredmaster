import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/theredmaster/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/s%C3%A9kou-bayogo-66676bbb/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/user/Bayogos/videos',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/TRMAkaRyu',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'Behance',
      url: 'https://www.behance.net/TheRedMaster',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM3.495 8.717h2.77c.718 0 1.31-.13 1.78-.388.46-.26.69-.73.69-1.42 0-.448-.09-.8-.258-1.05-.172-.26-.4-.45-.65-.56-.28-.11-.59-.188-.94-.23-.35-.04-.73-.06-1.14-.06h-2.25v3.71zm0 7.07h3.11c.38 0 .765-.04 1.14-.11.42-.07.8-.21 1.14-.42.33-.22.6-.54.805-.96.202-.43.31-.98.31-1.64 0-1.06-.35-1.82-1.05-2.28-.69-.45-1.58-.67-2.68-.67h-2.76v6.08zm17.98-3.46h-8.23c.078.92.426 1.615 1.047 2.086.622.47 1.36.7 2.218.7.65 0 1.217-.13 1.706-.39.488-.26.87-.65 1.147-1.18h2.935c-.495 1.47-1.264 2.54-2.31 3.2-1.043.66-2.31.99-3.8.99-1.025 0-1.95-.17-2.78-.51-.83-.34-1.53-.81-2.11-1.42-.58-.61-1.03-1.33-1.354-2.16-.32-.83-.487-1.73-.487-2.69 0-.96.157-1.86.475-2.69.317-.83.77-1.55 1.35-2.16.58-.61 1.28-1.09 2.1-1.43.82-.34 1.74-.51 2.76-.51.99 0 1.9.18 2.73.55.83.37 1.54.89 2.13 1.56.59.67 1.05 1.47 1.37 2.4.32.94.48 1.97.48 3.09l-.015.36zm-2.88-1.75c-.06-.86-.392-1.54-.997-2.04-.605-.5-1.346-.75-2.224-.75-.6 0-1.11.09-1.53.27-.43.18-.78.42-1.06.72-.28.3-.49.64-.63 1.02-.15.38-.24.77-.28 1.17h6.72v.61zM15.5 2.57h6.315v1.19H15.5V2.57z"/>
        </svg>
      )
    },
  ];

  const quickLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Services', href: '#services' },
    { name: 'Travaux', href: '#travaux' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold font-heading mb-4">
              <span className="text-gradient">The Red Master</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Design, Illustration et Motion design
            </p>
            <p className="text-gray-300 text-sm">
              Créateur passionné transformant vos idées en réalité visuelle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-light transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-moi</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-dark-lighter rounded-lg hover:bg-primary transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm text-center md:text-left">
              Copyright © {currentYear} The Red Master | Sékou Bayogo
            </p>
            <p className="text-gray-300 text-sm text-center md:text-right">
              Développé par{' '}
              <a
                href="https://xavieradda.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-light transition-colors font-semibold"
              >
                Xavier Adda
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
