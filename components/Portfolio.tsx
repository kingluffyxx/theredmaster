'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeRange,
  VideoPlayerTimeDisplay,
  VideoPlayerVolumeRange,
  VideoPlayerMuteButton
} from '@/components/kibo-ui/video-player';

type Category = 'Tous' | 'Entreprise' | 'Print' | 'Motion' | 'Web' | 'Divers';
type ProjectType = 'image' | 'video' | 'web';

interface Project {
  id: number;
  title: string;
  category: Category[];
  image: string;
  images?: string[];
  description?: string;
  type: ProjectType;
  videoUrl?: string;
  webUrl?: string;
  detailsUrl?: string;
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Category>('Tous');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Navigation entre les projets avec transition
  const navigateProject = (direction: 'prev' | 'next') => {
    if (!selectedProject || isTransitioning) return;

    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredProjects.length - 1 ? 0 : currentIndex + 1;
    }

    // Démarrer la transition
    setIsTransitioning(true);

    // Attendre la fin de l'animation de sortie avant de changer le projet
    setTimeout(() => {
      setSelectedProject(filteredProjects[newIndex]);
      setCurrentImageIndex(0);

      // Réinitialiser la transition
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Fonction pour convertir URL YouTube en URL embed
  const getYoutubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = regExp.exec(url);
    return match?.[2]?.length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  // Vérifier si c'est une URL YouTube
  const isYoutubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };


  const categories: Category[] = ['Tous', 'Entreprise', 'Print', 'Motion', 'Web', 'Divers'];

  const projects: Project[] = [
    // ENTREPRISE
    {
      id: 1,
      title: "Goumin",
      category: ['Entreprise'],
      image: "/images/entreprise/cadre_img_goumin.jpg",
      images: ["/images/entreprise/visuel_goumin.jpg"],
      description: "Projet de branding pour Goumin",
      type: "image"
    },
    {
      id: 2,
      title: "gooddyl'",
      category: ['Entreprise'],
      image: "/images/entreprise/cadre_gooddyl.jpg",
      images: ["/images/entreprise/visuel_gooddyl.jpg"],
      description: "Identité visuelle gooddyl'",
      type: "image"
    },
    {
      id: 3,
      title: "African leaders",
      category: ['Entreprise'],
      image: "/images/entreprise/cadre_african_leaders.jpg",
      images: ["/images/entreprise/visuel_african_leaders.jpg"],
      description: "Branding African leaders",
      type: "image"
    },
    {
      id: 4,
      title: "mendes bat et rénovation",
      category: ['Entreprise'],
      image: "/images/entreprise/cadre_carte_de_visite_mendes.jpg",
      images: ["/images/entreprise/visuel_carte_de_visite_mendes.jpg"],
      description: "Carte de visite pour Mendes",
      type: "image"
    },
    {
      id: 5,
      title: "la petite bouffe",
      category: ['Entreprise'],
      image: "/images/entreprise/cadre_la_petite_bouffe.jpg",
      images: ["/images/entreprise/visuel_la_petite_bouffe.jpg"],
      description: "Design pour restaurant",
      type: "image"
    },
    {
      id: 6,
      title: "zapatv",
      category: ['Entreprise'],
      image: "/images/entreprise/cadre_zapatv.jpg",
      images: ["/images/entreprise/visuel_zapatv.jpg"],
      description: "Identité visuelle zapatv",
      type: "image"
    },
    {
      id: 7,
      title: "Sand Consult",
      category: ['Entreprise'],
      image: "/images/entreprise/cadre_sandconsult.jpg",
      images: ["/images/entreprise/visuel_sandconsult.jpg"],
      description: "Branding complet Sand Consult",
      type: "image"
    },

    // PRINT
    {
      id: 8,
      title: "Couvertures de book papier",
      category: ['Print'],
      image: "/images/print/cadre_couverture_book.jpg",
      images: ["/images/print/visuel_couverture_portfolio_papier.jpg"],
      description: "Design de couvertures de portfolio",
      type: "image"
    },
    {
      id: 9,
      title: "t-shirt chechire",
      category: ['Print'],
      image: "/images/print/cadre_img_chechire.jpg",
      images: ["/images/print/visuel_img_chechire.jpg"],
      description: "Design t-shirt Cheshire",
      type: "image"
    },
    {
      id: 10,
      title: "coques de portable et carte dragon",
      category: ['Print'],
      image: "/images/print/cadre_carte_et_coque_de_portable_dragon.jpg",
      images: ["/images/print/visuel_carte_et_coque_de_portable_dragon.jpg"],
      description: "Design coques et cartes thème dragon",
      type: "image"
    },
    {
      id: 11,
      title: "Affiche Pan",
      category: ['Print'],
      image: "/images/print/cadre_img_affiche_pan.jpg",
      images: ["/images/print/visuel_affiche_pan.jpg"],
      description: "Affiche Pan",
      type: "image"
    },
    {
      id: 12,
      title: "coques de portable et carte moto",
      category: ['Print'],
      image: "/images/print/cadre_carte_et_coque_de_portable_moto.jpg",
      images: ["/images/print/visuel_carte_et_coque_de_portable_moto.jpg"],
      description: "Design coques et cartes thème moto",
      type: "image"
    },
    {
      id: 13,
      title: "Invitation: parcours de moto",
      category: ['Print'],
      image: "/images/print/cadre_img_invite_moto.jpg",
      images: [
        "/images/print/visuel_invite_moto.jpg"
      ],
      description: "Invitation événement moto",
      type: "image"
    },
    {
      id: 14,
      title: "faire-part de mariage A&J",
      category: ['Print'],
      image: "/images/print/cadre_fairpar_de_mariage.jpg",
      images: [
        "/images/print/visuel_fairpar_de mariage.jpg"
      ],
      description: "Faire-part de mariage personnalisé",
      type: "image"
    },
    {
      id: 15,
      title: "affiche batman",
      category: ['Print'],
      image: "/images/print/cadre_affiche_batman.jpg",
      images: ["/images/print/visuel_affiche_batman.jpg"],
      description: "Affiche Batman",
      type: "image"
    },
    {
      id: 16,
      title: "couverture Nightcrawler",
      category: ['Print'],
      image: "/images/print/cadre_img_affiche_nightcrawler.jpg",
      images: ["/images/print/visuel_affiche_nightcrawler.jpg"],
      description: "Affiche Nightcrawler",
      type: "image"
    },
    {
      id: 17,
      title: "Tote bag",
      category: ['Print'],
      image: "/images/print/cadre_deco_tot_bag.jpg",
      images: ["/images/print/visuel_deco_tote_bag.jpg"],
      description: "Design pour tote bag",
      type: "image"
    },

    // MOTION
    {
      id: 18,
      title: "Vidéo: présentation du projet Sovengaard",
      category: ['Motion'],
      image: "/images/motion/cadre_sovengaard.jpg",
      description: "Présentation animée du projet Sovengaard",
      type: "video",
      videoUrl: "https://www.youtube.com/watch?v=FVY4vBHFLQI"
    },
    {
      id: 19,
      title: "Vidéo: Animation logo The Red Master",
      category: ['Motion'],
      image: "/images/motion/cadre_annime_logo.jpg",
      description: "Animation du logo The Red Master",
      type: "video",
      videoUrl: "/videos/annimelogo.mp4"
    },
    {
      id: 20,
      title: "Vidéo: WWF",
      category: ['Motion'],
      image: "/images/motion/cadre_wwf.jpg",
      description: "Animation pour WWF",
      type: "video",
      videoUrl: "/videos/video_wwf.mp4",
      detailsUrl: "/pdf/dossier_de_conception_wwf.pdf"
    },
    {
      id: 21,
      title: "Vidéo: Spacy Piment",
      category: ['Motion'],
      image: "/images/motion/spacy.jpg",
      description: "Animation Spicy Piment",
      type: "video",
      videoUrl: "https://www.youtube.com/watch?v=gnq0jfN5ucQ",
      detailsUrl: "https://www.youtube.com/watch?v=gnq0jfN5ucQ"
    },
    {
      id: 22,
      title: "Vidéo: Bonne Année 2019",
      category: ['Motion'],
      image: "/images/motion/nouvelan2019.jpg",
      description: "Carte de voeux animée 2019",
      type: "video",
      videoUrl: "https://www.youtube.com/watch?v=o_63v7VPfVE",
      detailsUrl: "https://www.youtube.com/watch?v=o_63v7VPfVE"
    },
    {
      id: 23,
      title: "Vidéo: 50 ans SLB abbeville",
      category: ['Motion'],
      image: "/images/motion/cadre_50ans_abbeville.jpg",
      description: "Animation 50 ans SLB Abbeville",
      type: "video",
      videoUrl: "/videos/50_ans_abbeville.mp4"
    },
    {
      id: 24,
      title: "Vidéo: Space X",
      category: ['Motion'],
      image: "/images/motion/cadre_spacex.jpg",
      description: "Animation Space X",
      type: "video",
      videoUrl: "/videos/space_x.mp4",
      detailsUrl: "/pdf/dossier_de_conception_space.pdf"
    },
    {
      id: 25,
      title: "Vidéo: Tennis de table",
      category: ['Motion'],
      image: "/images/motion/tenisdetable.jpg",
      description: "Animation de logo",
      type: "video",
      videoUrl: "/videos/tenisdetable.mp4"
    },

    // WEB
    {
      id: 26,
      title: "Red Ship",
      category: ['Web'],
      image: "/images/web/cadre_site_red_ship.jpg",
      description: "Site web Red Ship",
      type: "web",
      webUrl: "/sites/redship/index.html"
    },
    {
      id: 27,
      title: "1domptable",
      category: ['Web'],
      image: "/images/web/cadre_site_1domptable.jpg",
      description: "Site web 1domptable",
      type: "web",
      webUrl: "/sites/1domptable/index.html"
    },
    {
      id: 28,
      title: "the fablab / Innovation corner",
      category: ['Web'],
      image: "/images/web/cadre_fablab.jpg",
      description: "Site web Innovation corner",
      type: "web",
      webUrl: "/sites/fablab/index.html"
    },

    // DIVERS
    {
      id: 29,
      title: "Amiibo Ryu",
      category: ['Divers'],
      image: "/images/divers/cadre_img_amiibo_ryu.jpg",
      images: ["/images/divers/visuel_amiibo_ryu.jpg"],
      description: "Illustration Amiibo Ryu",
      type: "image"
    },
    {
      id: 30,
      title: "Smoking Kills",
      category: ['Divers'],
      image: "/images/divers/cadre_img_smoking_kills.jpg",
      images: ["/images/divers/visuel_smoking_kills.jpg"],
      description: "Illustration Smoking Kills",
      type: "image"
    },
    {
      id: 31,
      title: "the Court of Owls",
      category: ['Divers'],
      image: "/images/divers/cadre_img_hiboux.jpg",
      images: ["/images/divers/visuel_hiboux.jpg"],
      description: "Illustration Court of Owls",
      type: "image"
    },
    {
      id: 32,
      title: "La petite souris",
      category: ['Divers'],
      image: "/images/divers/cadre_img_souris.jpg",
      images: ["/images/divers/visuel_souris.jpg"],
      description: "Illustration La petite souris",
      type: "image"
    },
    {
      id: 33,
      title: "Robot dog",
      category: ['Divers'],
      image: "/images/divers/cadre_3d_robot_dog.jpg",
      images: ["/images/divers/visuel_3d_robot_dog.jpg"],
      description: "Modélisation 3D Robot dog",
      type: "image"
    },
    {
      id: 34,
      title: "Banniere web",
      category: ['Divers'],
      image: "/images/divers/cadre_img_bacground.jpg",
      images: ["/images/divers/visuel_img_bacground.jpg"],
      description: "Design bannière web",
      type: "image"
    },
    {
      id: 35,
      title: "Superman",
      category: ['Divers'],
      image: "/images/divers/cadre_img_superman.jpg",
      images: ["/images/divers/visuel_superman.jpg"],
      description: "Illustration Superman",
      type: "image"
    },
    {
      id: 36,
      title: "jabbawockeez prism",
      category: ['Divers'],
      image: "/images/divers/cadre_jbkzprisme.jpg",
      images: ["/images/divers/visuel_jbkzprisme.jpg"],
      description: "Design Jabbawockeez prism",
      type: "image"
    },
    {
      id: 37,
      title: "oeuil de cyclope",
      category: ['Divers'],
      image: "/images/divers/cadre_img_cyclope.jpg",
      images: ["/images/divers/visuel_cyclope.jpg"],
      description: "Illustration oeil de Cyclope",
      type: "image"
    },
    {
      id: 38,
      title: "les masques",
      category: ['Divers'],
      image: "/images/divers/cadre_img_les_masques.jpg",
      images: ["/images/divers/visuel_les_masques.jpg"],
      description: "Illustration des masques",
      type: "image"
    },
    {
      id: 39,
      title: "Jordan 4",
      category: ['Divers'],
      image: "/images/divers/cadre_img_jordan_4.jpg",
      images: ["/images/divers/visuel_jordan_4.jpg"],
      description: "Design Jordan 4",
      type: "image"
    },
  ];

  // Fonction de mélange (Fisher-Yates shuffle)
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const filteredProjects = useMemo(() => {
    const filtered = activeFilter === 'Tous'
      ? projects
      : projects.filter(project => project.category.includes(activeFilter));
    // Ne mélanger que côté client pour éviter les erreurs d'hydratation
    return isClient ? shuffleArray(filtered) : filtered;
  }, [activeFilter, isClient]);

  return (
    <section ref={sectionRef} id="travaux" className="bg-white py-32">

      <div className="container-custom">
        <div className={`mb-16 text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h2 className="section-title">
            Mes Travaux
          </h2>
          <p className="section-subtitle">
            Découvrez une sélection de mes réalisations
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentImageIndex(0);
                }}
                className="group relative bg-gray-100 shadow-lg hover:shadow-2xl rounded-2xl aspect-square overflow-hidden transition-all duration-300 cursor-pointer"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${project.image})` }}
                />

                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                {/* Overlay on hover */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-6 w-full text-white transition-transform translate-y-4 group-hover:translate-y-0 duration-300 transform">
                    <h3 className="mb-2 font-bold text-2xl">{project.title}</h3>
                    <p className="mb-3 text-gray-200 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.category.map((cat) => (
                        <span
                          key={cat}
                          className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Lightbox Modal */}
        {selectedProject && (
          <div className="z-50 fixed inset-0 flex justify-center items-center p-4">
            {/* Backdrop clickable pour fermer la modale */}
            <button
              type="button"
              aria-label="Fermer la fenêtre modale"
              className="absolute inset-0 bg-black/90"
              onClick={() => setSelectedProject(null)}
            />

            {/* Navigation Buttons - Outside Modal */}
            {filteredProjects.length > 1 && (
              <>
                {/* Previous Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateProject('prev');
                  }}
                  className="top-1/2 left-4 md:left-8 z-[60] absolute bg-white/90 hover:bg-white shadow-lg p-3 rounded-full hover:scale-110 transition-all -translate-y-1/2 duration-200"
                  aria-label="Projet précédent"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Next Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateProject('next');
                  }}
                  className="top-1/2 right-4 md:right-8 z-[60] absolute bg-white/90 hover:bg-white shadow-lg p-3 rounded-full hover:scale-110 transition-all -translate-y-1/2 duration-200"
                  aria-label="Projet suivant"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <dialog
              open
              aria-modal="true"
              aria-label="Modal du projet"
              className={`relative flex flex-col bg-white rounded-2xl w-full max-w-[960px] max-h-[95vh] overflow-hidden transition-all duration-300 ${
                isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="top-4 right-4 z-10 absolute bg-white hover:bg-gray-100 shadow-lg p-2 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Project Content based on type */}
                {selectedProject.type === 'web' && selectedProject.webUrl && (
                  <div className="w-full" style={{ height: '60vh' }}>
                    <iframe
                      src={selectedProject.webUrl}
                      className="rounded-t-2xl w-full h-full"
                      title={selectedProject.title}
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
                  </div>
                )}

                {selectedProject.type === 'video' && selectedProject.videoUrl && (
                  <div className="w-full h-full">
                    {isYoutubeUrl(selectedProject.videoUrl) ? (
                      <div className="relative bg-black rounded-t-2xl overflow-hidden" style={{ height: '75vh' }}>
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={getYoutubeEmbedUrl(selectedProject.videoUrl) || selectedProject.videoUrl}
                          title={selectedProject.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="relative bg-black rounded-t-2xl overflow-hidden">
                        <VideoPlayer className="w-full h-full">
                          <VideoPlayerContent
                            src={selectedProject.videoUrl}
                            slot="media"
                            playsInline
                            autoPlay
                          />
                          <VideoPlayerControlBar>
                            <VideoPlayerPlayButton />
                            <VideoPlayerSeekBackwardButton />
                            <VideoPlayerSeekForwardButton />
                            <VideoPlayerTimeRange />
                            <VideoPlayerTimeDisplay showDuration />
                            <VideoPlayerMuteButton />
                            <VideoPlayerVolumeRange />
                          </VideoPlayerControlBar>
                        </VideoPlayer>
                      </div>
                    )}
                  </div>
                )}

                {selectedProject.type === 'image' && (
                  <div className="relative flex justify-center items-center bg-black rounded-t-2xl w-full overflow-hidden" style={{ height: '75vh' }}>
                    {selectedProject.images && selectedProject.images.length > 0 ? (
                      <>
                        {/* Image du carrousel */}
                        <Image
                          src={selectedProject.images[currentImageIndex]}
                          alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                          fill
                          className="object-contain"
                        />

                        {/* Contrôles du carrousel */}
                        {selectedProject.images.length > 1 && (
                          <>
                            {/* Bouton précédent */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex((prev) =>
                                  prev === 0 ? selectedProject.images!.length - 1 : prev - 1
                                );
                              }}
                              className="top-1/2 left-4 absolute bg-black/70 hover:bg-primary p-3 rounded-full text-white hover:scale-110 transition-all -translate-y-1/2 duration-200"
                            >
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>

                            {/* Bouton suivant */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex((prev) =>
                                  prev === selectedProject.images!.length - 1 ? 0 : prev + 1
                                );
                              }}
                              className="top-1/2 right-4 absolute bg-black/70 hover:bg-primary p-3 rounded-full text-white hover:scale-110 transition-all -translate-y-1/2 duration-200"
                            >
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>

                            {/* Indicateurs */}
                            <div className="bottom-4 left-1/2 absolute flex gap-2 -translate-x-1/2">
                              {selectedProject.images.map((image, idx) => (
                                <button
                                  key={`${selectedProject.id}-${image}-${idx}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImageIndex(idx);
                                  }}
                                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                    idx === currentImageIndex
                                      ? 'bg-primary w-6'
                                      : 'bg-white/50 hover:bg-white/80'
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="flex justify-center items-center bg-gradient-to-br from-primary/20 to-primary-dark/20 w-full h-full">
                        <span className="font-bold text-gray-900 text-4xl">{selectedProject.title}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Project Details */}
                <div className="p-8 overflow-y-auto">
                  <h3 className="mb-4 font-heading font-bold text-3xl">{selectedProject.title}</h3>
                  <p className="mb-6 text-gray-600">{selectedProject.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.category.map((cat) => (
                      <span
                        key={cat}
                        className="bg-primary/10 px-4 py-2 rounded-full font-semibold text-primary"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Details Button for video projects */}
                  {selectedProject.type === 'video' && selectedProject.detailsUrl && (
                    <a
                      href={selectedProject.detailsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 btn-primary"
                    >
                      Voir le projet en détail
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </dialog>
          </div>
        )}
      </div>
    </section>
  );
}
