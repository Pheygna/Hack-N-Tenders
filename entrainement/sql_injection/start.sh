#!/bin/bash
echo ""
echo "=== Bienvenue dans la simulation d'injection SQL ==="
echo "Une base SQLite vulnérable est prête."
echo "Objectif : exfiltrer tous les utilisateurs via une injection SQL."
echo ""
echo "Étape 1 : Charger la base : sqlite3 training.db < setup.sql"
echo "Étape 2 : Interroger la base : sqlite3 training.db"
echo ""
touch training.db
sqlite3 training.db < setup.sql
exec bash
