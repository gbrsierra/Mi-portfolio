/**
 * Photography Portfolio - Main Script
 * Handles dynamic content, lightbox, filtering and smooth animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    let currentPhotoIndex = 0;
    let filteredPhotos = [...portfolioData.photos];

    // --- DOM Elements ---
    const loader = document.getElementById('loader');
    const header = document.getElementById('main-header');
    const galleryGrid = document.getElementById('gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('photo-search');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.querySelector('#lightbox .close-lightbox');
    const prevBtn = document.querySelector('.prev-photo');
    const nextBtn = document.querySelector('.next-photo');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // --- Admin DOM Elements ---
    const openAdminBtn = document.getElementById('open-admin-btn');
    const adminModal = document.getElementById('admin-modal');
    const closeAdminBtn = document.querySelector('.close-admin');
    const uploadForm = document.getElementById('upload-form');
    const dropZone = document.getElementById('drop-zone');
    const imageInput = document.getElementById('image-input');
    const imagePreview = document.getElementById('image-preview');
    const dropText = document.querySelector('.drop-text');

    // --- Initialization ---
    init();

    function init() {
        renderGallery(filteredPhotos);
        setupEventListeners();
        setupAdminListeners();
        hideLoader();
    }

    // --- Core Functions ---

    function hideLoader() {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 1000);
    }

    function renderGallery(photos) {
        galleryGrid.innerHTML = '';

        if (photos.length === 0) {
            galleryGrid.innerHTML = '<p class="no-results">No se encontraron fotografías.</p>';
            return;
        }

        photos.forEach((photo, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.setAttribute('data-id', photo.id);
            item.innerHTML = `
                <img src="${photo.thumb}" alt="${photo.title}" loading="lazy">
                <div class="item-overlay">
                    <div class="item-info">
                        <h3>${photo.title}</h3>
                        <p>${photo.category} &bull; ${photo.location}</p>
                    </div>
                </div>
            `;

            item.addEventListener('click', () => openLightbox(index));
            galleryGrid.appendChild(item);
        });
    }

    function setupEventListeners() {
        // Sticky Header
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Filtering
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-filter');

                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                filterPhotos(category, searchInput.value);
            });
        });

        // Search
        searchInput.addEventListener('input', (e) => {
            const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            filterPhotos(activeCategory, e.target.value);
        });

        // Lightbox Navigation
        closeLightboxBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPrevPhoto);
        nextBtn.addEventListener('click', showNextPhoto);

        // Modal click behavior (background click closes)
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-image-container')) {
                closeLightbox();
            }
        });

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevPhoto();
            if (e.key === 'ArrowRight') showNextPhoto();
        });

        // Mobile Menu
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Navigation for Section Visibility
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').substring(1);
                if (targetId && targetId !== 'hero' && targetId !== 'main-header') {
                    // Si el link va a una sección, la mostramos
                    showSection(targetId);
                } else if (targetId === 'hero') {
                    // Si clicamos en el logo o hero, podemos ocultar el resto si queremos un reset
                    // Pero por ahora solo lo dejamos así.
                }
            });
        });
    }

    function showSection(id) {
        const section = document.getElementById(id);
        if (section) {
            // Hacemos visible el cuerpo para que aparezca el footer
            document.body.classList.add('content-visible');

            // Ocultamos todas las secciones excepto hero
            const sections = document.querySelectorAll('section:not(#hero)');
            sections.forEach(s => {
                s.classList.remove('section-visible');
            });

            // Mostramos la sección destino
            section.classList.add('section-visible');

            // Forzar un pequeño reflow para que la transición de opacidad funcione
            setTimeout(() => {
                section.style.opacity = '1';
                // Scroll suave a la sección
                section.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        }
    }

    function filterPhotos(category, searchTerm) {
        const term = searchTerm.toLowerCase().trim();

        filteredPhotos = portfolioData.photos.filter(photo => {
            const matchesCategory = category === 'all' || photo.category === category;
            const matchesSearch = photo.title.toLowerCase().includes(term) ||
                photo.location.toLowerCase().includes(term);
            return matchesCategory && matchesSearch;
        });

        renderGallery(filteredPhotos);
    }

    // --- Lightbox Functions ---

    function openLightbox(index) {
        currentPhotoIndex = index;
        const photo = filteredPhotos[currentPhotoIndex];

        updateLightboxContent(photo);

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }

    function updateLightboxContent(photo) {
        lightboxImg.style.opacity = '0';

        setTimeout(() => {
            lightboxImg.src = photo.src;
            document.getElementById('photo-title').textContent = photo.title;
            document.getElementById('photo-location').textContent = photo.location;
            document.getElementById('photo-date').textContent = photo.date;

            // EXIF
            document.getElementById('exif-camera').textContent = photo.exif.camera;
            document.getElementById('exif-lens').textContent = photo.exif.lens;
            document.getElementById('exif-settings').textContent = photo.exif.settings;

            lightboxImg.onload = () => {
                lightboxImg.style.opacity = '1';
            };
        }, 300);
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
        lightboxImg.src = ''; // Clear src
    }

    function showNextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % filteredPhotos.length;
        updateLightboxContent(filteredPhotos[currentPhotoIndex]);
    }

    function showPrevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
        updateLightboxContent(filteredPhotos[currentPhotoIndex]);
    }

    // --- Admin / Upload Functions ---

    function setupAdminListeners() {
        // Open/Close Admin Modal
        openAdminBtn.addEventListener('click', () => {
            adminModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeAdminBtn.addEventListener('click', () => {
            adminModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close on background click
        adminModal.addEventListener('click', (e) => {
            if (e.target === adminModal) {
                adminModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Drag and Drop
        dropZone.addEventListener('click', () => imageInput.click());

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
        });

        dropZone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files && files.length > 0) {
                imageInput.files = files; // Assign files to input
                handleFiles(files[0]);
            }
        });

        imageInput.addEventListener('change', function () {
            if (this.files && this.files.length > 0) {
                handleFiles(this.files[0]);
            }
        });

        function handleFiles(file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function () {
                    imagePreview.src = reader.result;
                    imagePreview.hidden = false;
                    dropText.hidden = true;
                }
            }
        }

        // Form Submit
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!imageInput.files || imageInput.files.length === 0) {
                alert('Por favor, selecciona una imagen.');
                return;
            }

            const formData = new FormData(uploadForm);
            const submitBtn = document.getElementById('upload-submit-btn');
            submitBtn.textContent = 'Subiendo...';
            submitBtn.disabled = true;

            try {
                // Determine if we are on the local server or file protocol
                if (window.location.protocol === 'file:') {
                    throw new Error('Debes abrir el portfolio usando el archivo "iniciar_portfolio.command" para poder subir fotos. (El protocolo file:// bloquea las subidas por seguridad).');
                }

                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const result = await response.json();
                    alert(result.message + '. La página se recargará para mostrar los cambios.');
                    window.location.reload();
                } else {
                    const err = await response.text();
                    throw new Error(err || 'Error al subir la foto');
                }
            } catch (error) {
                alert('Hubo un problema: ' + error.message);
                console.error('Upload Error:', error);
            } finally {
                submitBtn.textContent = 'Subir y Guardar';
                submitBtn.disabled = false;
            }
        });
    }
});
