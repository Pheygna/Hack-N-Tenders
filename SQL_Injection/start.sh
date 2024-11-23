#!/bin/bash

# Définition des couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

echo -e "${YELLOW}Démarrage de l'entraînement SQL Injection...${NC}"
echo ""

# Étape 1
echo -e "${BLUE}Étape 1 : Lister les tables de la base de données.${NC}"
echo "Commande : sqlite3 training.db '.tables'"
while true; do
    read -p "(SQL-training) $ " cmd
    if [ "$cmd" == "sqlite3 training.db '.tables'" ]; then
        echo -e "${GREEN}Résultat : users${NC}"
        echo -e "${GREEN}Étape 1 complétée. Passez à l'étape 2.${NC}"
        break
    else
        echo -e "${RED}Commande incorrecte. Essayez encore.${NC}"
    fi
done

# Étape 2
echo -e "${BLUE}Étape 2 : Affichez les colonnes de la table 'users'.${NC}"
echo "Commande : sqlite3 training.db '.schema users'"
while true; do
    read -p "(SQL-training) $ " cmd
    if [ "$cmd" == "sqlite3 training.db '.schema users'" ]; then
        echo -e "${GREEN}Résultat : CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL);${NC}"
        echo -e "${GREEN}Étape 2 complétée. Passez à l'étape 3.${NC}"
        break
    else
        echo -e "${RED}Commande incorrecte. Essayez encore.${NC}"
    fi
done

# Étape 3
echo -e "${BLUE}Étape 3 : Affichez les données de la table 'users'.${NC}"
echo "Commande : sqlite3 training.db 'SELECT * FROM users;'"
while true; do
    read -p "(SQL-training) $ " cmd
    if [ "$cmd" == "sqlite3 training.db 'SELECT * FROM users;'" ]; then
        echo -e "${GREEN}Résultat : 1|admin|password123${NC}"
        echo -e "${GREEN}2|user1|welcome1${NC}"
        echo -e "${GREEN}3|user2|welcome2${NC}"
        echo -e "${GREEN}Étape 3 complétée. Entraînement terminé !${NC}"
        break
    else
        echo -e "${RED}Commande incorrecte. Essayez encore.${NC}"
    fi
done
