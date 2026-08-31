document.addEventListener("DOMContentLoaded", function () {

    /* PREVENT NATIVE FORM SUBMISSION (INTAKE + CONTACT) */
    document.querySelectorAll("form.intake-form").forEach((form) => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            console.log("Form submit intercepted (no backend connected yet).");
        });
    });

    /* MOBILE HAMBURGER MENU */
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mainNav = document.getElementById("mainNav");
    const navOverlay = document.getElementById("navOverlay");

    function openMenu() {
        mainNav.classList.add("open");
        hamburgerBtn.classList.add("active");
        navOverlay.classList.add("active");
        hamburgerBtn.setAttribute("aria-expanded", "true");
        document.documentElement.classList.add("no-scroll");
        document.body.classList.add("no-scroll");
    }

    function closeMenu() {
        mainNav.classList.remove("open");
        hamburgerBtn.classList.remove("active");
        navOverlay.classList.remove("active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
        document.documentElement.classList.remove("no-scroll");
        document.body.classList.remove("no-scroll");
        document.querySelectorAll(".has-dropdown.open").forEach((el) => {
            el.classList.remove("open");
        });
    }

    if (hamburgerBtn && mainNav && navOverlay) {
        hamburgerBtn.addEventListener("click", function () {
            const isOpen = mainNav.classList.contains("open");
            isOpen ? closeMenu() : openMenu();
        });

        navOverlay.addEventListener("click", closeMenu);

        mainNav.querySelectorAll("a:not(.dropdown-toggle)").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeMenu();
        });
    }

    /* DROPDOWN MENUS */
    const dropdownParents = document.querySelectorAll(".has-dropdown");
    dropdownParents.forEach((parent) => {
        const toggle = parent.querySelector(".dropdown-toggle");
        toggle.addEventListener("click", function (e) {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                const isOpen = parent.classList.contains("open");
                dropdownParents.forEach((p) => {
                    if (p !== parent) p.classList.remove("open");
                });
                parent.classList.toggle("open", !isOpen);
            }
        });
    });

    /* DRAG & DROP / CLICK-TO-BROWSE UPLOAD ZONE */
    const uploadZone = document.getElementById("uploadZone");
    const fileInput = document.getElementById("fileInput");
    const fileListEl = document.getElementById("uploadFileList");

    if (uploadZone && fileInput) {
        uploadZone.addEventListener("click", function (e) {
            if (e.target !== fileInput) fileInput.click();
        });

        ["dragenter", "dragover"].forEach((evt) => {
            uploadZone.addEventListener(evt, function (e) {
                e.preventDefault();
                e.stopPropagation();
                uploadZone.classList.add("drag-over");
            });
        });

        ["dragleave", "drop"].forEach((evt) => {
            uploadZone.addEventListener(evt, function (e) {
                e.preventDefault();
                e.stopPropagation();
                uploadZone.classList.remove("drag-over");
            });
        });

        uploadZone.addEventListener("drop", function (e) {
            const files = e.dataTransfer.files;
            if (files && files.length) {
                fileInput.files = files;
                renderFileList(files);
            }
        });

        fileInput.addEventListener("change", function () {
            renderFileList(fileInput.files);
        });

        function renderFileList(files) {
            if (!fileListEl) return;
            fileListEl.innerHTML = "";
            Array.from(files).forEach((file) => {
                const chip = document.createElement("div");
                chip.className = "file-chip";
                chip.innerHTML = `<span>${file.name}</span><span>${(file.size / 1024).toFixed(0)} KB</span>`;
                fileListEl.appendChild(chip);
            });
        }
    }

    /* SCROLL-REVEAL ANIMATION */
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        revealEls.forEach((el) => observer.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("in-view"));
    }

    window.addEventListener("resize", function () {
        if (window.innerWidth > 1024) closeMenu();
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerOffset = 110; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    });
});

// Logic for the "START YOUR PROJECT" modal window
document.addEventListener('DOMContentLoaded', () => {
    const projectModal = document.getElementById('projectModal');
    const openModalBtns = document.querySelectorAll('.project-modal-trigger'); 
    const projectModalClose = document.getElementById('projectModalClose');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); 
            projectModal.classList.add('active');
            document.documentElement.classList.add("no-scroll");
            document.body.classList.add('no-scroll');
        });
    });

    if(projectModalClose) {
        projectModalClose.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.documentElement.classList.remove("no-scroll");
            document.body.classList.remove('no-scroll');
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            projectModal.classList.remove('active');
            document.documentElement.classList.remove("no-scroll");
            document.body.classList.remove('no-scroll');
        }
    });
});