document.addEventListener("DOMContentLoaded", () => {
    fetch('/session-info')
        .then(response => {
            if (!response.ok) {
                throw new Error('Réponse non valide de /session-info');
            }
            return response.text();
        })
        .then(text => {
            let data = {};
            try {
                data = JSON.parse(text);
            } catch (err) {
                console.warn("Données JSON invalides :", err);
                return;
            }

            const headerRight = document.querySelector(".header-right");
            const authButtons = document.querySelector(".auth-buttons");

            if (data.loggedIn && headerRight) {
                if (authButtons) authButtons.style.display = "none";

                const profileMenu = document.createElement("div");
                profileMenu.className = "profile-menu";
                profileMenu.innerHTML = `
                    <button class="profile-btn">
                        <img src="https://www.svgrepo.com/show/44094/menu.svg" alt="menu" style="width: 24px; height: 24px; filter: invert(1);">
                    </button>
                    <div class="dropdown-content">
                        <p><strong>Email:</strong> ${data.email}</p>
                        <button class="nav-btn" onclick="location.href='profile.html'">Profil</button>
                        <button class="nav-btn" onclick="location.href='/logout'">Déconnexion</button>
                   </div>
                `;

                // Afficher / cacher le menu au survol
                profileMenu.addEventListener("mouseenter", () => {
                    profileMenu.querySelector(".dropdown-content").style.display = "block";
                });
                profileMenu.addEventListener("mouseleave", () => {
                    profileMenu.querySelector(".dropdown-content").style.display = "none";
                });

                headerRight.appendChild(profileMenu);
            }
        })
        .catch(err => {
            console.error("Erreur lors de la récupération de la session :", err);
        });
});
