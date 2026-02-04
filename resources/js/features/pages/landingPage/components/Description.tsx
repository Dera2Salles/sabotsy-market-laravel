import fond from '@/assets/grocery.jpg';
import { forwardRef } from 'react';
import { Link } from 'react-scroll';

export const Description = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${fond})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div
        ref={ref}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6 md:px-8"
      >
        <h1 className="text-4xl md:text-7xl font-extrabold mb-4 animate-fade-in-down leading-tight">
          Nous amenons le magasin <br className="hidden md:block" /> à votre porte
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 animate-fade-in-up px-2">
          Obtenez des produits biologiques et des courses durables livrés avec jusqu'à 40 % de réduction.
        </p>
        <Link
          to="productList"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
        >
          <button className="bg-green-600 hover:bg-green-700 cursor-pointer text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up">
            Acheter maintenant
          </button>
        </Link>
      </div>
    </div>
  );
});
