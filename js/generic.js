
// JavaScript genérico
// ---------------------------------------------------------------------------

// Hover menu elements (header)

const navLinks = document.querySelectorAll('.nav_link');
let touch = false;
let timer = null;

navLinks.forEach(link => {

    link.addEventListener('mouseover', () => { /* Cuando se hace hover sobre los menús */
        if(timer) {
            clearTimeout(timer);
        };
         
        touch = true;
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });

    link.addEventListener('mouseout', () => { /* Cuando se quita el hover de los menús */
        if(!link.classList.contains("selected")) {
            link.classList.remove('active');
        };
        
        timer = setTimeout(() => {
            touch = false;

            if(touch === false) {
                navLinks.forEach(l => {
                    if(l.classList.contains("selected")) {
                        l.classList.add('active');
                    };
                });
            };
        }, 600);
    });
});

// Abrir menú hamburguesa (desplegable)

const menu_hamburguesa = document.querySelector('.hamburguer_menu');
const overlay = document.querySelector(".hamburguer_overlay");

if(menu_hamburguesa) {
    menu_hamburguesa.addEventListener("click", () => {
        console.log("Abriendo o cerrando menú hamburguesa");
        overlay.classList.toggle("activo");
        document.body.classList.toggle("menu_abierto");
    });
};

// Redirección a la página principal al hacer click en el logo

const logoPrincipal = document.querySelector(".header_logo");
const overlayLogo = document.querySelector(".overlay_logo");

logoPrincipal.addEventListener("click", () => {
    if(window.location.pathname.includes("index.html")) {
        window.location.href = "index.html";
    }else {
        window.location.href = "/index.html";
    };
});

overlayLogo.addEventListener("click", () => {
    if(window.location.pathname.includes("index.html")) {
        window.location.href = "index.html";
    }else {
        window.location.href = "/index.html";
    };
});

// Flecha para volver al inicio de la página

const flecha_arriba = document.getElementById("arrow_up");
const scrollElement = document.documentElement.scrollTop ? document.documentElement : document.body;

flecha_arriba.addEventListener("click", () => {

  scrollElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

let scrollTimeout;

scrollElement.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    flecha_arriba.style.transition = "opacity 0.5s ease";

    if(scrollTop > 100) {
        flecha_arriba.style.opacity = 1;
        flecha_arriba.style.pointerEvents = "auto";

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            flecha_arriba.style.opacity = 0;
            flecha_arriba.style.pointerEvents = "none";
        }, 2000);
    }else {
        flecha_arriba.style.opacity = 0;
        flecha_arriba.style.pointerEvents = "none";
    };
});

function TestScrollTop() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    flecha_arriba.style.transition = "none";

    if(scrollTop > 100) {
        flecha_arriba.style.opacity = 1;
        flecha_arriba.style.pointerEvents = "auto";
    }else {
        flecha_arriba.style.opacity = 0;
        flecha_arriba.style.pointerEvents = "none";
    };
}

TestScrollTop();

// Página sobre mí
// ---------------------------------------------------------------------------

// Botones y redirección

if(window.location.pathname.includes("sobre_mi")) {
    const btn_proyectos = document.getElementById("redirect_projects");
    const html_link = document.getElementById("html_link");
    const css_link = document.getElementById("css_link");
    const js_link = document.getElementById("js_link");
    const wordpress_link = document.getElementById("wordpress_link");
    const elementor_link = document.getElementById("elementor_link");
    const figma_link = document.getElementById("figma_link");
    const filmora_link = document.getElementById("filmora_link");
    const imovie_link = document.getElementById("imovie_link");

    btn_proyectos.addEventListener("click", () => {
        window.location.href = "../pages/proyectos.html";
    });

    html_link.addEventListener("click", () => {
        window.open("https://developer.mozilla.org/es/docs/Web/HTML");
    });

    css_link.addEventListener("click", () => {
        window.open("https://developer.mozilla.org/es/docs/Web/CSS");
    });

    js_link.addEventListener("click", () => {
        window.open("https://developer.mozilla.org/es/docs/Web/JavaScript");
    });

    wordpress_link.addEventListener("click", () => {
        window.open("https://wordpress.com/es/");
    });

    elementor_link.addEventListener("click", () => {
        window.open("https://elementor.com/es/");
    });

    figma_link.addEventListener("click", () => {
        window.open("https://www.figma.com");
    });

    filmora_link.addEventListener("click", () => {
        window.open("https://filmora.wondershare.es/");
    });

    imovie_link.addEventListener("click", () => {
        window.open("https://apps.apple.com/es/app/imovie/id377298193");
    });
};

