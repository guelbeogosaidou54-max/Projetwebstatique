/* =======================================================
   MAIN.JS — Scripts pour la page d'accueil
   ======================================================= */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== MENU MOBILE (HAMBURGER) =====
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // Fermer le menu quand on clique sur un lien
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
  
  // ===== SMOOTH SCROLL VERS LES ANCRES =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // ===== SCROLL REVEAL POUR LES CARTES RÉGIONS =====
  const cards = document.querySelectorAll('.region-card');
  
  if (cards.length > 0) {
    // Initialiser styles pour l'animation
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px 50px 0px' });
    
    cards.forEach(card => {
      observer.observe(card);
    });
  }
  
  // ===== NAVBAR : CHANGEMENT DE STYLE AU SCROLL =====
  const nav = document.querySelector('nav');
  
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 80) {
        nav.style.borderBottom = '1px solid rgba(193, 39, 45, 0.3)';
        nav.style.background = 'rgba(18, 16, 10, 0.98)';
      } else {
        nav.style.borderBottom = '1px solid rgba(247, 183, 49, 0.15)';
        nav.style.background = 'rgba(18, 16, 10, 0.96)';
      }
    });
  }
  
  // ===== BOUTON RETOUR HAUT DE PAGE =====
  // Créer le bouton s'il n'existe pas
  let backToTop = document.getElementById('back-to-top');
  
  if (!backToTop) {
    backToTop = document.createElement('button');
    backToTop.id = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Retour en haut');
    document.body.appendChild(backToTop);
  }
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // ===== ANIMATION DES STATISTIQUES (optionnel) =====
  const statValues = document.querySelectorAll('.stat-val');
  
  if (statValues.length > 0 && !window.hasRunStatAnimation) {
    window.hasRunStatAnimation = true;
    
    const animateNumber = (element, target, suffix = '') => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target + suffix;
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current) + suffix;
        }
      }, 20);
    };
    
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const text = element.textContent;
          if (text === '17') {
            animateNumber(element, 17, '');
          } else if (text === '47') {
            animateNumber(element, 47, '');
          } else if (text === '22 M') {
            animateNumber(element, 22, ' M');
          } else if (text === '274 200') {
            animateNumber(element, 274200, '');
          }
          statObserver.unobserve(element);
        }
      });
    }, { threshold: 0.5 });
    
    statValues.forEach(stat => {
      statObserver.observe(stat);
    });
  }
  
  // ===== PRÉCHARGEMENT DES IMAGES AU HOVER (optionnel) =====
  const regionCards = document.querySelectorAll('.region-card');
  const imagesToPreload = [];
  
  regionCards.forEach(card => {
    const bgLayer = card.querySelector('.card-bg-layer');
    if (bgLayer) {
      const bgColor = window.getComputedStyle(bgLayer).background;
      // Préchargement simple - juste pour optimisation
    }
  });
  
  // ===== DÉTECTION DU SCROLL POUR HERO (animation parallaxe légère) =====
  const hero = document.querySelector('.hero');
  
  if (hero) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      if (scrollPosition < window.innerHeight) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
      }
    });
  }
  
  // ===== GESTION DES CARTES AU TOUCH (mobile) =====
  if ('ontouchstart' in window) {
    const cards = document.querySelectorAll('.region-card');
    cards.forEach(card => {
      card.addEventListener('touchstart', function() {
        this.style.transform = 'translateY(-3px)';
      });
      card.addEventListener('touchend', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }
  
  console.log('✅ main.js chargé — Site vitrine Burkina Faso');
});