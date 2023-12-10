// app.js
document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("app");

    async function loadView(viewName) {
        const response = await fetch(`/views/${viewName}.html`);
        const viewContent = await response.text();
        return viewContent;
    }
    

    async function changeView(view) {
        const viewContent = await loadView(view);
        app.innerHTML = viewContent;
    }

    const views = {
        home: "home",
        contact: "contact",
        experiencia: "experiencia"
    };

    function handleNavigation(event) {
        if (event.target.tagName === "A") {
            const view = event.target.getAttribute("href").substring(1);
            changeView(view);
        }
    }

    window.addEventListener("hashchange", handleNavigation);

    // Configurar el evento de clic para el navbar
    document.querySelector("nav").addEventListener("click", handleNavigation);

    // Inicializar la aplicación
    handleNavigation({ target: { tagName: "A", getAttribute: () => window.location.hash } });
});


    function enviarFormulario() {
        var form = document.getElementById("contact-form");
        var statusMessage = document.getElementById("status-message");

        var formData = new FormData(form);
        var xhr = new XMLHttpRequest();

        xhr.open("POST", "https://formspree.io/myyqrnbb", true);
        xhr.setRequestHeader("Accept", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;

            if (xhr.status === 200) {
            // La solicitud fue exitosa
            statusMessage.innerHTML = "Missatge enviat, moltes gràcies per contactar amb mi";
            form.reset();
            } else {
            // La solicitud falló
            statusMessage.innerHTML = "Sembla que alguna cosa va malament, torna a provar-ho més tard";
            }
        };

        xhr.send(formData);
        }
