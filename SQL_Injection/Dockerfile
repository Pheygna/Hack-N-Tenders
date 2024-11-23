FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

# Installer les dépendances nécessaires
RUN apt-get update && apt-get install -y --no-install-recommends \
    bash sqlite3 coreutils && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Définir le dossier de travail
WORKDIR /app

# Copier le fichier training.db et le script de démarrage
COPY training.db /app/training.db
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# Lancer le script au démarrage
ENTRYPOINT ["/bin/bash", "/usr/local/bin/start.sh"]
