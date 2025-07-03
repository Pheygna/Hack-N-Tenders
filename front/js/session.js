document.addEventListener("DOMContentLoaded", () => {
    fetch('/session-info')
        .then(response => {
            if (!response.ok) {
                throw new Error('Réponse non valide de /session-info');
            }
            return response.text(); // D'abord lire comme texte brut
        })
        .then(text => {
            let data = {};
            try {
                data = JSON.parse(text);
            } catch (err) {
                console.warn("Données JSON invalides :", err);
                return; // Stop si JSON cassé
            }

            const headerRight = document.querySelector(".header-right");
            const authButtons = document.querySelector(".auth-buttons");

            if (data.loggedIn && headerRight) {
                if (authButtons) authButtons.style.display = "none";

                const profileMenu = document.createElement("div");
                profileMenu.className = "profile-menu";
                profileMenu.innerHTML = `
		    <button class="profile-btn">${data.username} ⌄</button>
		    <div class="dropdown-content">
		        <p><strong>Email:</strong> ${data.email}</p>
		        <a href="/profile.html">Profil</a>
		        <a href="/logout" class="logout-link">Se déconnecter</a>
		    </div>
		`;

                headerRight.appendChild(profileMenu);

                // Toggle menu on click
                document.getElementById("profile-toggle").addEventListener("click", () => {
                    const menu = document.getElementById("dropdown-menu");
                    menu.classList.toggle("show-dropdown");
                });

                // Fermer si clic en dehors
                document.addEventListener("click", (event) => {
                    const toggleBtn = document.getElementById("profile-toggle");
                    const dropdown = document.getElementById("dropdown-menu");

                    if (!toggleBtn.contains(event.target) && !dropdown.contains(event.target)) {
                        dropdown.classList.remove("show-dropdown");
                    }
                });
            }
        })
        .catch(err => {
            console.error("Erreur lors de la récupération de la session :", err);
        });
});
