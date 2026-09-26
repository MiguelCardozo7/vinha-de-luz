/* =========================================================
   VINHA DE LUZ
   JavaScript principal
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MENU MOBILE
    ====================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Fechar menu" : "Abrir menu"
            );

        });

        const navLinks = mainNav.querySelectorAll(".nav-link");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            });

        });

    }


    /* =====================================================
       ANO AUTOMÁTICO
    ====================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       DESTACAR SEÇÃO ATUAL NO MENU
    ====================================================== */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    if (sections.length && navLinks.length) {

        const updateActiveLink = () => {

            let currentSection = "inicio";

            const scrollPosition = window.scrollY + 180;

            sections.forEach(section => {

                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionTop + sectionHeight
                ) {
                    currentSection = section.id;
                }

            });

            navLinks.forEach(link => {

                const href = link.getAttribute("href");

                link.classList.toggle(
                    "active",
                    href === `#${currentSection}`
                );

            });

        };

        window.addEventListener(
            "scroll",
            updateActiveLink,
            { passive: true }
        );

        updateActiveLink();

    }


    /* =====================================================
       ACESSIBILIDADE — TAMANHO DO TEXTO
    ====================================================== */

    const decreaseFont = document.getElementById("decreaseFont");
    const resetFont = document.getElementById("resetFont");
    const increaseFont = document.getElementById("increaseFont");

    const FONT_STORAGE_KEY = "vinhaFontSize";

    const applyFontSize = (size) => {

        document.body.classList.remove(
            "font-large",
            "font-extra-large"
        );

        if (size === "large") {
            document.body.classList.add("font-large");
        }

        if (size === "extra-large") {
            document.body.classList.add("font-extra-large");
        }

        localStorage.setItem(FONT_STORAGE_KEY, size);

    };


    const savedFontSize =
        localStorage.getItem(FONT_STORAGE_KEY) || "normal";

    applyFontSize(savedFontSize);


    if (decreaseFont) {

        decreaseFont.addEventListener("click", () => {

            const current = localStorage.getItem(FONT_STORAGE_KEY);

            if (current === "extra-large") {
                applyFontSize("large");
            } else {
                applyFontSize("normal");
            }

        });

    }


    if (resetFont) {

        resetFont.addEventListener("click", () => {

            applyFontSize("normal");

        });

    }


    if (increaseFont) {

        increaseFont.addEventListener("click", () => {

            const current = localStorage.getItem(FONT_STORAGE_KEY);

            if (current === "normal") {
                applyFontSize("large");
            } else {
                applyFontSize("extra-large");
            }

        });

    }


    /* =====================================================
       ALTO CONTRASTE
    ====================================================== */

    const contrastToggle =
        document.getElementById("contrastToggle");

    const CONTRAST_STORAGE_KEY = "vinhaHighContrast";

    const savedContrast =
        localStorage.getItem(CONTRAST_STORAGE_KEY) === "true";

    if (savedContrast) {
        document.body.classList.add("high-contrast");
    }


    if (contrastToggle) {

        contrastToggle.addEventListener("click", () => {

            const enabled =
                document.body.classList.toggle("high-contrast");

            localStorage.setItem(
                CONTRAST_STORAGE_KEY,
                String(enabled)
            );

        });

    }


    /* =====================================================
       HINO — EXPANDIR / RECOLHER
    ====================================================== */

    const hymnMore = document.getElementById("hymnMore");
    const hymnExtra = document.getElementById("hymnExtra");

    if (hymnMore && hymnExtra) {

        hymnMore.addEventListener("click", () => {

            const isOpen =
                hymnExtra.classList.toggle("open");

            hymnMore.textContent =
                isOpen
                    ? "Ocultar hino"
                    : "Ver hino completo";

        });

    }


    /* =====================================================
       ANIMAÇÃO SUAVE AO ENTRAR NA TELA
    ====================================================== */

    const animatedElements = document.querySelectorAll(
        ".quick-card, .activity-card, .pillar-card, .schedule-card, .timeline-item"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.08
            }
        );

        animatedElements.forEach(element => {

            element.style.opacity = "0";
            element.style.transform = "translateY(12px)";
            element.style.transition =
                "opacity .5s ease, transform .5s ease";

            observer.observe(element);

        });

    }


    /* =====================================================
       VOLTAR AO TOPO
    ====================================================== */

    const topLinks = document.querySelectorAll(
        'a[href="#inicio"]'
    );

    topLinks.forEach(link => {

        link.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    });

});


/* =========================================================
   CLASSE VISÍVEL DAS ANIMAÇÕES
========================================================= */

const animationStyle = document.createElement("style");

animationStyle.textContent = `
    .quick-card.visible,
    .activity-card.visible,
    .pillar-card.visible,
    .schedule-card.visible,
    .timeline-item.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

document.head.appendChild(animationStyle);