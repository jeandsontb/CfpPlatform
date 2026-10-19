'use client';

import { useState, useCallback, useMemo } from 'react';
import type { SpeakerDTO } from '@cfp-platform/shared-types';

export type CfpFormValues = Omit<SpeakerDTO, 'id'> & { id?: string };

export type CfpFormField = keyof CfpFormValues;

export type CfpFormErrors = Partial<Record<CfpFormField, string>>;
export type CfpFormTouched = Partial<Record<CfpFormField, boolean>>;

export interface UseCfpFormOptions {
  initialValues?: Partial<CfpFormValues>;
  onSubmit?: (data: SpeakerDTO) => Promise<unknown> | void;
}

export const INITIAL_CFP_FORM_VALUES: CfpFormValues = {
  name: '',
  email: '',
  talkTitle: '',
  isGDE: false,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCfpField(field: CfpFormField, value: unknown): string | null {
  switch (field) {
    case 'name': {
      const strVal = typeof value === 'string' ? value.trim() : '';
      if (!strVal) {
        return 'O nome completo é obrigatório.';
      }
      return null;
    }
    case 'email': {
      const strVal = typeof value === 'string' ? value.trim() : '';
      if (!strVal) {
        return 'O e-mail é obrigatório.';
      }
      if (!EMAIL_REGEX.test(strVal)) {
        return 'Informe um endereço de e-mail válido.';
      }
      return null;
    }
    case 'talkTitle': {
      const strVal = typeof value === 'string' ? value.trim() : '';
      if (!strVal) {
        return 'O título da palestra é obrigatório.';
      }
      return null;
    }
    case 'isGDE':
    case 'id':
    default:
      return null;
  }
}

export function validateCfpForm(values: CfpFormValues): CfpFormErrors {
  const errors: CfpFormErrors = {};

  const nameError = validateCfpField('name', values.name);
  if (nameError) {
    errors.name = nameError;
  }

  const emailError = validateCfpField('email', values.email);
  if (emailError) {
    errors.email = emailError;
  }

  const talkTitleError = validateCfpField('talkTitle', values.talkTitle);
  if (talkTitleError) {
    errors.talkTitle = talkTitleError;
  }

  return errors;
}

export function useCfpForm(options: UseCfpFormOptions = {}) {
  const { initialValues, onSubmit } = options;

  const [values, setValues] = useState<CfpFormValues>(() => ({
    ...INITIAL_CFP_FORM_VALUES,
    ...initialValues,
  }));

  const [touched, setTouched] = useState<CfpFormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);

  const errors = useMemo(() => validateCfpForm(values), [values]);

  const isValid = useMemo(() => {
    return (
      Object.keys(errors).length === 0 &&
      Boolean(values.name?.trim()) &&
      Boolean(values.email?.trim()) &&
      Boolean(values.talkTitle?.trim())
    );
  }, [errors, values]);

  const handleChange = useCallback((field: CfpFormField, value: unknown) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Limpa estado de sucesso/erro anterior ao voltar a digitar
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitErrorMessage(null);
    }
  }, [submitStatus]);

  const handleBlur = useCallback((field: CfpFormField) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setValues({
      ...INITIAL_CFP_FORM_VALUES,
      ...initialValues,
    });
    setTouched({});
    setIsSubmitting(false);
    setSubmitStatus('idle');
    setSubmitErrorMessage(null);
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      setTouched({
        name: true,
        email: true,
        talkTitle: true,
        isGDE: true,
      });

      const currentErrors = validateCfpForm(values);
      if (Object.keys(currentErrors).length > 0) {
        return;
      }

      setIsSubmitting(true);
      setSubmitStatus('idle');
      setSubmitErrorMessage(null);

      try {
        const generatedId =
          values.id ||
          (typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `spk-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);

        const payload: SpeakerDTO = {
          id: generatedId,
          name: values.name.trim(),
          email: values.email.trim(),
          talkTitle: values.talkTitle.trim(),
          isGDE: Boolean(values.isGDE),
        };

        if (onSubmit) {
          await onSubmit(payload);
        }

        setSubmitStatus('success');
        setValues({
          ...INITIAL_CFP_FORM_VALUES,
          ...initialValues,
        });
        setTouched({});
      } catch (err: unknown) {
        setSubmitStatus('error');
        const message =
          err instanceof Error
            ? err.message
            : 'Ocorreu um erro ao submeter sua proposta de palestra.';
        setSubmitErrorMessage(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, onSubmit, initialValues]
  );

  return {
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
    resetForm,
  };
}
