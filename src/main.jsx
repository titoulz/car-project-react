/**
 * Point d'entrée principal de l'application React.
 * Ce fichier est responsable du montage de l'application dans le DOM et de la configuration du routage.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router' // Import de la configuration du routeur
import './index.css' // Import des styles globaux (Tailwind CSS)

// Sélectionne l'élément HTML avec l'id 'root' (défini dans index.html)
// et crée une racine React pour y injecter l'application.
createRoot(document.getElementById('root')).render(
  // StrictMode active des vérifications et avertissements supplémentaires en développement.
  // Il ne rend pas d'UI visible mais aide à détecter des problèmes potentiels.
  <StrictMode>
    {/* 
      RouterProvider est le composant qui rend l'application accessible via le routage.
      Il prend en prop 'router' l'objet de configuration défini dans src/router/index.jsx.
    */}
    <RouterProvider router={router} />
  </StrictMode>,
)
