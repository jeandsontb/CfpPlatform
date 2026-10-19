'use client';

import React from 'react';
import type { SpeakerDTO } from '@cfp-platform/shared-types';
import { useCfpForm, type CfpFormValues } from './use-cfp-form';
import { submitCfp } from '../../services/cfp-api';
import styles from './cfp-form.module.css';

export interface CfpFormProps {
  onSubmit?: (data: SpeakerDTO) => Promise<unknown> | void;
  initialValues?: Partial<CfpFormValues>;
  title?: string;
  description?: string;
}

export function CfpForm({
  onSubmit = submitCfp,
  initialValues,
  title = 'Submissão de Palestra (CFP)',
  description = 'Preencha o formulário abaixo para enviar sua proposta de palestra para o evento.',
}: CfpFormProps) {
  const {
    values,
    touched,
    errors,
    isValid,
    isSubmitting,
    submitStatus,
    submitErrorMessage,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useCfpForm({
    initialValues,
    onSubmit,
  });

  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </header>

      {submitStatus === 'success' && (
        <div
          role="status"
          aria-live="polite"
          className={styles.alertSuccess}
          id="cfp-form-success"
        >
          Proposta de palestra enviada com sucesso! Obrigado pela submissão.
        </div>
      )}

      {submitStatus === 'error' && (
        <div
          role="alert"
          aria-live="assertive"
          className={styles.alertError}
          id="cfp-form-error"
        >
          {submitErrorMessage || 'Erro ao submeter a proposta. Verifique os dados e tente novamente.'}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isSubmitting}
        className={styles.form}
      >
        {/* Campo: Nome Completo */}
        <div className={styles.formGroup}>
          <label htmlFor="speaker-name" className={styles.label}>
            Nome Completo <span className={styles.requiredMark}>*</span>
          </label>
          <input
            id="speaker-name"
            name="name"
            type="text"
            placeholder="Ex: Ana Silva"
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            aria-required="true"
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby={touched.name && errors.name ? 'speaker-name-error' : undefined}
            className={`${styles.input} ${
              touched.name && errors.name ? styles.inputError : ''
            }`}
            disabled={isSubmitting}
          />
          {touched.name && errors.name && (
            <span
              id="speaker-name-error"
              role="alert"
              className={styles.errorMessage}
            >
              {errors.name}
            </span>
          )}
        </div>

        {/* Campo: E-mail */}
        <div className={styles.formGroup}>
          <label htmlFor="speaker-email" className={styles.label}>
            E-mail <span className={styles.requiredMark}>*</span>
          </label>
          <input
            id="speaker-email"
            name="email"
            type="email"
            placeholder="Ex: ana.silva@exemplo.com"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            aria-required="true"
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={touched.email && errors.email ? 'speaker-email-error' : undefined}
            className={`${styles.input} ${
              touched.email && errors.email ? styles.inputError : ''
            }`}
            disabled={isSubmitting}
          />
          {touched.email && errors.email && (
            <span
              id="speaker-email-error"
              role="alert"
              className={styles.errorMessage}
            >
              {errors.email}
            </span>
          )}
        </div>

        {/* Campo: Título da Palestra */}
        <div className={styles.formGroup}>
          <label htmlFor="speaker-talk-title" className={styles.label}>
            Título da Palestra <span className={styles.requiredMark}>*</span>
          </label>
          <input
            id="speaker-talk-title"
            name="talkTitle"
            type="text"
            placeholder="Ex: Arquitetura de Monorepos com Nx e NestJS"
            value={values.talkTitle}
            onChange={(e) => handleChange('talkTitle', e.target.value)}
            onBlur={() => handleBlur('talkTitle')}
            aria-required="true"
            aria-invalid={Boolean(touched.talkTitle && errors.talkTitle)}
            aria-describedby={
              touched.talkTitle && errors.talkTitle
                ? 'speaker-talk-title-error'
                : undefined
            }
            className={`${styles.input} ${
              touched.talkTitle && errors.talkTitle ? styles.inputError : ''
            }`}
            disabled={isSubmitting}
          />
          {touched.talkTitle && errors.talkTitle && (
            <span
              id="speaker-talk-title-error"
              role="alert"
              className={styles.errorMessage}
            >
              {errors.talkTitle}
            </span>
          )}
        </div>

        {/* Campo: Google Developer Expert */}
        <div className={styles.checkboxGroup}>
          <input
            id="speaker-is-gde"
            name="isGDE"
            type="checkbox"
            checked={Boolean(values.isGDE)}
            onChange={(e) => handleChange('isGDE', e.target.checked)}
            className={styles.checkbox}
            disabled={isSubmitting}
          />
          <label htmlFor="speaker-is-gde" className={styles.checkboxLabel}>
            Sou reconhecido como Google Developer Expert (GDE)
          </label>
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          aria-disabled={!isValid || isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              <span>Enviando proposta...</span>
            </>
          ) : (
            'Submeter Palestra'
          )}
        </button>
      </form>
    </div>
  );
}

export default CfpForm;
