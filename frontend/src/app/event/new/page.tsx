import styles from '../../page.module.css';
import { EventForm } from '../../components/event-form';
import { Navbar } from '../../components/navbar';

export const metadata = {
  title: 'Cadastro de Evento | CFP Platform',
  description: 'Cadastre o local e a data do evento na plataforma.',
};

export default function EventNewPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Navbar currentPath="/event/new" />

        <header className={styles.header}>
          <span className={styles.badge}>Cadastro de Evento</span>
          <h1 className={styles.title}>CFP Platform</h1>
          <p className={styles.subtitle}>
            Cadastre os dados de local e capacidade para o próximo evento.
          </p>
        </header>

        <section aria-label="Formulário de cadastro de evento" className={styles.content}>
          <EventForm />
        </section>

        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} CFP Platform. Todos os direitos reservados.</p>
        </footer>
      </div>
    </main>
  );
}