// Página proyectos
// ---------------------------------------------------------------------------

// Desplegable para ordenar proyectos según nombre y fecha

const contenedor = document.getElementById('accordion_buttons');
const botones = document.querySelectorAll('.accordion_button');
const esquema_proyectos = document.getElementById("projects_schema");

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    if (boton.classList.contains('order_selected')) {
      contenedor.classList.toggle('open');
    } else {
      const actual = document.querySelector('.accordion_button.order_selected');
      actual.classList.remove('order_selected');
      boton.classList.add('order_selected');
      contenedor.classList.remove('open');

      ordenarProyectos(boton.id);
    };
  });
});

function ordenarProyectos(criterio) {
    const proyectos = Array.from(esquema_proyectos.children);

    const proyectosOrdenados = proyectos.sort((a, b) => {
        const fechaA = a.getAttribute('data-date');
        const fechaB = b.getAttribute('data-date');
        const tituloA = a.querySelector('h4')?.textContent.trim().toLowerCase();
        const tituloB = b.querySelector('h4')?.textContent.trim().toLowerCase();

        switch (criterio) {
        case 'button_recent':
            return fechaB.localeCompare(fechaA);
        case 'button_older':
            return fechaA.localeCompare(fechaB);
        case 'button_alphabetic':
            return tituloA.localeCompare(tituloB);
        default:
            return 0;
        }
    });

    esquema_proyectos.innerHTML = '';

    proyectosOrdenados.forEach(proyecto => {
        esquema_proyectos.appendChild(proyecto);
    });
};

// Filtrar por TAG

const filter_buttons = document.querySelectorAll("#filters_box button");
const project_cards = document.querySelectorAll(".project_box");

let activeTags = [];

filter_buttons.forEach(button => {
    button.addEventListener("click", () => {
        const tag = button.textContent.toLowerCase();

        button.classList.toggle("active");

        console.log("Cambio de clase");

        if(activeTags.includes(tag)) {
            activeTags = activeTags.filter(t => t !== tag);
        }else {
            activeTags.push(tag);
        };

        filterProjects();
        updateShownProjects();
    });
});

function filterProjects() {

    project_cards.forEach(card => {
        const cardTags = card.getAttribute("data-tags").toLowerCase().split(",");

        const matches = activeTags.every(tag => cardTags.includes(tag));

        if(matches || activeTags.length === 0) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        };
    });
};

// Actualizar número de proyectos mostrados

function updateShownProjects() {

    const txt_shown = document.getElementById("shown_projects");
    let visible_projects = 0;

    project_cards.forEach(card => {
        const display = getComputedStyle(card).display;
        if(display !== "none") {
            visible_projects++;
        };
    });

    txt_shown.textContent = `Mostrando ${visible_projects} de ${project_cards.length} proyectos`;
};

if(window.location.pathname.endsWith("proyectos")) {
    updateShownProjects();
};

// Abrir proyectos

project_cards.forEach(project => {
    project.addEventListener("click", () => {
        window.location.href = `/pages/projects/${project.getAttribute("data-name")}.html`;
    });
});

// Página contacto
// ---------------------------------------------------------------------------

// Formulario de contacto 

const form = document.getElementById('contact_form');
const feedback = document.getElementById('cf_feedback');
const submitBtn = document.getElementById('cf_submit');

const ENDPOINT = 'https://formspree.io/f/mqalgppg';

if(window.location.pathname.includes("contacto")) {
    form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    submitBtn.disabled = true;
    feedback.textContent = 'Enviando…';

    const formData = {
        name: document.getElementById('cf_name').value.trim(),
        subject: document.getElementById('cf_subject').value.trim(),
        email: document.getElementById('cf_email').value.trim(),
        phone: document.getElementById('cf_phone').value.trim(),
        message: document.getElementById('cf_message').value.trim()
    };

    try {
        const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
        });

        console.log("llegamos hasta aquí");

        if (res.ok) {
        feedback.textContent = '¡Mensaje enviado! Te responderé muy pronto.';
        form.reset();
        } else {
        feedback.textContent = 'Hubo un problema al enviar el mensaje. Inténtalo de nuevo.';
        }
    } catch (err) {
        feedback.textContent = 'Hubo un problema de red. Revisa tu conexión y vuelve a intentarlo.';
    } finally {
        submitBtn.disabled = false;
    }
    });

}

function validateForm(){
  // Limpiar mensajes antiguos
  setError('name', '');
  setError('subject', '');
  setError('email', '');
  setError('phone', '');
  setError('message', '');

  let valid = true;

  const name = document.getElementById('cf_name');
  const subject = document.getElementById('cf_subject');
  const email = document.getElementById('cf_email');
  const phone = document.getElementById('cf_phone');
  const message = document.getElementById('cf_message');

  if (!name.value.trim()){
    setError('name', 'El nombre es obligatorio.');
    valid = false;
  }
  if (!subject.value.trim()){
    setError('subject', 'El asunto es obligatorio.');
    valid = false;
  }
  if (!email.validity.valid){
    setError('email', 'Introduce un correo válido.');
    valid = false;
  }
  if (phone.value.trim() && !phone.checkValidity()){
    setError('phone', 'Introduce un teléfono válido.');
    valid = false;
  }
  if (!message.value.trim()){
    setError('message', 'El mensaje es obligatorio.');
    valid = false;
  }

  return valid;
}

function setError(field, msg){
  const input = document.getElementById(`cf_${field}`);
  const err = document.getElementById(`err_${field}`);
  if (!input || !err) return;
  if (msg){
    input.setAttribute('aria-invalid', 'true');
    err.textContent = msg;
  } else {
    input.removeAttribute('aria-invalid');
    err.textContent = '';
  }
}

// Proyecto New Horizons
// ---------------------------------------------------------------------------

// Enlaces y redirecciones de los botones

if(window.location.pathname.includes("new_horizons.html")) {

    const btn_access_web = document.getElementById("btn_access");
    const btn_design_thinking = document.getElementById("btn_design_thinking");
    const btn_prototype_figma = document.getElementById("btn_prototype_figma");
    const btn_access_web2 = document.getElementById("btn_access2");

    btn_access_web.addEventListener("click", () => {
        window.open("https://new-horizons.netlify.app/");
    });

    btn_design_thinking.addEventListener("click", () => {
        window.open("https://www.figma.com/board/01HRr1YLYWtB9DnUvmsux3/New-Horizons---Design-Thinking?node-id=0-1&t=QaWMTr6I2wI12nmA-1");
    });

    btn_prototype_figma.addEventListener("click", () => {
        window.open("https://www.figma.com/design/kalXQvlhIBGnAZVfmUFA67/New-Horizons?t=QYSgYycL7QGgFZOG-1");
    });

    btn_access_web2.addEventListener("click", () => {
        window.open("https://new-horizons.netlify.app/");
    });
};

if(window.location.pathname.includes("projects/") && !window.location.pathname.endsWith("projects.html")) {

    // Lightbox (ampliar imágenes para una mejor visualización)

    const thumbnails = document.querySelectorAll(".box_screenshot");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.querySelector(".lightbox_img");
    const closeBtn = document.querySelector(".close");
    const arrow_back = document.querySelector(".back_arrow");

    thumbnails.forEach(thumb => {
    thumb.addEventListener("click", () => {
        const img = thumb.querySelector(".screenshot");

        if (img) {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        }
    });
    });

    closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
    });

    // Flecha volver atrás

    arrow_back.addEventListener("click", () => {
        window.history.back();
    });
};

// Proyecto Llibreria Xàtiva
// ---------------------------------------------------------------------------

// Enlaces y redirecciones de los botones

if(window.location.pathname.includes("llibreria_xativa.html")) {

    const btn_watch_video = document.getElementById("btn_access1");
    const btn_watch_video2 = document.getElementById("btn_access2");

    btn_watch_video.addEventListener("click", () => {
        window.open("https://drive.google.com/file/d/1xzwDhOllpcILdZAuqPIVz5ZHr3fJ9COd/view?usp=sharing");
    });

    btn_watch_video2.addEventListener("click", () => {
        window.open("https://drive.google.com/file/d/1xzwDhOllpcILdZAuqPIVz5ZHr3fJ9COd/view?usp=sharing");
    });
};

// Proyecto Festival Carcaixent
// ---------------------------------------------------------------------------

// Enlaces y redirecciones de los botones

