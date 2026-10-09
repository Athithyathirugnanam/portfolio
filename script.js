/**
 * Athithya T - Portfolio Interactive Experience Script
 * Modern Animation Engine, Particles Canvas, Dynamic Interactions & Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive Particle Canvas Engine
  initParticleCanvas();

  // 2. Cursor Glow Follower
  initCursorGlow();

  // 3. Dynamic Typewriter Effect
  initTypewriter();

  // 4. Scroll Reveal & Skill Bars
  initScrollObservers();

  // 5. Animated Metrics Counters
  initMetricsCounter();

  // 6. Skill Category Filtering
  initSkillFilters();

  // 7. Navbar Active Tracking & Sticky Blur
  initNavbarScroll();

  // 8. Mobile Navigation Drawer
  initMobileNav();

  // 9. Theme Toggle (Dark / Light)
  initThemeToggle();

  // 10. Project Architecture Modal
  initProjectModals();

  // 11. Resume View & Print Modal
  initResumeModal();

  // 12. Contact Form & Clipboard Copying
  initContactAndCopy();
});

/* ==========================================================================
   1. Particle Canvas Engine
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor((width * height) / 16000), 75);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? 'rgba(6, 182, 212, ' : 'rgba(99, 102, 241, ';
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let mouse = { x: null, y: null, maxDist: 120 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Connect particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const alpha = (1 - dist / 110) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Subtle mouse interaction
      if (mouse.x !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.maxDist) {
          const force = (1 - dist / mouse.maxDist) * 0.6;
          particles[i].x += (dx / dist) * force;
          particles[i].y += (dy / dist) * force;
        }
      }

      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Cursor Glow Follower
   ========================================================================== */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.innerWidth < 768) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function update() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    requestAnimationFrame(update);
  }

  update();
}

/* ==========================================================================
   3. Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const textEl = document.getElementById('typewriterText');
  if (!textEl) return;

  const phrases = [
    'Full Stack Web Applications',
    'AI & Multimodal Systems',
    'Computer Vision & Speech Telemetry',
    'High-Performance Java & Python Services',
    'Algorithmic Solutions (HackerRank 7000)'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 75;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      textEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      textEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === current.length) {
      typingSpeed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. Scroll Observers (Reveals & Skill Bars)
   ========================================================================== */
function initScrollObservers() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // If skill card, trigger progress bar animation
        const progressBar = entry.target.querySelector('.skill-progress');
        if (progressBar) {
          const target = progressBar.getAttribute('data-progress');
          if (target) {
            progressBar.style.width = target + '%';
          }
        }

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   5. Animated Metrics Counters
   ========================================================================== */
function initMetricsCounter() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1800; // ms
          const step = Math.ceil(target / (duration / 25));
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target.toLocaleString();
              clearInterval(timer);
            } else {
              counter.textContent = current.toLocaleString();
            }
          }, 25);
        });
      }
    });
  }, { threshold: 0.5 });

  const metricsBar = document.querySelector('.metrics-bar');
  if (metricsBar) countObserver.observe(metricsBar);
}

/* ==========================================================================
   6. Skill Filters
   ========================================================================== */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skills-grid .skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            const bar = card.querySelector('.skill-progress');
            if (bar) bar.style.width = bar.getAttribute('data-progress') + '%';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   7. Navbar Scroll Tracking
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-item');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar backdrop blur intensify
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll to Top visibility
    if (scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }

    // Active Section Tracking
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   8. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (!mobileToggle || !navLinks) return;

  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  // Close when clicking any nav item
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('mobile-open');
    }
  });
}

/* ==========================================================================
   9. Theme Toggle (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Check saved theme
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('portfolio-theme', 'light');
        showToast('Switched to Light Theme ☀️');
      } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('portfolio-theme', 'dark');
        showToast('Switched to Dark Theme 🌙');
      }
    });
  }
}

/* ==========================================================================
   10. Project Architecture Modals
   ========================================================================== */
