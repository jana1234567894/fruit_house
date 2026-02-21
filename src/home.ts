/**
 * Fruit House — Home Page
 * Hero crossfade + home-specific initialization
 */
import { initShared } from './shared';

function initHeroCrossfade(): void {
    const images = document.querySelectorAll<HTMLImageElement>('.hero-parallax-bg img');
    if (images.length < 2) return;

    let activeIndex = 0;

    setInterval(() => {
        images[activeIndex].classList.add('hero-img-hidden');
        activeIndex = (activeIndex + 1) % images.length;
        images[activeIndex].classList.remove('hero-img-hidden');
    }, 5000);
}

function initCounterAnimation(): void {
    const counters = document.querySelectorAll<HTMLElement>('[data-count]');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target as HTMLElement;
                const target = parseInt(el.dataset.count || '0', 10);
                let current = 0;
                const step = Math.ceil(target / 50);
                const interval = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(interval);
                    }
                    el.textContent = current.toString() + (el.dataset.suffix || '');
                }, 30);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

document.addEventListener('DOMContentLoaded', () => {
    initShared();
    initHeroCrossfade();
    initCounterAnimation();
});
