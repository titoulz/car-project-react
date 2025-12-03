# Guide de Présentation : Projet Car-Project-React

Ce document récapitule les points clés techniques à aborder lors de la présentation de votre projet React. Il met en avant les concepts fondamentaux de React utilisés dans l'application.

## 1. Architecture et Outils
*   **Vite** : Expliquez que le projet a été initialisé avec Vite pour un environnement de développement ultra-rapide (HMR - Hot Module Replacement) et un build optimisé.
*   **Structure des dossiers** : Montrez la séparation logique :
    *   `/components` : Les briques réutilisables (Navbar, Footer, CarCard).
    *   `/pages` : Les vues principales (Home, Catalogue, CarDetail).
    *   `/data` : La simulation de base de données (cars.js).

## 2. Le Routing (Navigation SPA)
*   **React Router Dom** : C'est le cœur de la navigation. L'application est une **SPA (Single Page Application)** : on ne recharge jamais la page, on change juste le contenu.
*   **Configuration (`App.jsx`)** : Montrez comment `BrowserRouter`, `Routes` et `Route` définissent l'architecture de navigation.
*   **Routes Dynamiques** : Point important ! Expliquez la route `/cars/:id`.
    *   Le `:id` est un paramètre variable.
    *   Dans `CarDetail.jsx`, on utilise le hook `useParams()` pour récupérer cet ID et afficher la bonne voiture.

## 3. Les Composants et les Props
*   **Réutilisabilité** : Prenez l'exemple de `CarCard.jsx`.
    *   C'est un composant "muet" ou "présentationnel".
    *   Il reçoit une **Prop** (l'objet `car`) depuis son parent (`Catalogue.jsx` ou `Home.jsx`).
    *   Cela permet d'afficher des centaines de voitures avec un seul fichier de code.
*   **JSX** : Rappelez que vous écrivez du HTML-like dans du JavaScript, ce qui permet d'intégrer la logique (comme `.map()` pour les listes) directement dans la vue.

## 4. Les Hooks (La logique de React)
C'est la partie la plus technique. Mettez en avant l'utilisation de :

*   **`useState` (Gestion d'état)** :
    *   *Exemple 1 (Navbar)* : Pour gérer le `darkMode` (vrai/faux). Quand l'état change, React relance le rendu pour mettre à jour l'interface.
    *   *Exemple 2 (CarCard)* : Pour gérer `isAnimating` lors du clic sur "Réserver".
*   **`useEffect` (Effets de bord)** :
    *   *Exemple 1 (Navbar)* : Pour appliquer la classe `.dark` au `html` et sauvegarder la préférence dans le `localStorage` à chaque changement de thème.
    *   *Exemple 2 (CarDetail)* : `window.scrollTo(0, 0)` pour forcer le navigateur à remonter en haut de page lors d'un changement de route.
*   **`useNavigate`** :
    *   Utilisé pour la navigation programmatique (après l'animation de 3 secondes) au lieu d'un lien simple.

## 5. Styling et Animations
*   **Tailwind CSS** : Utilisation de classes utilitaires pour un design rapide et responsive.
*   **Mode Sombre** : Expliquez la configuration dans `index.css` (`@variant dark`) qui permet de basculer les styles dynamiquement.
*   **Animations CSS** : Montrez que les animations complexes (explosion, zoom) sont définies dans `index.css` mais déclenchées par la logique React (ajout de classes conditionnelles).

## 6. Simulation de Données
*   Expliquez que `cars.js` agit comme une API fictive.
*   Dans `Catalogue.jsx`, vous utilisez `carsData.map()` pour transformer ce tableau de données en une liste de composants `CarCard`. C'est le pattern standard d'affichage de listes en React.

---
**Conseil pour la démo :**
Commencez par le visuel (le site qui marche), puis ouvrez le code pour montrer "comment ça marche sous le capot" en suivant ces points. Finissez par la démonstration de l'animation de réservation qui combine State, CSS et Navigation.
