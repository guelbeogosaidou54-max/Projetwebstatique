/* =======================================================
   REGION.JS — Scripts pour les pages région (17 sections)
   ======================================================= */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== SMOOTH SCROLL POUR LA NAVIGATION INTERNE =====
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    }
  });
  
  // ===== SCROLL REVEAL POUR LES SECTIONS (1 à 17) =====
  const animatedElements = document.querySelectorAll(
    '.card, .agri-bloc, .edu-card, .ressource-item, .province-item, .region-hero, .infos-section, .img-principale, .presentation-grid, .cards-grid, .ressources-liste, .agri-grid, .edu-grid, .com-grid, .art-grid, .gastro-grid, .galerie-grid, .carte-container, .saviez-inner, .retour'
  );
  
  if (animatedElements.length > 0) {
    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease ${index * 0.03}s, transform 0.5s ease ${index * 0.03}s`;
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px 30px 0px' });
    
    animatedElements.forEach(el => {
      observer.observe(el);
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
        nav.style.background = 'rgba(18, 16, 10, 0.95)';
      }
    });
  }
  
  // ===== BOUTON RETOUR HAUT DE PAGE =====
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
  
  // ===== ANIMATION DES COMPTEURS (Section 12 - Chiffres clés) =====
  const chiffreValues = document.querySelectorAll('.chiffre-val');
  
  if (chiffreValues.length > 0 && !window.hasRunCounterAnimation) {
    window.hasRunCounterAnimation = true;
    
    const animateCounter = (element, target, unit = '') => {
      if (!target) return;
      
      let numericTarget = parseFloat(target);
      if (isNaN(numericTarget)) return;
      
      let current = 0;
      const increment = numericTarget / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericTarget) {
          element.innerHTML = numericTarget + unit;
          clearInterval(timer);
        } else {
          element.innerHTML = Math.floor(current) + unit;
        }
      }, 25);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const text = element.textContent;
          const match = text.match(/([\d\s\,\.]+)/);
          if (match) {
            let value = match[1].replace(/\s/g, '').replace(',', '');
            let numValue = parseFloat(value);
            if (!isNaN(numValue)) {
              const unit = text.replace(value, '');
              element.textContent = '0' + unit;
              animateCounter(element, numValue, unit);
            }
          }
          counterObserver.unobserve(element);
        }
      });
    }, { threshold: 0.5 });
    
    chiffreValues.forEach(counter => {
      counterObserver.observe(counter);
    });
  }
  
  // ===== GALERIE PHOTOS : HOVER + ZOOM (Section 13) =====
  const galerieItems = document.querySelectorAll('.galerie-item');
  
  galerieItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transition = 'transform 0.3s ease';
      this.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
    
    // Version mobile (tap)
    item.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
    });
  });
  
  // ===== NAVBAR : SURlIGNAGE DE LA SECTION VISIBLE =====
  const sections = document.querySelectorAll('section[id], div[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  
  if (sections.length > 0 && navItems.length > 0) {
    window.addEventListener('scroll', function() {
      let current = '';
      const scrollPosition = window.scrollY + 150;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (href && href === `#${current}`) {
          item.classList.add('active');
          item.style.color = 'var(--or)';
        } else if (!href || !href.startsWith('#')) {
          // Ne rien faire pour les liens externes
        } else {
          item.style.color = 'rgba(255, 255, 255, 0.75)';
        }
      });
    });
  }
  
  // ===== CARTE OPENSTREETMAP : RECHARGEMENT RESPONSIVE =====
  const carteIframe = document.querySelector('.carte-container iframe');
  
  if (carteIframe) {
    const src = carteIframe.src;
    window.addEventListener('resize', function() {
      // Petit hack pour forcer le rechargement sur mobile
      if (window.innerWidth < 768) {
        carteIframe.src = src;
      }
    });
  }
  
  // ===== GESTION DES BOUTONS D'ACCORDÉON (optionnel) =====
  const accordeonBtns = document.querySelectorAll('.accordion-btn');
  
  accordeonBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const content = this.nextElementSibling;
      if (content) {
        content.classList.toggle('active');
        this.classList.toggle('active');
      }
    });
  });
  
  // ===== PRÉVENTION DES LIENS VIDES =====
  const emptyLinks = document.querySelectorAll('a[href="#"], a[href=""]');
  emptyLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
    });
  });
  
  // ===== MISE À JOUR DE L'ANNÉE DANS LE FOOTER =====
  const footerSub = document.querySelector('.footer-sub');
  if (footerSub) {
    const currentYear = new Date().getFullYear();
    if (footerSub.textContent.includes('2025')) {
      footerSub.textContent = footerSub.textContent.replace('2025-2026', `${currentYear}-${currentYear + 1}`);
    }
  }
  
  // ===== DÉTECTION DES PÉRIPHÉRIQUES TACTILES =====
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Améliorer le tap sur les cartes
    const cards = document.querySelectorAll('.card, .region-card');
    cards.forEach(card => {
      card.addEventListener('touchstart', function() {
        this.style.transform = 'translateY(-2px)';
      });
      card.addEventListener('touchend', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }
  
  console.log('✅ region.js chargé — Page région du Burkina Faso');
});