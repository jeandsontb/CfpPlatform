import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from '../src/app/page';

describe('Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Page />);
    expect(baseElement).toBeTruthy();
  });

  it('should render the clean CFP page header and title', () => {
    render(<Page />);

    expect(screen.getByRole('heading', { level: 1, name: /cfp platform/i })).toBeDefined();
    expect(screen.getByText('Call for Papers')).toBeDefined();
    expect(screen.getByText(/envie sua proposta de palestra/i)).toBeDefined();
  });

  it('should render the CFP form component', () => {
    render(<Page />);

    expect(screen.getByRole('heading', { level: 2, name: /submissão de palestra \(cfp\)/i })).toBeDefined();
    expect(screen.getByLabelText(/nome completo/i)).toBeDefined();
    expect(screen.getByLabelText(/e-mail/i)).toBeDefined();
    expect(screen.getByLabelText(/título da palestra/i)).toBeDefined();
  });

  it('should render navigation link to dashboard', () => {
    render(<Page />);

    const dashboardLink = screen.getByRole('link', { name: /ver palestras submetidas/i });
    expect(dashboardLink).toBeDefined();
    expect(dashboardLink.getAttribute('href')).toBe('/dashboard');
  });

  it('should not contain legacy Nx template elements', () => {
    render(<Page />);

    expect(screen.queryByText(/welcome frontend/i)).toBeNull();
    expect(screen.queryByText(/learning materials/i)).toBeNull();
    expect(screen.queryByText(/you're up and running/i)).toBeNull();
  });
});

