document.addEventListener("DOMContentLoaded", function () {

    /* PREVENT NATIVE FORM SUBMISSION (INTAKE + CONTACT)
       Real submission will be wired up once the backend
       integration is finalized with the client's developer.
       For now, just stop the page from reloading with a query string */
    document.querySelectorAll("form.intake-form").forEach((form) => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            // TODO: replace with real submission logic once backend intake
            // integration is confirmed with the client's developer.
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
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        mainNav.classList.remove("open");
        hamburgerBtn.classList.remove("active");
        navOverlay.classList.remove("active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";

        // Also collapse any open mobile dropdowns
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

        // Close the menu whenever an actual navigational link is clicked
        // (top-level links, dropdown sub-items, mobile CTA) — but not the
        // dropdown toggles themselves, since those just expand/collapse
        // the accordion on mobile and shouldn't close the whole menu.
        mainNav.querySelectorAll("a:not(.dropdown-toggle)").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Close menu with Escape key
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeMenu();
        });
    }

    /* DROPDOWN MENUS (SERVICES / OUR PROCESS / RESOURCES)
       Desktop: hover (handled purely in CSS).
       Mobile/tablet (<=1024px): tap-to-toggle accordion */
    const dropdownParents = document.querySelectorAll(".has-dropdown");

    dropdownParents.forEach((parent) => {
        const toggle = parent.querySelector(".dropdown-toggle");

        toggle.addEventListener("click", function (e) {
            // Only intercept the click on mobile; let desktop links behave normally.
            if (window.innerWidth <= 1024) {
                e.preventDefault();

                const isOpen = parent.classList.contains("open");

                // Close any other open dropdown first (accordion behavior)
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
            // Avoid double-trigger if the click landed on the hidden input itself
            if (e.target !== fileInput) {
                fileInput.click();
            }
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
        // Fallback: just show everything if IntersectionObserver isn't supported
        revealEls.forEach((el) => el.classList.add("in-view"));
    }

    /* Close mobile menu automatically if resized to desktop */
    window.addEventListener("resize", function () {
        if (window.innerWidth > 1024) {
            closeMenu();
        }
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

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });