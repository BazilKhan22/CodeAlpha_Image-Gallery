class ImageGallery {
    constructor() {
        this.images = [
            {
                src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400',
                category: 'nature',
                caption: 'Beautiful Mountain Landscape'
            },
            {
                src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400',
                category: 'architecture',
                caption: 'Modern City Architecture'
            },
            {
                src: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
                category: 'people',
                caption: 'Portrait Photography'
            },
            {
                src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
                category: 'nature',
                caption: 'Forest Pathway'
            },
            {
                src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400',
                category: 'architecture',
                caption: 'Skyscraper View'
            },
            {
                src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400',
                category: 'people',
                caption: 'Professional Portrait'
            },
            {
                src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
                category: 'nature',
                caption: 'Mountain Range'
            },
            {
                src: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400',
                category: 'architecture',
                caption: 'Building Interior'
            }
        ];
        
        this.currentIndex = 0;
        this.filter = 'all';
        this.init();
    }

    init() {
        this.renderGallery();
        this.setupEventListeners();
    }

    renderGallery() {
        const gallery = document.querySelector('.gallery');
        const filteredImages = this.filter === 'all' 
            ? this.images 
            : this.images.filter(img => img.category === this.filter);

        gallery.innerHTML = filteredImages.map((image, index) => `
            <div class="gallery-item" data-index="${index}" data-category="${image.category}">
                <img src="${image.src}" alt="${image.caption}">
                <div class="category-tag">${image.category}</div>
                <div class="image-overlay">
                    <h3>${image.caption}</h3>
                    <p>Click to view larger</p>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filter = e.target.dataset.filter;
                this.renderGallery();
            });
        });

        // Gallery item clicks
        document.querySelector('.gallery').addEventListener('click', (e) => {
            const galleryItem = e.target.closest('.gallery-item');
            if (galleryItem) {
                this.openLightbox(parseInt(galleryItem.dataset.index));
            }
        });

        // Lightbox controls
        document.querySelector('.close-btn').addEventListener('click', () => this.closeLightbox());
        document.querySelector('.prev-btn').addEventListener('click', () => this.navigate(-1));
        document.querySelector('.next-btn').addEventListener('click', () => this.navigate(1));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!document.getElementById('lightbox').classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.navigate(-1);
                    break;
                case 'ArrowRight':
                    this.navigate(1);
                    break;
            }
        });

        // Close lightbox when clicking outside image
        document.getElementById('lightbox').addEventListener('click', (e) => {
            if (e.target === document.getElementById('lightbox')) {
                this.closeLightbox();
            }
        });
    }

    openLightbox(index) {
        const filteredImages = this.filter === 'all' 
            ? this.images 
            : this.images.filter(img => img.category === this.filter);
        
        this.currentIndex = index;
        this.updateLightbox(filteredImages);
        document.getElementById('lightbox').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    navigate(direction) {
        const filteredImages = this.filter === 'all' 
            ? this.images 
            : this.images.filter(img => img.category === this.filter);
        
        this.currentIndex = (this.currentIndex + direction + filteredImages.length) % filteredImages.length;
        this.updateLightbox(filteredImages);
    }

    updateLightbox(images) {
        const image = images[this.currentIndex];
        document.getElementById('lightbox-img').src = image.src;
        document.getElementById('lightbox-img').alt = image.caption;
        document.getElementById('image-caption').textContent = image.caption;
        document.getElementById('image-count').textContent = `${this.currentIndex + 1} / ${images.length}`;
    }
}

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageGallery();
});