if(window.location.pathname.includes("festival_literari_carcaixent.html")) {

    const btn_watch_video = document.getElementById("btn_access1");
    const btn_watch_video2 = document.getElementById("btn_access2");

    btn_watch_video.addEventListener("click", () => {
        window.open("https://drive.google.com/file/d/1TCInmTwu3DRkzKvjCGRDkgNPPAYjFGdS/view?usp=sharing");
    });

    btn_watch_video2.addEventListener("click", () => {
        window.open("https://drive.google.com/file/d/1TCInmTwu3DRkzKvjCGRDkgNPPAYjFGdS/view?usp=sharing");
    });
};

// Proyecto Visual Studio
// ---------------------------------------------------------------------------

// Enlaces y redirecciones de los botones

if(window.location.pathname.includes("visual_studio.html")) {

    const btn_watch_channel = document.getElementById("canal_yt");
    const btn_watch_channel2 = document.getElementById("canal_yt2");
    const btn_watch_instagram = document.getElementById("btn_instagram_vs");

    btn_watch_channel.addEventListener("click", () => {
        window.open("https://www.youtube.com/@visualstudio2679");
    });

    btn_watch_channel2.addEventListener("click", () => {
        window.open("https://www.youtube.com/@visualstudio2679");
    });

    btn_watch_instagram.addEventListener("click", () => {
        window.open("https://www.instagram.com/visualstudiofficial/");
    });
};

// Proyecto Ludofy
// ---------------------------------------------------------------------------

// Enlaces y redirecciones de los botones

if(window.location.pathname.includes("ludofy.html")) {

    const btn_access_web = document.getElementById("btn_access");
    const btn_memory = document.getElementById("btn_memory");
    const btn_access2 = document.getElementById("btn_access2");

    btn_access_web.addEventListener("click", () => {
        window.open("https://www.ludofy.es/");
    });

    btn_memory.addEventListener("click", () => {
        window.open("https://drive.google.com/file/d/15EQ8AS4JLRekqvLnlbzpqpLld23UFjp4/view?usp=sharing");
    });

    btn_access2.addEventListener("click", () => {
        window.open("https://www.ludofy.es/");
    });
};

// Proyecto Skill Swap
// ---------------------------------------------------------------------------

if(window.location.pathname.includes("skill_swap.html")) {

    const btn_prototype_figma = document.getElementById("btn_prototype_figma");
    const btn_design_thinking = document.getElementById("btn_design_thinking");
    const btn_memory = document.getElementById("btn_memory");
    const btn_access2 = document.getElementById("btn_access2");

    btn_prototype_figma.addEventListener("click", () => {
        window.open("https://www.figma.com/design/SLYgGVcd0NYi9rSjVlmdbE/Skill_Swap?node-id=0-1&t=s4BRQjfSlV6v9Mrh-1");
    });

    btn_design_thinking.addEventListener("click", () => {
        window.open("https://www.figma.com/board/0hgPNmACDwa2I7oNikSagW/Skill-Swap---Design-Thinking?node-id=0-1&t=yWv8m0lk0MxehkAe-1");
    });

    btn_memory.addEventListener("click", () => {
        window.open("https://drive.google.com/file/d/1rl8oh5aJsFlsQecjQdkQmFxVHYvVz0h1/view?usp=sharing");
    });

    btn_access2.addEventListener("click", () => {
        window.open("https://www.figma.com/design/SLYgGVcd0NYi9rSjVlmdbE/Skill_Swap?node-id=0-1&t=s4BRQjfSlV6v9Mrh-1");
    });
};

// Proyecto Mg
// ---------------------------------------------------------------------------

if(window.location.pathname.includes("mg.html")) {

    const btn_prototype_figma = document.getElementById("btn_prototype_figma");
    const btn_access = document.getElementById("btn_access");
    const btn_access2 = document.getElementById("btn_access2");

    btn_prototype_figma.addEventListener("click", () => {
        window.open("https://www.figma.com/design/X6g6aMgyiWvaNnUhSc8hBp/Portfolio?node-id=0-1&t=Wn1tmeNL9xbhvpgf-1");
    });

    btn_access.addEventListener("click", () => {
        window.open("https://miguelgisbert.netlify.app/");
    });

    btn_access2.addEventListener("click", () => {
        window.open("https://miguelgisbert.netlify.app/");
    });
};