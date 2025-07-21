import { UserButton, useUser } from '@clerk/nextjs';
import { ListTree, Menu, PackagePlus, ShoppingBasket, Warehouse, X, HandHeart, Receipt, LayoutDashboard, Gem } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState, useCallback } from 'react';
import { checkAndAddAssociation } from '../actions';
import Stock from './Stock';

// Barre de navigation principale
const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Liens de navigation
  const navLinks = [
    { href: '/', label: 'Tableau de Bord', icon: LayoutDashboard },
    { href: '/products', label: 'Produits', icon: ShoppingBasket },
    { href: '/new-product', label: 'Nouveau produit', icon: PackagePlus },
    { href: '/category', label: 'Catégories', icon: ListTree },
    { href: '/give', label: 'Donner', icon: HandHeart },
    { href: '/transactions', label: 'Transactions', icon: Receipt },
  ];

  // Ajoute l'utilisateur à l'association si besoin
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress && user.fullName) {
      checkAndAddAssociation(user.primaryEmailAddress.emailAddress, user.fullName);
    }
  }, [user]);

  // Affiche les liens de navigation
  const renderLinks = useCallback((baseClass: string) => (
    <>
      {navLinks.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        const activeClass = isActive ? 'text-accent' : 'btn-ghost';
        return (
          <Link
            href={href}
            key={href}
            className={`${baseClass} ${activeClass} btn-sm flex gap-2 items-center hover:bg-accent`}
            // aria-current={isActive ? 'page' : undefined}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        );
      })}
      <button
        className="btn btn-sm hover:bg-accent"
        onClick={() => (document.getElementById('my_modal_stock') as HTMLDialogElement).showModal()}
        type="button"
        // aria-label="Alimenter le stock"
      >
        <Warehouse className="w-4 h-4" />
        Alimenter le stock
      </button>
    </>
  ), [navLinks, pathname]);

  return (
    <div className="border-b border-base-300 px-5 md:px-[10%] py-4 relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="p-2">
            <Gem className="w-6 h-6 text-accent" />
          </div>
          <span className="font-bold text-xl">
            SS
            <span className="text-accent">Gstock</span>
          </span>
        </div>
        <button
          className="btn w-fit sm:hidden btn-sm"
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="hidden space-x-2 sm:flex items-center">
          {renderLinks('btn')}
          <UserButton />
        </div>
      </div>
      {/* Menu mobile */}
      <div
        className={`absolute top-0 w-full bg-base-100 h-screen flex flex-col gap-2 p-4 transition-all duration-300 sm:hidden z-50 ${menuOpen ? "left-0" : "-left-full"}`}
      >
        <div className="flex justify-between">
          <UserButton />
          <button
            className="btn w-fit sm:hidden btn-sm"
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
            aria-label="Fermer le menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {renderLinks('btn')}
      </div>
      <Stock />
    </div>
  );
};

export default Navbar;
