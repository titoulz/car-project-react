# Schéma de Base de Données - Projet Location de Voitures

Ce document décrit la structure des données pour la création du Modèle Conceptuel de Données (MCD).

## 1. Table : UTILISATEUR
Stocke les informations des clients et administrateurs.

| Champ (Attribut) | Type | Description | Contraintes |
| :--- | :--- | :--- | :--- |
| **id_user** | INT | Identifiant unique | PRIMARY KEY (PK) |
| nom | VARCHAR(50) | Nom de famille | NOT NULL |
| prenom | VARCHAR(50) | Prénom | NOT NULL |
| email | VARCHAR(100) | Adresse email | UNIQUE, NOT NULL |
| mot_de_passe | VARCHAR(255) | Mot de passe hashé | NOT NULL |
| role | VARCHAR(20) | Rôle de l'utilisateur | DEFAULT 'client' (client, admin, viewer) |

## 2. Table : VOITURE
Stocke le catalogue des véhicules disponibles à la location.

| Champ (Attribut) | Type | Description | Contraintes |
| :--- | :--- | :--- | :--- |
| **id_voiture** | INT | Identifiant unique | PRIMARY KEY (PK) |
| nom_modele | VARCHAR(100) | Nom du modèle (ex: Audi RS3) | NOT NULL |
| categorie | VARCHAR(50) | Catégorie (ex: Sportive, SUV) | NOT NULL |
| prix_journalier | DECIMAL(10,2) | Prix de location par jour | NOT NULL |
| image_url | VARCHAR(255) | Chemin vers l'image | |
| description | TEXT | Description détaillée | |
| puissance | VARCHAR(20) | Puissance moteur (ex: 400 ch) | |
| acceleration | VARCHAR(20) | 0-100 km/h (ex: 3.8s) | |
| transmission | VARCHAR(20) | Type de boîte (ex: Auto) | |
| carburant | VARCHAR(20) | Type de carburant | |

## 3. Table : RESERVATION
Table de liaison enregistrant les locations.

| Champ (Attribut) | Type | Description | Contraintes |
| :--- | :--- | :--- | :--- |
| **id_reservation** | INT | Identifiant unique | PRIMARY KEY (PK) |
| date_creation | DATETIME | Date de la commande | DEFAULT CURRENT_TIMESTAMP |
| **id_user** | INT | Client ayant réservé | FOREIGN KEY (FK) -> UTILISATEUR(id_user) |
| **id_voiture** | INT | Véhicule réservé | FOREIGN KEY (FK) -> VOITURE(id_voiture) |
| dates_reservees | TEXT | Liste des dates (JSON ou CSV) | NOT NULL |
| statut | VARCHAR(20) | État (ex: confirmée, annulée) | DEFAULT 'confirmée' |

## Relations (Cardinalités)

*   **UTILISATEUR** `(1,n)` --- `réserve` ---> `(0,n)` **RESERVATION**
    *   *Un utilisateur peut faire plusieurs réservations.*
    *   *Une réservation appartient à un seul utilisateur.*

*   **VOITURE** `(1,n)` --- `concerne` ---> `(0,n)` **RESERVATION**
    *   *Une voiture peut faire l'objet de plusieurs réservations (à des dates différentes).*
    *   *Une réservation concerne une seule voiture.*
