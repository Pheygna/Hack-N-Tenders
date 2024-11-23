#!/bin/bash

# Définition des couleurs pour le terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # Pas de couleur

# Fichier pour conserver l'état de l'étape
STATE_FILE="/tmp/phishing_training_state"

# Initialisation de l'étape si le fichier n'existe pas
if [[ ! -f "$STATE_FILE" ]]; then
    echo "1" > "$STATE_FILE"
fi

# Fonction pour lire l'étape actuelle
get_current_step() {
    cat "$STATE_FILE"
}

# Fonction pour définir la nouvelle étape
set_current_step() {
    echo "$1" > "$STATE_FILE"
}

# Message de bienvenue
echo -e "${BLUE}=== Bienvenue dans l'entraînement au phishing ===${NC}"
echo "Suivez les consignes pour progresser dans les étapes."
echo ""

# Lancement des étapes interactives
PROMPT_COMMAND='check_command'

# Fonction pour vérifier les commandes exécutées
check_command() {
    current_step=$(get_current_step)
    case $current_step in
        1)
            if [[ "$BASH_COMMAND" =~ ^cat\ suspect_email\.txt$ ]]; then
                echo -e "${GREEN}📧 Contenu de suspect_email.txt :${NC}"
                echo "De : support@fakebank.com"
                echo "À : employe@entreprise.com"
                echo "Objet : Mise à jour de votre compte"
                echo "Message : Cliquez ici pour sécuriser votre compte : http://fakebank-login.com"
                echo -e "${GREEN}✅ Étape 1 complétée. Passez à l'étape 2.${NC}"
                set_current_step 2
                echo "╔══════════════════════════════════════════════╗"
                echo "║ Étape 2 : Récupérez le contenu du site.             ║"
                echo "║  Commande : curl http://fakebank-login.com          ║"
                echo "╚══════════════════════════════════════════════╝"
            fi
            ;;
        2)
            if [[ "$BASH_COMMAND" =~ ^curl\ http://fakebank-login\.com$ ]]; then
                echo -e "${GREEN}🔒 Contenu récupéré depuis http://fakebank-login.com :${NC}"
                echo "<html><body>Phishing réussi ! Vos identifiants sont compromis.</body></html>"
                echo -e "${GREEN}✅ Étape 2 complétée. Passez à l'étape 3.${NC}"
                set_current_step 3
                echo "╔══════════════════════════════════════════════╗"
                echo "║ Étape 3 : Rédigez un fichier de prévention.           ║"
                echo "║  Commande : echo 'Ne cliquez pas sur des liens suspects.' > prevention.txt ║"
                echo "╚══════════════════════════════════════════════╝"
            fi
            ;;
        3)
            if [[ "$BASH_COMMAND" =~ ^echo\ \'Ne\ cliquez\ pas\ sur\ des\ liens\ suspects.\'\ \>\ prevention\.txt$ ]]; then
                echo -e "${GREEN}✅ Étape 3 complétée. Passez à l'étape 4.${NC}"
                set_current_step 4
                echo "╔══════════════════════════════════════════════╗"
                echo "║ Étape 4 : Créez un fichier de logs suspects.        ║"
                echo "║  Commande : touch logs/suspicious.log               ║"
                echo "╚══════════════════════════════════════════════╝"
            fi
            ;;
        4)
            if [[ "$BASH_COMMAND" =~ ^touch\ logs/suspicious\.log$ ]]; then
                echo -e "${GREEN}✅ Étape 4 complétée. Passez à l'étape 5.${NC}"
                set_current_step 5
                echo "╔══════════════════════════════════════════════╗"
                echo "║ Étape 5 : Vérifiez les permissions du dossier logs.  ║"
                echo "║  Commande : ls -l logs                           ║"
                echo "╚══════════════════════════════════════════════╝"
            fi
            ;;
        5)
            if [[ "$BASH_COMMAND" =~ ^ls\ -l\ logs$ ]]; then
                echo -e "${GREEN}📜 Permissions des fichiers logs vérifiées !${NC}"
                echo -e "${GREEN}✅ Félicitations ! Vous avez complété l'entraînement au phishing.${NC}"
                rm -f "$STATE_FILE"
                unset PROMPT_COMMAND
            fi
            ;;
    esac
}

# Instructions initiales
if [[ $(get_current_step) -eq 1 ]]; then
    echo "╔══════════════════════════════════════════════╗"
    echo "║ Étape 1 : Analysez le fichier suspect_email.txt.      ║"
    echo "║  Commande : cat suspect_email.txt                      ║"
    echo "╚══════════════════════════════════════════════╝"
fi

# Lancer un shell interactif
exec bash
