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
// ===== CARTE INTERACTIVE DES 17 RÉGIONS =====
document.addEventListener('DOMContentLoaded', function() {
  // Vérifier que la carte existe
  var carteElement = document.getElementById('carte-burkina');
  if (!carteElement) return;
  
  // Initialisation de la carte centrée sur le Burkina Faso
  var map = L.map('carte-burkina').setView([12.5, -1.8], 7);
  
  // Fond de carte (style épuré)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 10,
    minZoom: 6
  }).addTo(map);
  
  // ===== DONNÉES DES 17 RÉGIONS =====
  var regions = [
    { nom: "Bankui", chefLieu: "Dédougou", population: "2 120 600", superficie: "34 333 km²", lat: 12.461, lng: -3.465, page: "Pages/Bankui.html", couleur: "#C1272D" },
    { nom: "Sourou", chefLieu: "Tougan / Di", population: "~400 000", superficie: "~12 000 km²", lat: 13.072, lng: -3.066, page: "Pages/sourou.html", couleur: "#009A44" },
    { nom: "Tannounyan", chefLieu: "Banfora", population: "945 000", superficie: "18 917 km²", lat: 10.633, lng: -4.759, page: "Pages/tannounyan.html", couleur: "#009A44" },
    { nom: "Kadiogo", chefLieu: "Ouagadougou", population: "3 623 800", superficie: "2 805 km²", lat: 12.371, lng: -1.520, page: "Pages/kadiogo.html", couleur: "#C1272D" },
    { nom: "Nakambé", chefLieu: "Tenkodogo", population: "1 787 200", superficie: "11 811 km²", lat: 11.780, lng: -0.370, page: "Pages/nakambe.html", couleur: "#F7B731" },
    { nom: "Oubri", chefLieu: "Koupéla", population: "~400 000", superficie: "~5 000 km²", lat: 12.178, lng: -0.351, page: "Pages/oubri.html", couleur: "#1A6B9A" },
    { nom: "Yaadga", chefLieu: "Ouahigouya", population: "1 939 300", superficie: "16 207 km²", lat: 13.577, lng: -2.421, page: "Pages/yaadga.html", couleur: "#1A6B9A" },
    { nom: "Kuilsé", chefLieu: "Koudougou", population: "1 866 300", superficie: "21 722 km²", lat: 12.252, lng: -2.369, page: "Pages/kuilse.html", couleur: "#6B1A8B" },
    { nom: "Nazinon", chefLieu: "Manga", population: "872 800", superficie: "11 321 km²", lat: 11.664, lng: -1.073, page: "Pages/nazinon.html", couleur: "#009A44" },
    { nom: "Nando", chefLieu: "Léo / Sapouy", population: "~450 000", superficie: "~13 000 km²", lat: 11.416, lng: -2.350, page: "Pages/nando.html", couleur: "#009A44" },
    { nom: "Goulmou", chefLieu: "Fada N'Gourma", population: "2 240 200", superficie: "36 256 km²", lat: 12.058, lng: 0.358, page: "Pages/goulmou.html", couleur: "#7A4E2D" },
    { nom: "Sirba", chefLieu: "Bogandé", population: "~350 000", superficie: "~8 500 km²", lat: 12.981, lng: -0.147, page: "Pages/sirba.html", couleur: "#7A4E2D" },
    { nom: "Guiriko", chefLieu: "Bobo-Dioulasso", population: "2 572 600", superficie: "25 344 km²", lat: 11.177, lng: -4.298, page: "Pages/guiriko.html", couleur: "#1A6B9A" },
    { nom: "Tapoa", chefLieu: "Diapaga", population: "341 782", superficie: "14 594 km²", lat: 12.083, lng: 1.800, page: "Pages/tapoa.html", couleur: "#009A44" },
    { nom: "Liptako", chefLieu: "Dori", population: "~1 500 000", superficie: "~50 000 km²", lat: 14.035, lng: -0.034, page: "Pages/liptako.html", couleur: "#C1272D" },
    { nom: "Djioro", chefLieu: "Gaoua", population: "986 700", superficie: "16 202 km²", lat: 10.899, lng: -3.181, page: "Pages/djioro.html", couleur: "#009A44" },
    { nom: "Soum", chefLieu: "Djibo", population: "~350 000", superficie: "~12 000 km²", lat: 14.099, lng: -1.631, page: "Pages/soum.html", couleur: "#F7B731" }
  ];
  
  // ===== AJOUT DES MARQUEURS =====
  regions.forEach(function(region) {
    // Créer un marqueur circulaire personnalisé
    var marker = L.circleMarker([region.lat, region.lng], {
      radius: 10,
      fillColor: region.couleur,
      color: "#FFFFFF",
      weight: 2.5,
      opacity: 1,
      fillOpacity: 0.85
    }).addTo(map);
    
    // ===== AU SURVOL : AFFICHE LE NOM DE LA RÉGION =====
    marker.bindTooltip(region.nom, {
      sticky: true,
      direction: 'top',
      offset: [0, -10]
    });
    
    // ===== AU CLIC : AFFICHE LES INFOS + LIEN VERS LA PAGE =====
    marker.bindPopup(`
      <div style="text-align: center; font-family: 'DM Sans', sans-serif; min-width: 180px;">
        <div style="font-weight: 700; font-size: 16px; color: ${region.couleur}; margin-bottom: 8px; border-bottom: 2px solid ${region.couleur}; display: inline-block; padding-bottom: 3px;">
          ${region.nom}
        </div>
        <div style="margin: 8px 0; text-align: left;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
            <span style="font-size: 14px;">📍</span>
            <span style="font-size: 13px;"><strong>Chef-lieu :</strong> ${region.chefLieu}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
            <span style="font-size: 14px;">👥</span>
            <span style="font-size: 13px;"><strong>Population :</strong> ${region.population}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
            <span style="font-size: 14px;">📏</span>
            <span style="font-size: 13px;"><strong>Superficie :</strong> ${region.superficie}</span>
          </div>
        </div>
        <a href="${region.page}" style="display: inline-block; margin-top: 8px; padding: 6px 16px; background: ${region.couleur}; color: white; text-decoration: none; border-radius: 25px; font-size: 12px; font-weight: 500; transition: all 0.2s;">🔍 Découvrir la région →</a>
      </div>
    `, { maxWidth: 260 });
    
    // Animation au survol du marqueur
    marker.on('mouseover', function() {
      this.setStyle({
        radius: 14,
        fillOpacity: 1,
        weight: 3
      });
    });
    
    marker.on('mouseout', function() {
      this.setStyle({
        radius: 10,
        fillOpacity: 0.85,
        weight: 2.5
      });
    });
  });
  
  // ===== AJOUT D'UN ZOOM SUR LES LIMITES DU BURKINA =====
  map.fitBounds([
    [9.5, -5.5],  // Sud-Ouest
    [15.5, 2.5]   // Nord-Est
  ]);
});