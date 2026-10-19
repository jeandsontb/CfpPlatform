'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { EventDTO } from '@cfp-platform/shared-types';
import { submitEvent } from '../../services/event-api';
import styles from './event-form.module.css';

export interface EventFormProps {
  onSubmit?: (data: EventDTO) => Promise<unknown> | void;
  initialValues?: Partial<EventDTO>;
  title?: string;
  description?: string;
}

export function EventForm({
  onSubmit = submitEvent,
  initialValues,
  title = 'Cadastro de Local do Evento',
  description = 'Preencha as informações abaixo para cadastrar um novo local e data de evento.',
}: EventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<EventDTO>({
    mode: 'onChange',
    defaultValues: {
      name: initialValues?.name || '',
      address: initialValues?.address || '',
      capacity: initialValues?.capacity || undefined,
      date: initialValues?.date || '',
    },
  });

  const onFormSubmit = async (data: EventDTO) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitErrorMessage('');

    try {
      const payload: EventDTO = {
        ...data,
        capacity: Number(data.capacity),
      };
      await onSubmit(payload);
      setSubmitStatus('success');
      reset();
    } catch (err) {
      setSubmitStatus('error');
      setSubmitErrorMessage(
        err instanceof Error
          ? err.message
          : 'Erro ao cadastrar o evento. Verifique os dados e tente novamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
          id="event-form-success"
        >
          Local do evento cadastrado com sucesso!
        </div>
      )}

      {submitStatus === 'error' && (
        <div
          role="alert"
          aria-live="assertive"
          className={styles.alertError}
          id="event-form-error"
        >
          {submitErrorMessage || 'Erro ao cadastrar o evento. Verifique os dados e tente novamente.'}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        noValidate
        aria-busy={isSubmitting}
        className={styles.form}
      >
        {/* Campo: Nome do Evento */}
        <div className={styles.formGroup}>
          <label htmlFor="event-name" className={styles.label}>
            Nome do Evento <span className={styles.requiredMark}>*</span>
          </label>
          <input
            id="event-name"
            type="text"
            placeholder="Ex: Tech Conference 2025"
            {...register('name', { required: 'O nome do evento é obrigatório' })}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'event-name-error' : undefined}
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            disabled={isSubmitting}
          />
          {errors.name && (
            <span id="event-name-error" role="alert" className={styles.errorMessage}>
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Campo: Endereço */}
        <div className={styles.formGroup}>
          <label htmlFor="event-address" className={styles.label}>
            Endereço <span className={styles.requiredMark}>*</span>
          </label>
          <input
            id="event-address"
            type="text"
            placeholder="Ex: Av. Paulista, 1000 - São Paulo, SP"
            {...register('address', { required: 'O endereço é obrigatório' })}
            aria-required="true"
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? 'event-address-error' : undefined}
            className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
            disabled={isSubmitting}
          />
          {errors.address && (
            <span id="event-address-error" role="alert" className={styles.errorMessage}>
              {errors.address.message}
            </span>
          )}
        </div>

        {/* Campo: Capacidade */}
        <div className={styles.formGroup}>
          <label htmlFor="event-capacity" className={styles.label}>
            Capacidade <span className={styles.requiredMark}>*</span>
          </label>
          <input
            id="event-capacity"
            type="number"
            min="1"
            placeholder="Ex: 500"
            {...register('capacity', {
              required: 'A capacidade é obrigatória',
              min: { value: 1, message: 'A capacidade deve ser de pelo menos 1 pessoa' },
              valueAsNumber: true,
            })}
            aria-required="true"
            aria-invalid={Boolean(errors.capacity)}
            aria-describedby={errors.capacity ? 'event-capacity-error' : undefined}
            className={`${styles.input} ${errors.capacity ? styles.inputError : ''}`}
            disabled={isSubmitting}
          />
          {errors.capacity && (
            <span id="event-capacity-error" role="alert" className={styles.errorMessage}>
              {errors.capacity.message}
            </span>
          )}
        </div>

        {/* Campo: Data */}
        <div className={styles.formGroup}>
          <label htmlFor="event-date" className={styles.label}>
            Data <span className={styles.requiredMark}>*</span>
          </label>
          <input
            id="event-date"
            type="date"
            {...register('date', { required: 'A data do evento é obrigatória' })}
            aria-required="true"
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? 'event-date-error' : undefined}
            className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
            disabled={isSubmitting}
          />
          {errors.date && (
            <span id="event-date-error" role="alert" className={styles.errorMessage}>
              {errors.date.message}
            </span>
          )}
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
              <span>Cadastrando evento...</span>
            </>
          ) : (
            'Cadastrar Evento'
          )}
        </button>
      </form>
    </div>
  );
}

export default EventForm;
