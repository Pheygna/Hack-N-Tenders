FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

# Installer les outils Linux nécessaires
RUN apt-get update && apt-get install -y \
    bash curl coreutils iputils-ping && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Créer un utilisateur limité
RUN useradd -ms /bin/bash trainee

# Définir le répertoire de travail
WORKDIR /home/trainee

# Copier les fichiers nécessaires
COPY start.sh /usr/local/bin/start.sh
COPY suspect_email.txt /home/trainee/suspect_email.txt
RUN chmod +x /usr/local/bin/start.sh

# Ajuster les permissions
RUN chown -R trainee:trainee /home/trainee

# Lancer le script avec un utilisateur limité
USER trainee
ENTRYPOINT ["/bin/bash", "/usr/local/bin/start.sh"]
