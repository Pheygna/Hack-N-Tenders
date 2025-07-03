FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

# Installer les outils nécessaires en une seule couche propre
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        bash \
        curl \
        coreutils \
        iputils-ping && \
    rm -rf /var/lib/apt/lists/*

# Créer un utilisateur limité et définir le dossier de travail
RUN useradd -ms /bin/bash trainee
WORKDIR /home/trainee

# Copier les fichiers et ajuster les permissions
COPY start.sh /usr/local/bin/start.sh
COPY suspect_email.txt ./suspect_email.txt
RUN chmod +x /usr/local/bin/start.sh && \
    chown -R trainee:trainee /home/trainee /usr/local/bin/start.sh

# Passer à l'utilisateur non privilégié
USER trainee

# Commande de lancement
ENTRYPOINT ["/bin/bash", "/usr/local/bin/start.sh"]
