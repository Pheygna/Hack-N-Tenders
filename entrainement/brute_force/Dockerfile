FROM debian:11

# Préparer l'environnement
RUN apt-get update && apt-get install -y \
    bash sqlite3 coreutils iputils-ping nano curl

# Créer les fichiers
COPY auth_attempts.log /tmp/auth_attempts.log
COPY common_passwords.txt /tmp/common_passwords.txt
COPY security_summary.txt /tmp/security_summary.txt
COPY gsh /usr/local/bin/gsh
COPY start.sh /root/start.sh
# Rendre exécutable
RUN chmod +x /root/start.sh /usr/local/bin/gsh

WORKDIR /root
# Point d’entrée
CMD ["bash", "/root/start.sh"]
