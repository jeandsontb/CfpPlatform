import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EventForm } from '../src/app/components/event-form';
import EventNewPage from '../src/app/event/new/page';

describe('EventForm & EventNewPage', () => {
  it('should render EventNewPage with Navbar and EventForm', () => {
    render(<EventNewPage />);

    expect(screen.getByRole('heading', { level: 1, name: /cfp platform/i })).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: /cadastro de local do evento/i })).toBeDefined();

    expect(screen.getByLabelText(/nome do evento/i)).toBeDefined();
    expect(screen.getByLabelText(/endereço/i)).toBeDefined();
    expect(screen.getByLabelText(/capacidade/i)).toBeDefined();
    expect(screen.getByLabelText(/data/i)).toBeDefined();

    expect(screen.getByRole('link', { name: /cadastro de evento/i })).toBeDefined();
    expect(screen.getByRole('link', { name: /cadastro de palestra/i })).toBeDefined();
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeDefined();
  });

  it('should allow filling out the EventForm and submitting', async () => {
    const onSubmitMock = vi.fn().mockResolvedValue({ id: '1' });

    render(<EventForm onSubmit={onSubmitMock} />);

    const submitBtn = screen.getByRole('button', { name: /cadastrar evento/i });
    expect(submitBtn).toBeDefined();

    fireEvent.change(screen.getByLabelText(/nome do evento/i), {
      target: { value: 'Tech Conf 2025' },
    });
    fireEvent.change(screen.getByLabelText(/endereço/i), {
      target: { value: 'Rua das Flores 123' },
    });
    fireEvent.change(screen.getByLabelText(/capacidade/i), {
      target: { value: '300' },
    });
    fireEvent.change(screen.getByLabelText(/data/i), {
      target: { value: '2025-11-15' },
    });

    await waitFor(() => {
      expect(submitBtn.hasAttribute('disabled')).toBe(false);
    });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({
        name: 'Tech Conf 2025',
        address: 'Rua das Flores 123',
        capacity: 300,
        date: '2025-11-15',
      });
    });

    expect(await screen.findByText(/local do evento cadastrado com sucesso/i)).toBeDefined();
  });
});
