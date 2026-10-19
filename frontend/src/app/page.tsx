import Link from 'next/link';
import styles from './page.module.css';
import { CfpForm } from './components/cfp-form';

export default function Index() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <nav aria-label="Navegação superior" className={styles.navBar}>
          <Link href="/dashboard" className={styles.navLink}>
            Ver Palestras Submetidas →
          </Link>
        </nav>

        <header className={styles.header}>
          <span className={styles.badge}>Call for Papers</span>
          <h1 className={styles.title}>CFP Platform</h1>
          <p className={styles.subtitle}>
            Envie sua proposta de palestra para nosso evento de tecnologia.
          </p>
        </header>

        <section aria-label="Formulário de submissão" className={styles.content}>
          <CfpForm />
        </section>

        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} CFP Platform. Todos os direitos reservados.</p>
        </footer>
      </div>
    </main>
  );
}
