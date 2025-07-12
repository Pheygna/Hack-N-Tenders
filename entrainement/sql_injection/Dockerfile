FROM debian:bullseye

# Installation des utilitaires nécessaires
RUN apt update && apt install -y bash coreutils sqlite3

# Ajout des scripts
COPY start.sh /root/start.sh
COPY gsh /usr/local/bin/gsh

# Ajout des fichiers du scénario SQL Injection
COPY logs_sql.log /opt/sql_injection/logs_sql.log
COPY db.sqlite /opt/sql_injection/db.sqlite
COPY result_exfiltration.txt /opt/sql_injection/result_exfiltration.txt
COPY index.php /opt/sql_injection/index.php

# Droit d'exécution
RUN chmod +x /root/start.sh /usr/local/bin/gsh

WORDIR /root
# Copie des fichiers utiles en runtime dans /tmp/
CMD cp /opt/sql_injection/* /tmp/ && bash /root/start.sh
