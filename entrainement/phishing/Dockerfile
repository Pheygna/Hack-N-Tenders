FROM debian:bullseye

RUN apt update && apt install -y bash coreutils

COPY start.sh /root/start.sh
COPY gsh /usr/local/bin/gsh

COPY suspect_email.txt /opt/phishing/suspect_email.txt
COPY fiche.pdf.fake /opt/phishing/fiche.pdf.fake
COPY hidden_link.txt /opt/phishing/hidden_link.txt
COPY headers.txt /opt/phishing/headers.txt
COPY auth.log /opt/phishing/auth.log
COPY exfiltration.log /opt/phishing/exfiltration.log

RUN chmod +x /root/start.sh /usr/local/bin/gsh

WORKDIR /root
CMD ["bash", "/root/start.sh"]
