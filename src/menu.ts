/**
 * Fruit House — Menu Page
 * Category filter tabs + WhatsApp ordering
 */
import { initShared } from './shared';

function initCategoryFilter(): void {
    const tabs = document.querySelectorAll<HTMLElement>('.category-tab');
    const groups = document.querySelectorAll<HTMLElement>('.product-group');

    if (tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category || 'all';

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show/hide product groups
            groups.forEach(group => {
                if (category === 'all' || group.dataset.category === category) {
                    group.classList.add('active');
                    // Re-trigger reveal animations
                    group.querySelectorAll('.reveal, .reveal-scale').forEach(el => {
                        el.classList.remove('visible');
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                el.classList.add('visible');
                            });
                        });
                    });
                } else {
                    group.classList.remove('active');
                }
            });
        });
    });

    // Show all by default
    const allTab = document.querySelector('.category-tab[data-category="all"]') as HTMLElement | null;
    allTab?.click();
}

document.addEventListener('DOMContentLoaded', () => {
    initShared();
    initCategoryFilter();
});
