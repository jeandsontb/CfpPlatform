import styles from '../../page.module.css';
import { CfpForm } from '../../components/cfp-form';
import { Navbar } from '../../components/navbar';

export const metadata = {
  title: 'Cadastro de Palestra | CFP Platform',
  description: 'Envie sua proposta de palestra para o nosso evento de tecnologia.',
};

export default function TalkNewPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Navbar currentPath="/talks/new" />

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
