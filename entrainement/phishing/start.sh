#!/bin/bash
clear
echo "🎯 Bienvenue dans l'entraînement à la détection de phishing."
echo ""
echo "📩 Un email suspect vous a été signalé."
echo "Votre mission : analyser les indices et répondre aux questions."
echo ""
echo "Pour débuter, utilisez : 'gsh'"
echo ""
echo "Il s'agit d'une commande unique à notre entrainement, elle permet de lancer les étapes"
echo "Pas de panique, si vous ne vous souvenez plus de l'objectif, tapez simplement cette commande 'gsh'"
echo ""

echo "alias cat='cat_and_mark_read'" >> ~/.bashrc
echo '
cat_and_mark_read() {
  /bin/cat "$@"
  if [[ "$@" == "/tmp/suspect_email.txt" ]]; then
    rm -f /tmp/.not_read
  fi
}
' >> ~/.bashrc
source ~/.bashrc


cp /opt/phishing/suspect_email.txt /tmp/
> /tmp/.not_read

cp /opt/phishing/headers.txt /tmp/
cp /opt/phishing/hidden_link.txt /tmp/
cp /opt/phishing/fiche.pdf.fake /tmp/
cp /opt/phishing/auth.log /tmp/
cp /opt/phishing/exfiltration.log /tmp/

bash
