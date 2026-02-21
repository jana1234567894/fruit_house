/**
 * Fruit House — Shared Module
 * Navbar, parallax engine, scroll-reveal, WhatsApp, smooth scroll
 */
import './styles/main.css';

// ── WhatsApp Number ──────────────────────────────────────────
const WHATSAPP_NUMBER = '91XXXXXXXXXX';

// ── Navbar ───────────────────────────────────────────────────
function initNavbar(): void {
    const navbar = document.querySelector('.navbar') as HTMLElement | null;
    const hamburger = document.querySelector('.hamburger') as HTMLElement | null;
    const navLinks = document.querySelector('.nav-links') as HTMLElement | null;
    const overlay = document.querySelector('.mobile-overlay') as HTMLElement | null;

    if (!navbar) return;

    // Scroll → solid background
    const onScroll = (): void => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile hamburger toggle
    const closeNav = (): void => {
        hamburger?.classList.remove('open');
        navLinks?.classList.remove('open');
        overlay?.classList.remove('open');
        document.body.style.overflow = '';
    };

    hamburger?.addEventListener('click', () => {
        const isOpen = hamburger.classList.contains('open');
        if (isOpen) {
            closeNav();
        } else {
            hamburger.classList.add('open');
            navLinks?.classList.add('open');
            overlay?.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    });

    overlay?.addEventListener('click', closeNav);

    // Close nav on link click (mobile)
    navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    // Active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks?.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href') || '';
        const linkPage = href.split('/').pop() || '';
        if (
            linkPage === currentPage ||
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')
        ) {
            link.classList.add('active');
        }
    });
}

// ── Parallax Engine ──────────────────────────────────────────
function initParallax(): void {
    const parallaxElements = document.querySelectorAll<HTMLElement>('[data-parallax]');
    if (parallaxElements.length === 0) return;

    let ticking = false;

    const onScroll = (): void => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                parallaxElements.forEach(el => {
                    const speed = parseFloat(el.dataset.parallax || '0.3');
                    const rect = el.getBoundingClientRect();
                    const offset = (rect.top + scrollY) - scrollY;
                    el.style.transform = `translate3d(0, ${offset * speed * -0.15}px, 0)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
}

// ── Scroll Reveal ────────────────────────────────────────────
function initScrollReveal(): void {
    const revealElements = document.querySelectorAll<HTMLElement>(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );

    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    revealElements.forEach(el => observer.observe(el));
}

// ── Smooth Scroll ────────────────────────────────────────────
function initSmoothScroll(): void {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const targetId = (anchor as HTMLAnchorElement).getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// ── WhatsApp Order ───────────────────────────────────────────
function initWhatsAppOrder(): void {
    document.querySelectorAll<HTMLElement>('[data-order]').forEach(btn => {
        btn.addEventListener('click', () => {
            const productName = btn.dataset.order || 'a product';
            const message = encodeURIComponent(
                `Hi! I would like to order ${productName} from Fruit House Trichy 🍹`
            );
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
            window.open(url, '_blank');
        });
    });
}

// ── FAQ Accordion ────────────────────────────────────────────
function initFAQ(): void {
    document.querySelectorAll<HTMLElement>('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            if (!item) return;
            const isOpen = item.classList.contains('open');
            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            // Toggle clicked
            if (!isOpen) item.classList.add('open');
        });
    });
}

// ── Initialize Everything ────────────────────────────────────
export function initShared(): void {
    initNavbar();
    initParallax();
    initScrollReveal();
    initSmoothScroll();
    initWhatsAppOrder();
    initFAQ();
}

export { WHATSAPP_NUMBER };
