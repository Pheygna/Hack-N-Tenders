FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        sqlite3 bash && \
    rm -rf /var/lib/apt/lists/*

RUN useradd -ms /bin/bash trainee
WORKDIR /home/trainee

COPY setup.sql /home/trainee/setup.sql
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh && \
    chown -R trainee:trainee /home/trainee /usr/local/bin/start.sh

USER trainee

ENTRYPOINT ["/bin/bash", "/usr/local/bin/start.sh"]
