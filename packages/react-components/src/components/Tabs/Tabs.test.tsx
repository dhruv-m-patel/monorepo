import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Tabs.stories';

const { Default, ThreeTabs, DisabledTab } = composeStories(stories);

describe('Tabs', () => {
  it('renders default story', () => {
    render(<Default />);
    expect(screen.getByRole('tab', { name: /account/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /password/i })).toBeInTheDocument();
  });

  it('renders three tabs story', () => {
    render(<ThreeTabs />);
    expect(screen.getByRole('tab', { name: /overview/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /analytics/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /reports/i })).toBeInTheDocument();
  });

  it('renders disabled tab story', () => {
    render(<DisabledTab />);
    const disabledTab = screen.getByRole('tab', { name: /disabled tab/i });
    expect(disabledTab).toBeInTheDocument();
    expect(disabledTab).toBeDisabled();
  });

  it('displays tab content', () => {
    render(<Default />);
    expect(screen.getByText(/account settings/i)).toBeInTheDocument();
  });
});
