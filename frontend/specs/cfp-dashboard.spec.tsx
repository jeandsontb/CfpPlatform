import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { SpeakerDTO } from '@cfp-platform/shared-types';
import { CfpDashboard } from '../src/app/components/cfp-dashboard';

describe('CfpDashboard Component', () => {
  const mockSpeakers: SpeakerDTO[] = [
    {
      id: 'spk-1',
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      talkTitle: 'Primeiro Algoritmo da História',
      isGDE: true,
    },
    {
      id: 'spk-2',
      name: 'Alan Turing',
      email: 'alan@example.com',
      talkTitle: 'Computabilidade e Máquinas Teóricas',
      isGDE: false,
    },
  ];

  it('deve exibir indicador de carregamento e aplicar aria-busy enquanto os dados são buscados', async () => {
    let resolveData: (data: SpeakerDTO[]) => void = () => undefined;
    const mockFetch = vi.fn().mockImplementation(
      () =>
        new Promise<SpeakerDTO[]>((resolve) => {
          resolveData = resolve;
        })
    );

    const { container } = render(<CfpDashboard fetchData={mockFetch} />);

    const dashboardCard = container.firstChild as HTMLElement;
    expect(dashboardCard.getAttribute('aria-busy')).toBe('true');
    expect(screen.getByText(/Carregando propostas de palestras.../i)).toBeDefined();

    resolveData(mockSpeakers);

    await waitFor(() => {
      expect(dashboardCard.getAttribute('aria-busy')).toBe('false');
    });
  });

  it('deve renderizar a mensagem amigável de estado vazio quando não houver palestras cadastradas', async () => {
    const mockFetch = vi.fn().mockResolvedValue([]);

    render(<CfpDashboard fetchData={mockFetch} />);

    await waitFor(() => {
      expect(
        screen.getByText(/Nenhuma palestra submetida até o momento/i)
      ).toBeDefined();
    });

    expect(
      screen.getByText(/Seja o primeiro a enviar uma proposta/i)
    ).toBeDefined();
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('deve renderizar a lista de palestras com título, nome, e-mail e distintivo GDE', async () => {
    const mockFetch = vi.fn().mockResolvedValue(mockSpeakers);

    render(<CfpDashboard fetchData={mockFetch} />);

    await waitFor(() => {
      expect(
        screen.getByText('Primeiro Algoritmo da História')
      ).toBeDefined();
    });

    // Validar palestra 1
    expect(screen.getByText('Ada Lovelace')).toBeDefined();
    const adaEmail = screen.getByText('ada@example.com');
    expect(adaEmail).toBeDefined();
    expect(adaEmail.getAttribute('href')).toBe('mailto:ada@example.com');

    // Validar distintivo GDE para Ada Lovelace
    const gdeBadges = screen.getAllByLabelText('Google Developer Expert');
    expect(gdeBadges).toHaveLength(1);
    expect(gdeBadges[0].textContent).toBe('GDE');

    // Validar palestra 2 (sem GDE)
    expect(
      screen.getByText('Computabilidade e Máquinas Teóricas')
    ).toBeDefined();
    expect(screen.getByText('Alan Turing')).toBeDefined();
    expect(screen.getByText('alan@example.com')).toBeDefined();

    // Validar contador
    expect(screen.getByText(/2 propostas/i)).toBeDefined();
  });

  it('deve exibir mensagem de erro acessível em caso de falha na consulta', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Falha ao conectar com o servidor'));

    render(<CfpDashboard fetchData={mockFetch} />);

    await waitFor(() => {
      const errorAlert = screen.getByRole('alert');
      expect(errorAlert.textContent).toMatch(/Falha ao conectar com o servidor/i);
    });
  });

  it('deve permitir atualizar os dados ao clicar no botão "Atualizar"', async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce(mockSpeakers);

    render(<CfpDashboard fetchData={mockFetch} />);

    await waitFor(() => {
      expect(
        screen.getByText(/Nenhuma palestra submetida até o momento/i)
      ).toBeDefined();
    });

    const refreshButton = screen.getByRole('button', { name: /Atualizar lista de palestras/i });
    fireEvent.click(refreshButton);

    await waitFor(() => {
      expect(
        screen.getByText('Primeiro Algoritmo da História')
      ).toBeDefined();
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});
