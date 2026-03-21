/**
 * Photography Portfolio - Main Script
 * Handles dynamic content, lightbox, filtering and smooth animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    let currentPhotoIndex = 0;

    // Helper to parse "Month Year" format into numerical sortable value (e.g. "Marzo 2026" -> 202603)
    function getPhotoDateValue(dateStr) {
        if (!dateStr || dateStr === "-") return 0;
        
        // Handle "Reciente" or similar by giving it a very high value
        if (dateStr.toLowerCase().trim() === "reciente") return 999999;

        const monthNames = {
            "enero": 1, "febrero": 2, "marzo": 3, "abril": 4, "mayo": 5, "junio": 6,
            "julio": 7, "agosto": 8, "septiembre": 9, "octubre": 10, "noviembre": 11, "diciembre": 12
        };
        const parts = dateStr.trim().toLowerCase().split(/\s+/);
        if (parts.length >= 2) {
            const month = monthNames[parts[0]] || parseInt(parts[0], 10) || 0;
            const year = parseInt(parts[parts.length - 1], 10) || 0;
            return year * 100 + month;
        }
        return 0;
    }

    // Sort photos from most recent to oldest (using date and ID as tie-breaker)
    portfolioData.photos.sort((a, b) => {
        const dateDiff = getPhotoDateValue(b.date) - getPhotoDateValue(a.date);
        if (dateDiff !== 0) return dateDiff;
        // If same date, sort by ID descending (newer uploads first)
        return (b.id || 0) - (a.id || 0);
    });

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
        setupWatermarkLogic();
        checkAdminAccess();
        hideLoader();
    }

    function checkAdminAccess() {
        const isLocal = window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1';

        if (isLocal) {
            console.log("Local environment detected. Enabling admin button.");
            if (openAdminBtn) openAdminBtn.style.display = 'flex';
        } else {
            console.log("Production environment. Admin button hidden.");
            if (openAdminBtn) openAdminBtn.style.display = 'none';
        }
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
        const navOverlay = document.getElementById('nav-overlay');

        function openMobileMenu() {
            navLinks.classList.add('active');
            mobileMenu.classList.add('active');
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        mobileMenu.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close mobile menu when clicking the overlay
        navOverlay.addEventListener('click', closeMobileMenu);

        // Close mobile menu when clicking a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Navigation for Section Visibility
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').substring(1);

                // Si el link es solo "#" o va a "hero" (inicio), reseteamos la vista
                if (!targetId || targetId === 'hero' || targetId === 'main-header') {
                    if (targetId === 'hero') e.preventDefault();
                    resetToHome();
                    return;
                }

                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    e.preventDefault();
                    showSection(targetId);
                }
            });
        });
    }

    function resetToHome() {
        console.log("Resetting to home view...");
        document.body.classList.remove('content-visible');
        const sections = document.querySelectorAll('section:not(#hero)');
        sections.forEach(s => {
            s.classList.remove('section-visible');
            s.style.opacity = '0';
            s.style.display = 'none';
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        updateActiveNavLink('hero');
    }

    function showSection(id) {
        console.log("Attempting to show section:", id);
        const section = document.getElementById(id);
        if (section) {
            // Activar visualización global
            document.body.classList.add('content-visible');

            // Limpiar otras secciones
            const sections = document.querySelectorAll('section:not(#hero)');
            sections.forEach(s => {
                if (s.id !== id) {
                    s.classList.remove('section-visible');
                    s.style.opacity = '0';
                    s.style.display = 'none';
                }
            });

            // Preparar y mostrar sección destino
            section.style.display = 'block';
            section.classList.add('section-visible');

            // Dar tiempo al navegador a refluir (especialmente importante en iOS Safari)
            // y luego hacer scroll manualmente con window.scrollTo (más fiable que scrollIntoView en iOS)
            setTimeout(() => {
                section.style.opacity = '1';
                const headerHeight = 80;
                const top = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }, 150);

            updateActiveNavLink(id);
        } else {
            console.error("Section not found:", id);
        }
    }

    function updateActiveNavLink(id) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const target = href.substring(1);
                if (target === id) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
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
            document.querySelector('.admin-content').classList.remove('modal-expanded');
        });

        // Close on background click
        adminModal.addEventListener('click', (e) => {
            if (e.target === adminModal) {
                adminModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                document.querySelector('.admin-content').classList.remove('modal-expanded'); 
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

        // Form Submit
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!imageInput.files || imageInput.files.length === 0) {
                alert('Por favor, selecciona una imagen.');
                return;
            }

            const submitBtn = document.getElementById('upload-submit-btn');
            submitBtn.textContent = 'Procesando imagen...';
            submitBtn.disabled = true;

            try {
                // Determine if we are on the local server or file protocol
                if (window.location.protocol === 'file:') {
                    throw new Error('Debes abrir el portfolio usando el archivo "iniciar_portfolio.command" para poder subir fotos. (El protocolo file:// bloquea las subidas por seguridad).');
                }

                // --- Generate Watermarked Image ---
                const watermarkedBlob = await generateWatermarkedBlob();
                
                const formData = new FormData(uploadForm);
                // Replace the original image with the processed one
                formData.set('image', watermarkedBlob, imageInput.files[0].name);

                submitBtn.textContent = 'Subiendo...';

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

    function handleFiles(file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                const imgPreview = document.getElementById('image-preview');
                const previewContainer = document.getElementById('preview-container');
                const wmEditor = document.getElementById('watermark-editor');
                const dropText = document.querySelector('.drop-text');

                imgPreview.src = reader.result;
                previewContainer.hidden = false;
                wmEditor.hidden = false;
                document.getElementById('drop-zone').hidden = true;
                
                // Expand modal for large workspace
                document.querySelector('.admin-content').classList.add('modal-expanded');
                
                // Reset WM position to center
                const overlay = document.getElementById('watermark-overlay');
                overlay.style.left = '50%';
                overlay.style.top = '50%';
            }
        }
    }

    // --- Watermark Editor Logic ---
    function setupWatermarkLogic() {
        const previewContainer = document.getElementById('preview-container');
        const watermarkOverlay = document.getElementById('watermark-overlay');
        const wmText = document.getElementById('wm-text');
        const wmFont = document.getElementById('wm-font');
        const wmColor = document.getElementById('wm-color');
        const wmSize = document.getElementById('wm-size');
        const wmOpacity = document.getElementById('wm-opacity');

        // State for positioning (percentages 0-100)
        let wmX = 50; 
        let wmY = 50;
        let isDragging = false;
        let dragStartX, dragStartY;

        // Update preview based on inputs
        function updateWMPreview() {
            watermarkOverlay.textContent = wmText.value;
            watermarkOverlay.style.fontFamily = wmFont.value;
            watermarkOverlay.style.color = wmColor.value;
            watermarkOverlay.style.fontSize = wmSize.value + 'px';
            watermarkOverlay.style.opacity = wmOpacity.value;
            watermarkOverlay.style.left = wmX + '%';
            watermarkOverlay.style.top = wmY + '%';
        }

        [wmText, wmFont, wmColor, wmSize, wmOpacity].forEach(el => {
            el.addEventListener('input', updateWMPreview);
        });

        // Dragging Logic
        watermarkOverlay.addEventListener('mousedown', (e) => {
            e.stopPropagation(); // Prevents bubbling to container or other elements
            isDragging = true;
            watermarkOverlay.classList.add('active');
            
            // Calculate offset relative to the watermark absolute position
            const rect = watermarkOverlay.getBoundingClientRect();
            dragStartX = e.clientX - rect.left;
            dragStartY = e.clientY - rect.top;
            
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const rect = previewContainer.getBoundingClientRect();
            
            // New position relative to container
            let x = e.clientX - rect.left - dragStartX + (watermarkOverlay.offsetWidth / 2);
            let y = e.clientY - rect.top - dragStartY + (watermarkOverlay.offsetHeight / 2);

            // Convert to percentages for responsive preview
            wmX = Math.max(0, Math.min(100, (x / rect.width) * 100));
            wmY = Math.max(0, Math.min(100, (y / rect.height) * 100));

            watermarkOverlay.style.left = wmX + '%';
            watermarkOverlay.style.top = wmY + '%';
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                watermarkOverlay.classList.remove('active');
            }
        });

        // Initialize state
        updateWMPreview();

        // Expose state for processing via a global-ish function context
        window.getWatermarkState = () => ({
            text: wmText.value,
            font: wmFont.value,
            color: wmColor.value,
            size: parseInt(wmSize.value),
            opacity: parseFloat(wmOpacity.value),
            xPercent: wmX,
            yPercent: wmY
        });
    }

    async function generateWatermarkedBlob() {
        const canvas = document.getElementById('processing-canvas');
        const ctx = canvas.getContext('2d');
        const img = document.getElementById('image-preview');
        const state = window.getWatermarkState();

        // Use original image dimensions for high quality
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // Draw base image
        ctx.drawImage(img, 0, 0);

        // Configure text style
        // Scale font size proportionally to image resolution
        const ratio = img.naturalWidth / img.clientWidth;
        const finalFontSize = state.size * ratio;

        ctx.font = `${finalFontSize}px ${state.font}`;
        ctx.fillStyle = state.color;
        ctx.globalAlpha = state.opacity;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Add subtle shadow for professional look
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4 * ratio;
        ctx.shadowOffsetX = 2 * ratio;
        ctx.shadowOffsetY = 2 * ratio;

        // Calculate position in natural coordinates
        const x = (state.xPercent / 100) * canvas.width;
        const y = (state.yPercent / 100) * canvas.height;

        // Draw text
        ctx.fillText(state.text, x, y);

        return new Promise(resolve => {
            canvas.toBlob(resolve, 'image/jpeg', 0.92);
        });
    }
});
