import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from '../src/app/dashboard/page';

describe('DashboardPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardPage />);
    expect(baseElement).toBeTruthy();
  });

  it('should render the dashboard header and title', () => {
    render(<DashboardPage />);

    expect(screen.getByRole('heading', { level: 1, name: /dashboard cfp/i })).toBeDefined();
    expect(screen.getByText('Painel de Controle')).toBeDefined();
    expect(screen.getByText(/acompanhe em tempo real todas as propostas/i)).toBeDefined();
  });

  it('should render navigation link returning to the form (/)', () => {
    render(<DashboardPage />);

    const backLink = screen.getByRole('link', { name: /voltar ao formulário/i });
    expect(backLink).toBeDefined();
    expect(backLink.getAttribute('href')).toBe('/');
  });

  it('should render the CfpDashboard component', () => {
    render(<DashboardPage />);

    expect(
      screen.getByRole('heading', { level: 2, name: /palestras submetidas \(cfp\)/i })
    ).toBeDefined();
    expect(screen.getByRole('button', { name: /atualizar lista de palestras/i })).toBeDefined();
  });
});
