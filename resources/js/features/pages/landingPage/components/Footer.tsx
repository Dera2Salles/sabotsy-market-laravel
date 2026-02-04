import { MountainIcon } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-12 px-4 md:px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-start gap-4">
          <a className="flex items-center gap-2" href="#">
            <MountainIcon className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold">SabotsyMarket</span>
          </a>
          <p className="text-gray-300 text-sm">
            Connecter les producteurs locaux aux consommateurs. Frais, local et de saison.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="grid gap-2">
            <h3 className="font-semibold text-lg mb-2">Liens Rapides</h3>
            <a className="hover:underline" href="#">
              Accueil
            </a>
            <a className="hover:underline" href="#">
              Produits
            </a>
            <a className="hover:underline" href="#">
              À Propos
            </a>
            <a className="hover:underline" href="#">
              Contact
            </a>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold text-lg mb-2">Légal</h3>
            <a className="hover:underline" href="#">
              Conditions d'Utilisation
            </a>
            <a className="hover:underline" href="#">
              Politique de Confidentialité
            </a>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-4">
          <div className="flex gap-4">
            <a href="#" className="text-2xl hover:text-yellow-400 transition-colors">
              <FaFacebook />
            </a>
            <a href="#" className="text-2xl hover:text-yellow-400 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="text-2xl hover:text-yellow-400 transition-colors">
              <FaInstagram />
            </a>
          </div>
          <p className="text-gray-300 text-sm mt-4">
            © {new Date().getFullYear()} SabotsyMarket. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};
