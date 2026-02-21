/**
 * Fruit House — Gallery Page
 * Lightbox overlay
 */
import { initShared } from './shared';

function initLightbox(): void {
    const galleryItems = document.querySelectorAll<HTMLElement>('.gallery-item');
    const lightbox = document.querySelector('.lightbox') as HTMLElement | null;
    const lightboxImg = lightbox?.querySelector('img') as HTMLImageElement | null;
    const lightboxClose = lightbox?.querySelector('.lightbox-close') as HTMLElement | null;

    if (!lightbox || !lightboxImg) return;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img') as HTMLImageElement | null;
            if (!img) return;
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = (): void => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    };

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e: Event) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeLightbox();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initShared();
    initLightbox();
});
