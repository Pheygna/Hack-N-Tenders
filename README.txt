# Hack'N'Tenders - Entraînements Phishing, DDoS et SQL Injection

## Description

Ce projet est un environnement d'entraînement interactif pour apprendre et comprendre les concepts de **Phishing**, **DDoS** et **SQL Injection**. Il offre des consignes interactives et des étapes progressives pour chaque module. Le projet utilise des conteneurs Docker pour créer des environnements isolés.

---

## Prérequis

1. **Systèmes d'exploitation pris en charge** :
   - Linux
   - Windows (via Docker Desktop)
   - MacOS

2. **Logiciels nécessaires** :
   - Docker : [Télécharger Docker](https://www.docker.com/get-started)
   - Node.js : [Télécharger Node.js](https://nodejs.org)
   - Git : [Télécharger Git](https://git-scm.com)

3. **Configuration recommandée** :
   - Docker Compose installé (inclus dans Docker Desktop ou via `apt-get install docker-compose` sous Linux).

---

## Installation

1. **Cloner le projet depuis GitHub** :
   ```bash
   git clone https://github.com/Pheygna/Hack-N-Tenders.git
   cd Hack'N'Tenders
   ```

2. **Construire les images Docker** :
   Si vous avez Docker Compose :
   ```bash
   docker-compose build
   ```
   Sinon, construisez chaque image séparément :
   ```bash
   docker build -t my_image_phishing ./Phishing
   docker build -t my_image_ddos ./DDoS
   docker build -t my_image_sql_injection ./SQL_Injection
   ```

3. **Installer les dépendances Node.js** :
   ```bash
   npm install
   ```

---

## Utilisation

1. **Démarrer le serveur** :
   Lancer le fichier `server.js` avec Node.js :
   ```bash
   node server.js
   ```
   - Le serveur HTTP sera accessible sur : `http://localhost:3000`
   - Le serveur WebSocket sera accessible sur : `ws://localhost:8080`

2. **Accéder à l'interface utilisateur** :
   Ouvrez un navigateur et rendez-vous sur :
   ```plaintext
   http://localhost:3000
   ```

3. **Choisir un module** :
   Vous pouvez naviguer dans les leçons disponibles :
   - **Phishing** : Suivez les consignes dans un terminal Linux-like.
   - **DDoS** : Apprenez à utiliser des outils réseau comme `ping` et `hping3`.
   - **SQL Injection** : Interagissez avec une base de données vulnérable.

4. **Lancer un environnement d'entraînement** :
   Cliquez sur l'un des modules pour lancer un terminal interactif.

---

## Arrêter le projet

1. **Avec Docker Compose** :
   ```bash
   docker-compose down
   ```

2. **Pour arrêter un conteneur spécifique** :
   ```bash
   docker ps   # Notez l'ID du conteneur à arrêter
   docker stop <CONTAINER_ID>
   ```

---

## Structure du projet

- **Phishing/** : Contient le module d'entraînement au phishing.
- **DDoS/** : Contient le module d'entraînement aux attaques DDoS.
- **SQL_Injection/** : Contient le module d'entraînement à l'injection SQL.
- **Front/** : Interface utilisateur (fichiers HTML/CSS).
- **server.js** : Le serveur principal qui gère les WebSockets et les conteneurs Docker.
- **docker-compose.yml** : Configuration pour gérer tous les services avec Docker Compose.

---

## Notes supplémentaires

- **Commandes à tester dans les environnements** :
  - Phishing : Utilisez `cat`, `curl`, `echo`, `ls`, etc.
  - DDoS : Utilisez `ping`, `hping3`, etc.
  - SQL Injection : Interagissez avec une base de données SQLite ou MySQL.

- **Problèmes courants** :
  - Si Docker ne fonctionne pas, assurez-vous que le service est actif avec :
    ```bash
    docker info
    ```
  - Si `npm install` échoue, vérifiez que Node.js est correctement installé.

---

## Auteurs

Ce projet a été développé dans le cadre d'une formation sur la cybersécurité. Pour toute question ou problème, contactez-nous via cgabrieldu13@gmail.com.

--- 

Ce fichier `README.txt` guide les utilisateurs à travers toutes les étapes nécessaires pour installer et utiliser votre projet, tout en fournissant des solutions aux problèmes courants.