#!/bin/bash

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Introduction
echo -e "${BLUE}=== Bienvenue dans l'entraînement DDoS ===${NC}"
echo "Vous allez utiliser des commandes Linux pour simuler une analyse et une réponse à une attaque DDoS."
echo ""

# Étape 1 : Vérifier la connectivité avec la cible
echo "╔══════════════════════════════════════════════════════════╗"
echo "║ Étape 1 : Vérifiez la connectivité avec une cible (ping).      ║"
echo "║ Commande : ping -c 4 127.0.0.1                                ║"
echo "╚══════════════════════════════════════════════════════════╝"

while true; do
  read -p "(DDoS-training) $ " cmd
  if [[ "$cmd" == "ping -c 4 127.0.0.1" ]]; then
    echo ""
    ping -c 4 127.0.0.1
    echo -e "${GREEN}✅ Étape 1 complétée.${NC}"
    break
  else
    echo -e "${RED}❌ Commande incorrecte. Essayez encore.${NC}"
  fi
done

# Étape 2 : Simuler une attaque avec hping3
echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║ Étape 2 : Simulez une attaque SYN avec hping3.                   ║"
echo "║ Commande : hping3 -S -p 80 -c 5 127.0.0.1                        ║"
echo "╚══════════════════════════════════════════════════════════╝"

while true; do
  read -p "(DDoS-training) $ " cmd
  if [[ "$cmd" == "hping3 -S -p 80 -c 5 127.0.0.1" ]]; then
    echo ""
    hping3 -S -p 80 -c 5 127.0.0.1
    echo -e "${GREEN}✅ Étape 2 complétée.${NC}"
    break
  else
    echo -e "${RED}❌ Commande incorrecte. Essayez encore.${NC}"
  fi
done

# Étape 3 : Vérifier les logs de trafic
echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║ Étape 3 : Vérifiez les logs du système (journal de trafic).      ║"
echo "║ Commande : tail -n 10 /var/log/syslog                            ║"
echo "╚══════════════════════════════════════════════════════════╝"

while true; do
  read -p "(DDoS-training) $ " cmd
  if [[ "$cmd" == "tail -n 10 /var/log/syslog" ]]; then
    echo ""
    tail -n 10 /var/log/syslog
    echo -e "${GREEN}✅ Étape 3 complétée.${NC}"
    break
  else
    echo -e "${RED}❌ Commande incorrecte. Essayez encore.${NC}"
  fi
done

# Étape 4 : Configurer un pare-feu avec iptables
echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║ Étape 4 : Bloquez l'IP malveillante avec iptables.               ║"
echo "║ Commande : iptables -A INPUT -s 127.0.0.1 -j DROP               ║"
echo "╚══════════════════════════════════════════════════════════╝"

while true; do
  read -p "(DDoS-training) $ " cmd
  if [[ "$cmd" == "iptables -A INPUT -s 127.0.0.1 -j DROP" ]]; then
    echo ""
    echo -e "${GREEN}🛡️ Pare-feu configuré pour bloquer 127.0.0.1.${NC}"
    echo -e "${GREEN}✅ Étape 4 complétée.${NC}"
    break
  else
    echo -e "${RED}❌ Commande incorrecte. Essayez encore.${NC}"
  fi
done

# Étape 5 : Prévention
echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║ Étape 5 : Documentez les étapes pour la prévention.               ║"
echo "║ Commande : echo 'Prévention : Analyse, logs, pare-feu.' > doc.txt ║"
echo "╚══════════════════════════════════════════════════════════╝"

while true; do
  read -p "(DDoS-training) $ " cmd
  if [[ "$cmd" == "echo 'Prévention : Analyse, logs, pare-feu.' > doc.txt" ]]; then
    echo ""
    echo -e "${GREEN}📄 Document créé : doc.txt.${NC}"
    echo -e "${GREEN}✅ Félicitations ! Vous avez complété l'entraînement DDoS.${NC}"
    break
  else
    echo -e "${RED}❌ Commande incorrecte. Essayez encore.${NC}"
  fi
done

echo ""
echo -e "${BLUE}=== Fin de l'entraînement DDoS ===${NC}"
