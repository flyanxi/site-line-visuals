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

    /* SMOOTH-SCROLL FOR IN-PAGE ANCHOR LINKS (accounts for the sticky header) */
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

    /* GENERIC MODAL SYSTEM */
    function initModal({ modalId, closeId, triggerSelector }) {
        const modal = document.getElementById(modalId);
        if (!modal) return null;

        const closeBtn = closeId ? document.getElementById(closeId) : null;
        const triggers = document.querySelectorAll(triggerSelector);

        function open(e) {
            if (e) e.preventDefault();
            document.documentElement.classList.add("no-scroll");
            document.body.classList.add("no-scroll");
            modal.classList.add("active");
        }

        function close() {
            modal.classList.remove("active");
            document.documentElement.classList.remove("no-scroll");
            document.body.classList.remove("no-scroll");
        }

        triggers.forEach((btn) => btn.addEventListener("click", open));
        if (closeBtn) closeBtn.addEventListener("click", close);

        modal.addEventListener("click", function (e) {
            if (e.target === modal) close();
        });

        return { open, close };
    }

    initModal({
        modalId: "projectModal",
        closeId: "projectModalClose",
        triggerSelector: ".project-modal-trigger"
    });

    initModal({
        modalId: "realtorModal",
        closeId: "realtorModalClose",
        triggerSelector: ".realtor-modal-trigger"
    });

    /* REALTOR / QUOTE BUILDER */
    const serviceOptions = document.querySelectorAll(".service-option");
    const quoteTotalEl = document.getElementById("quoteTotalValue");

    function updateQuoteTotal() {
        let total = 0;
        serviceOptions.forEach((opt) => {
            const checkbox = opt.querySelector('input[type="checkbox"]');
            if (!checkbox) return;
            if (checkbox.checked) {
                total += parseInt(checkbox.value, 10) || 0;
                opt.classList.add("selected");
            } else {
                opt.classList.remove("selected");
            }
        });
        if (quoteTotalEl) quoteTotalEl.textContent = `$${total}`;
    }

    serviceOptions.forEach((opt) => {
        const checkbox = opt.querySelector('input[type="checkbox"]');
        if (!checkbox) return;
        checkbox.addEventListener("change", updateQuoteTotal);
    });

    const quoteContinueBtn = document.getElementById("quoteContinueBtn");
    if (quoteContinueBtn) {
        quoteContinueBtn.addEventListener("click", function () {
            const selected = [];
            serviceOptions.forEach((opt) => {
                const checkbox = opt.querySelector('input[type="checkbox"]');
                if (checkbox && checkbox.checked) {
                    selected.push({ name: checkbox.dataset.name, price: checkbox.value });
                }
            });
            console.log("Realtor quote — selected services:", selected, "Total:", quoteTotalEl ? quoteTotalEl.textContent : "$0");
        });
    }

});

// --- Fit oversized Google Apps Script form into modal iframe ---
document.addEventListener('DOMContentLoaded', function () {
  var DESIGN_WIDTH = 460;
  var wrap = document.querySelector('.gform-embed-wrap');
  var iframe = document.getElementById('projectFormIframe');
  if (!wrap || !iframe) return;

  function fitFormIframe() {
    var containerWidth = wrap.clientWidth;
    var containerHeight = wrap.clientHeight;
    if (!containerWidth || !containerHeight) return;
    var scale = containerWidth / DESIGN_WIDTH;

    iframe.style.width = DESIGN_WIDTH + 'px';
    iframe.style.height = (containerHeight / scale) + 'px';
    iframe.style.zoom = scale;
  }

  fitFormIframe();
  window.addEventListener('resize', fitFormIframe);

  var modal = document.getElementById('projectModal');
  if (modal) {
    new MutationObserver(fitFormIframe).observe(modal, { attributes: true, attributeFilter: ['class'] });
  }
});

function fitFormIframe() {
    var containerWidth = wrap.clientWidth;
    var containerHeight = wrap.clientHeight;
    if (!containerWidth || !containerHeight) return;
    var scale = Math.min(containerWidth / DESIGN_WIDTH, 1.15);

    iframe.style.width = DESIGN_WIDTH + 'px';
    iframe.style.height = (containerHeight / scale) + 'px';
    iframe.style.zoom = scale;
}