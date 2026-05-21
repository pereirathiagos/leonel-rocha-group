/* =========================================================
   Leonel Rocha Broker - Scripts principais
   Menu, animações, navegação ativa e envio para WhatsApp.
========================================================= */

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const sections = document.querySelectorAll("section[id]");

// Menu mobile
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

// Abas da consultoria
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const targetId = button.dataset.tab;

        tabButtons.forEach((item) => {
            const isActive = item === button;

            item.classList.toggle("active", isActive);
            item.setAttribute("aria-selected", String(isActive));
        });

        tabPanels.forEach((panel) => {
            const isActive = panel.id === targetId;

            panel.classList.toggle("active", isActive);
            panel.hidden = !isActive;
        });
    });
});

// Animações suaves de entrada
const animatedItems = document.querySelectorAll(
    ".observe-section, .pain-card, .solution-card"
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.14 });

animatedItems.forEach((item) => revealObserver.observe(item));

// Cabeçalho e link ativo
const updateHeaderState = () => {
    if(header){
        header.classList.toggle("is-scrolled", window.scrollY > 30);
    }
};

const updateActiveLink = () => {
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const id = section.getAttribute("id");

        if(window.scrollY >= sectionTop){
            navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
        }
    });
};

const handleScroll = () => {
    updateHeaderState();
    updateActiveLink();
};

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

// Formulário direcionando para WhatsApp
const contactForm = document.querySelector(".contact-form");

if(contactForm){
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = new FormData(contactForm);
        const message = encodeURIComponent(
            `Olá, gostaria de solicitar uma consultoria para meu empreendimento.\n\nNome: ${data.get("nome")}\nWhatsApp: ${data.get("telefone")}\nCondomínio/empresa: ${data.get("empresa") || "Não informado"}\nNecessidade: ${data.get("servico")}\nMensagem: ${data.get("mensagem") || "Não informado"}`
        );

        const button = contactForm.querySelector("button");

        contactForm.classList.add("sent");
        button.textContent = "Abrindo WhatsApp...";

        window.open(`https://wa.me/5564999999999?text=${message}`, "_blank", "noopener");

        setTimeout(() => {
            button.textContent = "Solicitar consultoria";
            contactForm.classList.remove("sent");
        }, 2400);
    });
}

// Voltar ao topo
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
