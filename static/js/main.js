document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            navbar.classList.toggle("active");

            const isOpen = navbar.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICKING A LINK
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (navbar) {
                navbar.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");

    const updateActiveNav = () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    };


    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =====================================================
       COPY EMAIL
    ===================================================== */

    const copyEmailButtons =
        document.querySelectorAll(".copy-email-btn");

    copyEmailButtons.forEach((button) => {

        button.addEventListener("click", async () => {

            const email = button.dataset.email;

            try {

                await navigator.clipboard.writeText(email);

                const originalText = button.textContent;

                button.textContent = "Copied!";

                setTimeout(() => {

                    button.textContent = originalText;

                }, 2000);

            } catch (error) {

                console.error(
                    "Unable to copy email:",
                    error
                );

            }

        });

    });


    /* =====================================================
       CONSOLE CONFIRMATION
    ===================================================== */

    console.log(
        "Portfolio JavaScript loaded successfully."
    );

});