import Link from 'next/link';
import React from 'react';
import styles from './navbar.module.css';

export interface NavbarProps {
  currentPath?: string;
}

export function Navbar({ currentPath }: NavbarProps) {
  return (
    <nav aria-label="Navegação superior" className={styles.navBar}>
      <Link
        href="/event/new"
        className={`${styles.navLink} ${
          currentPath === '/event/new' ? styles.activeNavLink : ''
        }`}
      >
        Cadastro de Evento
      </Link>
      <Link
        href="/talks/new"
        className={`${styles.navLink} ${
          currentPath === '/talks/new' || currentPath === '/' ? styles.activeNavLink : ''
        }`}
      >
        Cadastro de Palestra
      </Link>
      <Link
        href="/dashboard"
        className={`${styles.navLink} ${
          currentPath === '/dashboard' ? styles.activeNavLink : ''
        }`}
      >
        Dashboard
      </Link>
    </nav>
  );
}

export default Navbar;
