import Link from 'next/link';
import styles from '../page.module.css';
import { CfpDashboard } from '../components/cfp-dashboard';

export const metadata = {
  title: 'Dashboard de Palestras | CFP Platform',
  description: 'Consulte e acompanhe as propostas de palestras submetidas para o evento.',
};

export default function DashboardPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <nav aria-label="Navegação superior" className={styles.navBar}>
          <Link href="/" className={styles.navLink}>
            ← Voltar ao Formulário
          </Link>
        </nav>

        <header className={styles.header}>
          <span className={styles.badge}>Painel de Controle</span>
          <h1 className={styles.title}>Dashboard CFP</h1>
          <p className={styles.subtitle}>
            Acompanhe em tempo real todas as propostas de palestras enviadas para nosso evento.
          </p>
        </header>

        <section aria-label="Listagem de palestras" className={styles.content}>
          <CfpDashboard />
        </section>

        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} CFP Platform. Todos os direitos reservados.</p>
        </footer>
      </div>
    </main>
  );
}
