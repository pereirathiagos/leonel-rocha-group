// Menu, navegação e estado do cabeçalho
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const sections = document.querySelectorAll("section[id]");

const closeMenu = () => {
    mainNav.classList.remove("open");
    menuButton.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
};

menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

// Animações suaves de entrada
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

// Contadores animados
const counters = document.querySelectorAll("[data-counter]");

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(!entry.isIntersecting){
            return;
        }

        const element = entry.target;
        const target = Number(element.dataset.counter);
        const suffix = element.nextElementSibling?.textContent?.includes("%") ? "%" : "";
        let value = 0;
        const step = Math.max(1, Math.ceil(target / 70));

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

// Scroll: cabeçalho, link ativo e parallax discreto
const parallaxCards = document.querySelectorAll(".parallax-card");

const handleScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 170;
        const id = section.getAttribute("id");

        if(window.scrollY >= sectionTop){
            navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
        }
    });

    parallaxCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const movement = (window.innerHeight - rect.top) * 0.025;
        card.style.transform = `translateY(${Math.min(18, Math.max(-18, movement))}px)`;
    });
};

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

// Formulário direcionando para WhatsApp
const contactForm = document.querySelector(".contact-form");
const backToTop = document.querySelector(".back-to-top");

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

// Voltar ao topo com rolagem suave
backToTop.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
