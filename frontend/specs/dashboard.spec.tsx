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

  it('should render exact navigation links in navbar', () => {
    render(<DashboardPage />);

    const eventLink = screen.getByRole('link', { name: /cadastro de evento/i });
    expect(eventLink).toBeDefined();
    expect(eventLink.getAttribute('href')).toBe('/event/new');

    const talkLink = screen.getByRole('link', { name: /cadastro de palestra/i });
    expect(talkLink).toBeDefined();
    expect(talkLink.getAttribute('href')).toBe('/talks/new');

    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    expect(dashboardLink).toBeDefined();
    expect(dashboardLink.getAttribute('href')).toBe('/dashboard');
  });

  it('should render the CfpDashboard component', () => {
    render(<DashboardPage />);

    expect(
      screen.getByRole('heading', { level: 2, name: /palestras submetidas \(cfp\)/i })
    ).toBeDefined();
    expect(screen.getByRole('button', { name: /atualizar lista de palestras/i })).toBeDefined();
  });
});
