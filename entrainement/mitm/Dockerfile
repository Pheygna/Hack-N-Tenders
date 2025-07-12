FROM debian:bullseye

# Installation outils
RUN apt update && apt install -y bash iputils-ping coreutils net-tools openssl tcpdump

# Scripts
COPY start.sh /root/start.sh
COPY gsh /usr/local/bin/gsh

# Fichiers du scénario MITM
COPY network_capture.txt /opt/mitm/network_capture.txt
COPY fake_cert.pem /opt/mitm/fake_cert.pem
COPY intercepted_login.html /opt/mitm/intercepted_login.html
COPY stolen_credentials.txt /opt/mitm/stolen_credentials.txt
COPY device_config.txt /opt/mitm/device_config.txt
COPY ssl_logs.txt /opt/mitm/ssl_logs.txt
COPY network_traffic.txt /opt/mitm/network_traffic.txt

RUN chmod +x /root/start.sh /usr/local/bin/gsh

WORKDIR /root
CMD cp /opt/mitm/* /tmp/ && bash /root/start.sh
