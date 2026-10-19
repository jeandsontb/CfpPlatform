'use client';

import React, { useCallback, useEffect, useState } from 'react';
import type { SpeakerDTO } from '@cfp-platform/shared-types';
import { getCfps } from '../../services/cfp-api';
import styles from './cfp-dashboard.module.css';

export interface CfpDashboardProps {
  fetchData?: () => Promise<SpeakerDTO[]>;
  title?: string;
  description?: string;
}

export function CfpDashboard({
  fetchData = getCfps,
  title = 'Palestras Submetidas (CFP)',
  description = 'Acompanhe as propostas de palestras enviadas pelos palestrantes para o evento.',
}: CfpDashboardProps) {
  const [speakers, setSpeakers] = useState<SpeakerDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadSubmissions = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await fetchData();
      setSpeakers(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Falha ao carregar a lista de palestras.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  return (
    <div
      className={styles.card}
      aria-busy={isLoading}
      aria-label="Painel de palestras submetidas"
    >
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{description}</p>
        </div>

        <div className={styles.actions}>
          {!isLoading && !errorMessage && (
            <span
              className={styles.counterBadge}
              aria-label={`${speakers.length} propostas cadastradas`}
            >
              {speakers.length} {speakers.length === 1 ? 'proposta' : 'propostas'}
            </span>
          )}
          <button
            type="button"
            onClick={loadSubmissions}
            disabled={isLoading}
            className={styles.refreshButton}
            aria-label="Atualizar lista de palestras"
          >
            {isLoading ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                <span>Atualizando...</span>
              </>
            ) : (
              'Atualizar'
            )}
          </button>
        </div>
      </header>

      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className={styles.alertError}
          id="cfp-dashboard-error"
        >
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={loadSubmissions}
            className={styles.retryButton}
          >
            Tentar novamente
          </button>
        </div>
      )}

      {isLoading && (
        <div
          role="status"
          aria-live="polite"
          className={styles.loadingContainer}
          id="cfp-dashboard-loading"
        >
          <span className={styles.spinner} aria-hidden="true" />
          <span>Carregando propostas de palestras...</span>
        </div>
      )}

      {!isLoading && !errorMessage && speakers.length === 0 && (
        <div
          role="status"
          aria-live="polite"
          className={styles.emptyState}
          id="cfp-dashboard-empty"
        >
          <p className={styles.emptyTitle}>Nenhuma palestra submetida até o momento.</p>
          <p className={styles.emptyDescription}>
            Seja o primeiro a enviar uma proposta utilizando o formulário de submissão do CFP!
          </p>
        </div>
      )}

      {!isLoading && !errorMessage && speakers.length > 0 && (
        <ul className={styles.cardsList} aria-label="Lista de palestras submetidas">
          {speakers.map((speaker) => (
            <li key={speaker.id}>
              <article className={styles.speakerCard}>
                <div className={styles.cardTop}>
                  <h3 className={styles.talkTitle}>{speaker.talkTitle}</h3>
                  {speaker.isGDE && (
                    <span
                      className={styles.gdeBadge}
                      aria-label="Google Developer Expert"
                    >
                      GDE
                    </span>
                  )}
                </div>

                <div className={styles.cardDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Palestrante:</span>
                    <span className={styles.speakerName}>{speaker.name}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>E-mail:</span>
                    <a
                      href={`mailto:${speaker.email}`}
                      className={styles.speakerEmail}
                    >
                      {speaker.email}
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CfpDashboard;
