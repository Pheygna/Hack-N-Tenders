FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

# Installer les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    bash curl hping3 iputils-ping net-tools coreutils && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Créer un utilisateur limité
RUN useradd -ms /bin/bash trainee

# Définir le dossier de travail
WORKDIR /home/trainee

# Copier le script de démarrage
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# Ajuster les permissions
RUN chown -R trainee:trainee /home/trainee

# Lancer le script au démarrage
USER trainee
ENTRYPOINT ["/bin/bash", "/usr/local/bin/start.sh"]
