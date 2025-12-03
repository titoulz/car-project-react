export const carsData = [ // Exporte le tableau de données des voitures pour l'utiliser dans l'application
    { // Début de l'objet représentant l'Audi R8
        id: 1, // Identifiant unique de la voiture
        name: "Audi R8", // Nom du modèle
        category: "Supercar", // Catégorie du véhicule
        price: "946€", // Prix de location
        priceUnit: "/mois", // Périodicité du prix
        image: "/assets/audi.png", // Chemin vers l'image du véhicule
        specs: { // Objet contenant les caractéristiques techniques
            power: "570 ch", // Puissance du moteur
            acceleration: "0-100: 3.4s", // Temps d'accélération 0-100 km/h
            transmission: "Automatique", // Type de boîte de vitesses
            seats: "2 places", // Nombre de sièges
            fuel: "Essence" // Type de carburant
        },
        description: "L'Audi R8 incarne la sportivité à l'état pur. Avec son moteur V10 atmosphérique rugissant, elle offre des sensations de conduite inégalées. Son design affûté et sa technologie de pointe en font une véritable bête de course homologuée pour la route.", // Description détaillée
        features: ["Moteur V10", "Virtual Cockpit", "Transmission Quattro", "Sièges baquets"] // Liste des équipements principaux
    },
    { // Début de l'objet représentant la BMW M3
        id: 2, // Identifiant unique
        name: "BMW M3", // Nom du modèle
        category: "Berline Sportive", // Catégorie
        price: "495€", // Prix
        priceUnit: "/mois", // Unité
        image: "/assets/bm.png", // Image
        specs: { // Caractéristiques techniques
            power: "510 ch", // Puissance
            acceleration: "0-100: 3.9s", // Accélération
            transmission: "Automatique", // Transmission
            seats: "5 places", // Places
            fuel: "Essence" // Carburant
        },
        description: "La BMW M3 est la référence des berlines sportives. Alliant polyvalence au quotidien et performances sur circuit, elle séduit par son agilité et son moteur 6 cylindres en ligne biturbo. Un équilibre parfait entre confort et radicalité.", // Description
        features: ["M Drive Professional", "Sièges M Carbon", "Affichage tête haute", "Différentiel M Sport"] // Équipements
    },
    { // Début de l'objet représentant la Lamborghini Huracan STO
        id: 3, // Identifiant unique
        name: "Lamborghini Huracan STO", // Nom du modèle
        category: "Supercar", // Catégorie
        price: "Sur devis", // Prix
        priceUnit: "/jour", // Unité
        image: "/assets/lambo.png", // Image
        specs: { // Caractéristiques techniques
            power: "640 ch", // Puissance
            acceleration: "0-100: 3.0s", // Accélération
            transmission: "Automatique", // Transmission
            seats: "2 places", // Places
            fuel: "Essence" // Carburant
        },
        description: "La Lamborghini Huracán STO (Super Trofeo Omologata) est une voiture de course homologuée pour la route. Inspirée de l'héritage de la course automobile de Lamborghini Squadra Corse, elle offre une aérodynamique extrême et une dynamique de conduite ultra-précise.", // Description
        features: ["Aérodynamique active", "Freins CCM-R", "Mode de conduite STO", "Carrosserie carbone"] // Équipements
    },
    { // Début de l'objet représentant le Mercedes G63 AMG
        id: 4, // Identifiant unique
        name: "Mercedes G63 AMG", // Nom du modèle
        category: "SUV Légendaire", // Catégorie
        price: "3284€", // Prix
        priceUnit: "/mois", // Unité
        image: "/assets/multipla.png", // Image (Note: le nom du fichier semble incorrect 'multipla.png' pour un G63, mais c'est le code existant)
        specs: { // Caractéristiques techniques
            power: "585 ch", // Puissance
            acceleration: "0-100: 4.5s", // Accélération
            transmission: "Automatique", // Transmission
            seats: "5 places", // Places
            fuel: "Essence" // Carburant
        },
        description: "L'icône du tout-terrain. Le Mercedes-AMG G 63 impressionne par sa puissance expressive et son design intemporel. Son moteur V8 biturbo AMG de 4,0 litres délivre une puissance phénoménale, tandis que son intérieur offre un luxe moderne et une technologie de pointe.", // Description
        features: ["Échappement AMG Performance", "Blocages de différentiel", "Widescreen Cockpit", "Sièges multicontours"] // Équipements
    },
    { // Début de l'objet représentant la Bentley Continental GT
        id: 5, // Identifiant unique
        name: "Bentley Continental GT", // Nom du modèle
        category: "Grand Tourisme", // Catégorie
        price: "1533€", // Prix
        priceUnit: "/mois", // Unité
        image: "/assets/audi.png", // Image (Note: image réutilisée 'audi.png')
        specs: { // Caractéristiques techniques
            power: "550 ch", // Puissance
            acceleration: "0-100: 4.0s", // Accélération
            transmission: "Automatique", // Transmission
            seats: "4 places", // Places
            fuel: "Essence" // Carburant
        },
        description: "La Bentley Continental GT est la définition même du Grand Tourisme. Elle allie un savoir-faire artisanal exceptionnel à des performances de supercar. Chaque détail a été pensé pour offrir un confort absolu et une expérience de conduite exaltante.", // Description
        features: ["Cuir capitonné", "Placages bois précieux", "Système audio Naim", "Écran rotatif Bentley"] // Équipements
    },
    { // Début de l'objet représentant la Ferrari Roma
        id: 6, // Identifiant unique
        name: "Ferrari Roma", // Nom du modèle
        category: "Coupé Sport", // Catégorie
        price: "2100€", // Prix
        priceUnit: "/mois", // Unité
        image: "/assets/ferrari.png", // Image
        specs: { // Caractéristiques techniques
            power: "620 ch", // Puissance
            acceleration: "0-100: 3.4s", // Accélération
            transmission: "Automatique", // Transmission
            seats: "2+2 places", // Places
            fuel: "Essence" // Carburant
        },
        description: "La Ferrari Roma, avec son design intemporel et raffiné, incarne la 'Dolce Vita' contemporaine. Ce coupé 2+2 à moteur central avant offre des performances de premier ordre et une élégance pure, typique de la marque au cheval cabré.", // Description
        features: ["Manettino 5 positions", "Écran passager", "Phares Matrix LED", "Cockpit numérique"] // Équipements
    },
    { // Début de l'objet représentant l'Audi RS3
        id: 7, // Identifiant unique
        name: "Audi RS3", // Nom du modèle
        category: "Sportive Compacte", // Catégorie
        price: "850€", // Prix
        priceUnit: "/mois", // Unité
        image: "/assets/RS3.png", // Image
        specs: { // Caractéristiques techniques
            power: "400 ch", // Puissance
            acceleration: "0-100: 3.8s", // Accélération
            transmission: "Automatique", // Transmission
            seats: "5 places", // Places
            fuel: "Essence" // Carburant
        },
        description: "L'Audi RS3 Sportback est la référence absolue de sa catégorie. Son légendaire moteur 5 cylindres 2.5 TFSI offre une sonorité unique et des performances explosives, le tout avec la polyvalence d'une compacte 5 portes.", // Description
        features: ["Moteur 5 cylindres", "RS Torque Splitter", "Virtual Cockpit RS", "Matrix LED"] // Équipements
    },
    { // Début de l'objet représentant la Volkswagen Golf 8 R
        id: 8, // Identifiant unique
        name: "Volkswagen Golf 8 R", // Nom du modèle
        category: "Compacte Sportive", // Catégorie
        price: "650€", // Prix
        priceUnit: "/mois", // Unité
        image: "/assets/golf8r.png", // Image
        specs: { // Caractéristiques techniques
            power: "320 ch", // Puissance
            acceleration: "0-100: 4.7s", // Accélération
            transmission: "Automatique", // Transmission
            seats: "5 places", // Places
            fuel: "Essence" // Carburant
        },
        description: "La Volkswagen Golf 8 R est la plus puissante des Golf de série. Avec sa transmission intégrale 4MOTION et son mode Drift, elle offre une efficacité redoutable et un plaisir de conduite intense, tout en restant parfaitement utilisable au quotidien.", // Description
        features: ["Transmission 4MOTION", "Mode Drift", "Digital Cockpit Pro", "Échappement Akrapovič"] // Équipements
    },
    { // Début de l'objet représentant la Mercedes-AMG C63 S
        id: 9, // Identifiant unique
        name: "Mercedes-AMG C63 S", // Nom du modèle
        category: "Berline Hybride Performance", // Catégorie
        price: "1200€", // Prix
        priceUnit: "/mois", // Unité
        image: "/assets/C63AMG.png", // Image
        specs: { // Caractéristiques techniques
            power: "680 ch", // Puissance
            acceleration: "0-100: 3.4s", // Accélération
            transmission: "Automatique", // Transmission
            seats: "5 places", // Places
            fuel: "Hybride" // Carburant
        },
        description: "La nouvelle Mercedes-AMG C 63 S E PERFORMANCE change la donne. Avec sa technologie hybride issue de la Formule 1, elle combine un moteur 4 cylindres le plus puissant au monde avec un moteur électrique pour une puissance système phénoménale de 680 ch.", // Description
        features: ["Technologie E PERFORMANCE", "Roues arrière directrices", "AMG Real Performance Sound", "MBUX"] // Équipements
    }
];