const projectData = {
  suvs: {
    title: 'Student Understanding Verification System',
    category: 'Computer Vision & LLM Multimodal System',
    tags: ['Python', 'Flask', 'LLM', 'OpenCV', 'Whisper', 'MediaPipe', 'Pandas'],
    content: `
      <div class="modal-section">
        <h4>System Overview</h4>
        <p>
          The <strong>Student Understanding Verification System</strong> is an end-to-end multimodal diagnostic 
          platform built to evaluate how thoroughly a student grasps technical lessons during real-time learning 
          sessions. Rather than relying solely on multiple-choice quizzes, the system combines acoustic tone, speech 
          transcription, behavioral cues, and natural language explanations.
        </p>
      </div>

      <div class="modal-section mt-2">
        <h4>Core Architecture & Workflow</h4>
        <div class="code-snippet-box">
          <div class="code-line"><span class="c-keyword">[Student Camera & Audio]</span> ➔ Real-time Capture</div>
          <div class="code-line indent-1">↳ <strong>OpenCV & MediaPipe:</strong> Head pose, gaze focus & behavioral signals</div>
          <div class="code-line indent-1">↳ <strong>OpenAI Whisper:</strong> High-precision speech-to-text transcription</div>
          <div class="code-line"><span class="c-keyword">[LLM Semantic Engine]</span> ➔ Evaluates responses against syllabus</div>
          <div class="code-line indent-1">↳ Identifies misconceptions, partial truths, and missing conceptual steps</div>
          <div class="code-line"><span class="c-keyword">[Pandas & Flask API]</span> ➔ Aggregates metrics & delivers educator report</div>
        </div>
      </div>

      <div class="modal-section mt-2">
        <h4>Key Technical Innovations</h4>
        <ul class="timeline-bullets">
          <li><strong>Multimodal Signal Fusion:</strong> Synthesized disparate inputs (facial landmark focus via MediaPipe + audio transcription via Whisper) into a coherent understanding score.</li>
          <li><strong>Semantic Misconception Diagnosis:</strong> Trained prompt workflows on large language models to provide actionable corrective feedback rather than just binary pass/fail grades.</li>
          <li><strong>Educator Dashboard:</strong> Flask API coupled with Pandas dataframes delivering telemetry on where students faced confusion spikes.</li>
        </ul>
      </div>
    `
  },
  meme: {
    title: 'AI Meme-Based Concept Explainer',
    category: 'Visual Storytelling & Java Ed-Tech Application',
    tags: ['Java', 'AI Generation', 'Visual Storytelling', 'Agile Design'],
    content: `
      <div class="modal-section">
        <h4>System Overview</h4>
        <p>
          The <strong>AI Meme-Based Concept Explainer</strong> translates abstract, notoriously difficult 
          computer science topics (such as concurrency race conditions, recursion stack overflow, or pointer arithmetic) 
          into humorous, pedagogically sound AI-generated memes.
        </p>
      </div>

      <div class="modal-section mt-2">
        <h4>Core Architecture & Workflow</h4>
        <div class="code-snippet-box">
          <div class="code-line"><span class="c-keyword">[Topic Input]</span> e.g., 'Deadlock in Multithreading'</div>
          <div class="code-line indent-1">↳ <strong>Concept Distillation Engine:</strong> Identifies core conflict & metaphors</div>
          <div class="code-line indent-1">↳ <strong>AI Meme Synthesizer:</strong> Pairs scenario with matching meme format</div>
          <div class="code-line indent-1">↳ <strong>Interactive Explainer:</strong> Accompanies meme with interactive code demo</div>
          <div class="code-line"><span class="c-keyword">[Engagement Feedback Loop]</span> ➔ Visual memory retention boosted by >2x</div>
        </div>
      </div>

      <div class="modal-section mt-2">
        <h4>Key Technical Innovations</h4>
        <ul class="timeline-bullets">
          <li><strong>Contextual Humor Mapping:</strong> Formulated algorithmic rules mapping algorithmic failure states to relatable comic narratives.</li>
          <li><strong>Interactive Java Frontend:</strong> Clean, responsive desktop/app interface built with Java, featuring rapid concept search and sharing capabilities.</li>
          <li><strong>Team Collaboration:</strong> Built in a close-knit agile team, coordinating sprint milestones from ideation to final testing.</li>
        </ul>
      </div>
    `
  }
};

function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.getElementById('modalCloseBtn');
  const triggers = document.querySelectorAll('.project-modal-trigger');

  if (!modal || !modalBody) return;

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (!data) return;

      const tagsHtml = data.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');

      modalBody.innerHTML = `
        <span class="section-subtitle">${data.category}</span>
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin: 0.5rem 0 1rem; color: var(--text-primary);">${data.title}</h2>
        <div class="project-tech-tags" style="margin-bottom: 1.5rem;">${tagsHtml}</div>
        ${data.content}
        <div style="margin-top: 2rem; display: flex; gap: 1rem;">
          <a href="https://github.com/Athithyathirugnanam" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <i class="fa-brands fa-github"></i> View GitHub Repository
          </a>
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('projectModal').classList.remove('active')">
            Close
          </button>
        </div>
      `;

      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/* ==========================================================================
   11. Resume View & Print Modal
   ========================================================================== */
function initResumeModal() {
  const resumeBtn = document.getElementById('resumeViewBtn');
  const resumeModal = document.getElementById('resumeModal');
  const resumeCloseBtn = document.getElementById('resumeCloseBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  if (!resumeModal) return;

  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      resumeModal.classList.add('active');
    });
  }

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', () => {
      resumeModal.classList.remove('active');
    });
  }

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) resumeModal.classList.remove('active');
  });

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   12. Contact Form & Clipboard Copying
   ========================================================================== */
function initContactAndCopy() {
  // Clipboard copying
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
          btn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--accent-emerald);"></i>';
          setTimeout(() => {
            btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
          }, 2000);
        }).catch(() => {
          showToast(`Direct copy: ${textToCopy}`);
        });
      }
    });
  });

  // Contact Form Submission
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (form && submitBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');

      btnText.style.display = 'none';
      btnLoader.style.display = 'inline-flex';
      submitBtn.disabled = true;

      // Simulate sending
      setTimeout(() => {
        btnText.style.display = 'inline-flex';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;

        const name = document.getElementById('name').value;
        showToast(`Thank you, ${name}! Your message has been prepared.`);
        
        // Open default mail client as reliable fallback
        const subject = encodeURIComponent(document.getElementById('subject').value);
        const body = encodeURIComponent(`Name: ${name}\n\n${document.getElementById('message').value}`);
        window.location.href = `mailto:athithyathirugnanam@gmail.com?subject=${subject}&body=${body}`;

        form.reset();
      }, 900);
    });
  }
}

/* ==========================================================================
   Toast Notification Utility
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
