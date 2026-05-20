/* =========================================================
   Leonel Rocha Broker - Scripts principais

   Responsabilidades:
   1. Menu mobile
   2. Animações de entrada
   3. Contadores
   4. Estado do cabeçalho e links ativos
   5. Formulário via WhatsApp
   6. Voltar ao topo
========================================================= */

// 1. Menu mobile
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const sections = document.querySelectorAll("section[id]");

const closeMenu = () => {
    if(!mainNav || !menuButton){
        return;
    }

    mainNav.classList.remove("open");
    menuButton.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
};

if(menuButton && mainNav){
    menuButton.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");

        menuButton.classList.toggle("open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

// 2. Animações de entrada
const animatedItems = document.querySelectorAll(
    ".observe-section, .solution-card, .differential-grid article, .metrics article"
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.16 });

animatedItems.forEach((item) => revealObserver.observe(item));

// 3. Contadores animados
const counters = document.querySelectorAll("[data-counter]");

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(!entry.isIntersecting){
            return;
        }

        const element = entry.target;
        const target = Number(element.dataset.counter);
        const suffix = element.nextElementSibling?.textContent?.includes("%") ? "%" : "";
        const step = Math.max(1, Math.ceil(target / 70));

        let value = 0;

        const tick = () => {
            value = Math.min(target, value + step);
            element.textContent = `${value}${suffix}`;

            if(value < target){
                requestAnimationFrame(tick);
            }
        };

        tick();
        counterObserver.unobserve(element);
    });
}, { threshold: 0.6 });

counters.forEach((counter) => counterObserver.observe(counter));

// 4. Estado do cabeçalho, link ativo e parallax discreto
const parallaxCards = document.querySelectorAll(".parallax-card");

const updateHeaderState = () => {
    if(header){
        header.classList.toggle("is-scrolled", window.scrollY > 40);
    }
};

const updateActiveLink = () => {
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 170;
        const id = section.getAttribute("id");

        if(window.scrollY >= sectionTop){
            navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
        }
    });
};

const updateParallax = () => {
    parallaxCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const movement = (window.innerHeight - rect.top) * 0.025;
        const limitedMovement = Math.min(18, Math.max(-18, movement));

        card.style.transform = `translateY(${limitedMovement}px)`;
    });
};

const handleScroll = () => {
    updateHeaderState();
    updateActiveLink();
    updateParallax();
};

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

// 5. Formulário direcionando para WhatsApp
const contactForm = document.querySelector(".contact-form");

if(contactForm){
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(contactForm);
        const message = encodeURIComponent(
            `Olá, gostaria de falar com um consultor sobre gestão condominial.\n\nNome: ${data.get("nome")}\nWhatsApp: ${data.get("telefone")}\nCondomínio/empresa: ${data.get("empresa") || "Não informado"}\nServiço: ${data.get("servico")}\nMensagem: ${data.get("mensagem") || "Não informado"}`
        );

        contactForm.classList.add("sent");
        contactForm.querySelector("button").textContent = "Abrindo WhatsApp...";

        window.open(`https://wa.me/5564999999999?text=${message}`, "_blank", "noopener");

        setTimeout(() => {
            contactForm.querySelector("button").textContent = "Enviar solicitação";
            contactForm.classList.remove("sent");
        }, 2400);
    });
}

// 6. Voltar ao topo com rolagem suave
const backToTop = document.querySelector(".back-to-top");

if(backToTop){
    backToTop.addEventListener("click", (event) => {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
