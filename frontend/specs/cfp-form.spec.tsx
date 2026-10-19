import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CfpForm } from '../src/app/components/cfp-form';

describe('CfpForm Component', () => {
  describe('Estado inicial limpo e botão bloqueado (Task 4.1)', () => {
    it('deve renderizar todos os campos com valores iniciais limpos', () => {
      render(<CfpForm />);

      const nameInput = screen.getByLabelText(/Nome Completo/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/E-mail/i) as HTMLInputElement;
      const talkTitleInput = screen.getByLabelText(/Título da Palestra/i) as HTMLInputElement;
      const isGdeCheckbox = screen.getByLabelText(/Google Developer Expert/i) as HTMLInputElement;

      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(talkTitleInput.value).toBe('');
      expect(isGdeCheckbox.checked).toBe(false);
    });

    it('deve manter o botão de submissão bloqueado/desabilitado no estado inicial', () => {
      render(<CfpForm />);

      const submitButton = screen.getByRole('button', { name: /Submeter Palestra/i }) as HTMLButtonElement;

      expect(submitButton.disabled).toBe(true);
      expect(submitButton.getAttribute('aria-disabled')).toBe('true');
    });

    it('não deve exibir mensagens de erro antes de qualquer interação do usuário', () => {
      render(<CfpForm />);

      expect(screen.queryByRole('alert')).toBeNull();
      expect(screen.getByLabelText(/Nome Completo/i).getAttribute('aria-invalid')).toBe('false');
      expect(screen.getByLabelText(/E-mail/i).getAttribute('aria-invalid')).toBe('false');
      expect(screen.getByLabelText(/Título da Palestra/i).getAttribute('aria-invalid')).toBe('false');
    });
  });

  describe('Liberação do botão, submissão e acessibilidade WAI-ARIA (Task 4.2)', () => {
    it('deve habilitar o botão de submissão após preenchimento válido de todos os campos obrigatórios', () => {
      render(<CfpForm />);

      const nameInput = screen.getByLabelText(/Nome Completo/i);
      const emailInput = screen.getByLabelText(/E-mail/i);
      const talkTitleInput = screen.getByLabelText(/Título da Palestra/i);
      const submitButton = screen.getByRole('button', { name: /Submeter Palestra/i }) as HTMLButtonElement;

      expect(submitButton.disabled).toBe(true);

      fireEvent.change(nameInput, { target: { value: 'João Palestrante' } });
      expect(submitButton.disabled).toBe(true);

      fireEvent.change(emailInput, { target: { value: 'joao@exemplo.com' } });
      expect(submitButton.disabled).toBe(true);

      fireEvent.change(talkTitleInput, { target: { value: 'Arquiteturas Modernas de Frontend' } });

      expect(submitButton.disabled).toBe(false);
      expect(submitButton.getAttribute('aria-disabled')).toBe('false');
    });

    it('deve desabilitar o botão novamente caso um campo obrigatório seja esvaziado', () => {
      render(<CfpForm />);

      const nameInput = screen.getByLabelText(/Nome Completo/i);
      const emailInput = screen.getByLabelText(/E-mail/i);
      const talkTitleInput = screen.getByLabelText(/Título da Palestra/i);
      const submitButton = screen.getByRole('button', { name: /Submeter Palestra/i }) as HTMLButtonElement;

      fireEvent.change(nameInput, { target: { value: 'João Palestrante' } });
      fireEvent.change(emailInput, { target: { value: 'joao@exemplo.com' } });
      fireEvent.change(talkTitleInput, { target: { value: 'Arquiteturas Modernas' } });

      expect(submitButton.disabled).toBe(false);

      fireEvent.change(nameInput, { target: { value: '   ' } });
      expect(submitButton.disabled).toBe(true);
    });

    it('deve exibir mensagem de erro e aplicar aria-invalid ao perder foco com e-mail inválido', () => {
      render(<CfpForm />);

      const emailInput = screen.getByLabelText(/E-mail/i);
      const submitButton = screen.getByRole('button', { name: /Submeter Palestra/i }) as HTMLButtonElement;

      fireEvent.change(emailInput, { target: { value: 'email-invalido' } });
      fireEvent.blur(emailInput);

      expect(emailInput.getAttribute('aria-invalid')).toBe('true');
      expect(emailInput.getAttribute('aria-describedby')).toBe('speaker-email-error');

      const errorAlert = screen.getByRole('alert');
      expect(errorAlert.textContent).toMatch(/Informe um endereço de e-mail válido/i);
      expect(submitButton.disabled).toBe(true);
    });

    it('deve bloquear o botão e aplicar aria-busy="true" durante o processo de submissão', async () => {
      let resolveSubmission: () => void = () => undefined;
      const mockSubmit = vi.fn().mockImplementation(
        () =>
          new Promise<void>((resolve) => {
            resolveSubmission = resolve;
          })
      );

      const { container } = render(<CfpForm onSubmit={mockSubmit} />);

      const nameInput = screen.getByLabelText(/Nome Completo/i);
      const emailInput = screen.getByLabelText(/E-mail/i);
      const talkTitleInput = screen.getByLabelText(/Título da Palestra/i);
      const isGdeCheckbox = screen.getByLabelText(/Google Developer Expert/i);
      const submitButton = screen.getByRole('button', { name: /Submeter Palestra/i }) as HTMLButtonElement;
      const formElement = container.querySelector('form');

      fireEvent.change(nameInput, { target: { value: 'Maria Dev' } });
      fireEvent.change(emailInput, { target: { value: 'maria@dev.com' } });
      fireEvent.change(talkTitleInput, { target: { value: 'Testes com Vitest no Next.js' } });
      fireEvent.click(isGdeCheckbox);

      expect(submitButton.disabled).toBe(false);

      // Dispara o envio
      fireEvent.click(submitButton);

      // Durante a submissão pendente
      expect(formElement?.getAttribute('aria-busy')).toBe('true');
      expect(submitButton.disabled).toBe(true);
      expect(screen.getByText(/Enviando proposta.../i)).toBeTruthy();
      expect(mockSubmit).toHaveBeenCalledTimes(1);
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Maria Dev',
          email: 'maria@dev.com',
          talkTitle: 'Testes com Vitest no Next.js',
          isGDE: true,
        })
      );

      // Conclui a submissão com sucesso
      resolveSubmission();

      await waitFor(() => {
        expect(screen.getByRole('status').textContent).toMatch(
          /Proposta de palestra enviada com sucesso/i
        );
      });

      // Após sucesso, os campos são limpos e o formulário volta a ficar sem aria-busy
      expect(formElement?.getAttribute('aria-busy')).toBe('false');
      expect((nameInput as HTMLInputElement).value).toBe('');
      expect((emailInput as HTMLInputElement).value).toBe('');
      expect((talkTitleInput as HTMLInputElement).value).toBe('');
      expect((isGdeCheckbox as HTMLInputElement).checked).toBe(false);
      expect(submitButton.disabled).toBe(true);
    });

    it('deve exibir mensagem de erro acessível caso a submissão falhe', async () => {
      const mockSubmit = vi.fn().mockRejectedValue(new Error('Falha de conexão com a API'));

      render(<CfpForm onSubmit={mockSubmit} />);

      fireEvent.change(screen.getByLabelText(/Nome Completo/i), {
        target: { value: 'Carlos Palestrante' },
      });
      fireEvent.change(screen.getByLabelText(/E-mail/i), {
        target: { value: 'carlos@empresa.com' },
      });
      fireEvent.change(screen.getByLabelText(/Título da Palestra/i), {
        target: { value: 'Performance em React 19' },
      });

      const submitButton = screen.getByRole('button', { name: /Submeter Palestra/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        const errorAlert = screen.getByRole('alert');
        expect(errorAlert.textContent).toMatch(/Falha de conexão com a API/i);
      });
    });
  });
});
