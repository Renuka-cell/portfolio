document.addEventListener("DOMContentLoaded", function () {

    console.log("Portfolio JavaScript loaded successfully.");

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", function () {

            navbar.classList.toggle("active");

            const isOpen = navbar.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU
    ===================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

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

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =====================================================
       COPY EMAIL
    ===================================================== */

    const copyEmailButtons =
        document.querySelectorAll(".copy-email-btn");

    copyEmailButtons.forEach(function (button) {

        button.addEventListener("click", async function () {

            const email = button.dataset.email;

            try {

                await navigator.clipboard.writeText(email);

                const originalText = button.textContent;

                button.textContent = "Copied!";

                setTimeout(function () {
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
       CONTACT FORM - AJAX SUBMISSION
    ===================================================== */

    const contactForm =
        document.getElementById("contact-form");

    const formMessage =
        document.getElementById("form-message");

    const submitButton =
        document.getElementById("submit-btn");


    console.log("Contact form:", contactForm);
    console.log("Message box:", formMessage);
    console.log("Submit button:", submitButton);


    if (contactForm) {

        contactForm.addEventListener("submit", async function (event) {

            /*
             * VERY IMPORTANT
             *
             * Stop the browser from performing the normal
             * form submission.
             *
             * Therefore the page will NOT redirect to:
             *
             * {"success": true}
             */

            event.preventDefault();

            console.log("Contact form submission intercepted.");


            /* ---------------------------------------------
               Save current scroll position
            --------------------------------------------- */

            const currentScrollPosition = window.scrollY;


            /* ---------------------------------------------
               Clear previous message
            --------------------------------------------- */

            if (formMessage) {

                formMessage.style.display = "none";

                formMessage.textContent = "";

                formMessage.className = "form-message";

            }


            /* ---------------------------------------------
               Disable submit button
            --------------------------------------------- */

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent = "Sending...";

            }


            /* ---------------------------------------------
               Collect form data
            --------------------------------------------- */

            const formData = new FormData(contactForm);


            try {

                console.log("Sending contact form to Django...");


                /* -----------------------------------------
                   Send AJAX request to Django
                ----------------------------------------- */

                const response = await fetch(
                    contactForm.action,
                    {
                        method: "POST",

                        body: formData,

                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                            "Accept": "application/json"
                        }
                    }
                );


                console.log(
                    "Django response status:",
                    response.status
                );


                /* -----------------------------------------
                   Convert response to JSON
                ----------------------------------------- */

                const data = await response.json();


                console.log(
                    "Django response:",
                    data
                );


                /* =================================================
                   SUCCESS
                ================================================= */

                if (data.success) {

                    console.log(
                        "Contact message sent successfully."
                    );


                    if (formMessage) {

                        formMessage.textContent =
                            "Thank you for contacting me! I'll get back to you soon.";

                        formMessage.className =
                            "form-message success";

                        formMessage.style.display =
                            "block";

                    }


                    /*
                     * Clear the form fields.
                     */

                    contactForm.reset();


                    /*
                     * Keep the user at exactly the same
                     * scroll position.
                     */

                    window.scrollTo(
                        0,
                        currentScrollPosition
                    );

                }


                /* =================================================
                   ERROR
                ================================================= */

                else {

                    console.error(
                        "Django returned an error:",
                        data
                    );


                    if (formMessage) {

                        formMessage.textContent =
                            data.message ||
                            "Something went wrong. Please try again.";

                        formMessage.className =
                            "form-message error";

                        formMessage.style.display =
                            "block";

                    }


                    window.scrollTo(
                        0,
                        currentScrollPosition
                    );

                }


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                if (formMessage) {

                    formMessage.textContent =
                        "Unable to send your message right now. Please try again.";

                    formMessage.className =
                        "form-message error";

                    formMessage.style.display =
                        "block";

                }


                window.scrollTo(
                    0,
                    currentScrollPosition
                );

            }


            /* ---------------------------------------------
               Restore submit button
            --------------------------------------------- */

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent = "Send Message";

            }

        });

    } else {

        console.error(
            "ERROR: Contact form was not found."
        );

    }

});