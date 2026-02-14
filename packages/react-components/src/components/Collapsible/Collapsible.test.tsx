import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Collapsible.stories';

const { Default, OpenByDefault, SimpleText } = composeStories(stories);

describe('Collapsible', () => {
  it('renders default story', () => {
    render(<Default />);
    expect(screen.getByText(/@peduarte starred 3 repositories/i)).toBeInTheDocument();
    expect(screen.getByText(/@radix-ui\/primitives/i)).toBeInTheDocument();
  });

  it('renders open by default story', () => {
    render(<OpenByDefault />);
    expect(screen.getByText(/expandable section/i)).toBeInTheDocument();
    expect(screen.getByText(/this section is open by default/i)).toBeInTheDocument();
  });

  it('renders simple text story', () => {
    render(<SimpleText />);
    expect(screen.getByRole('button', { name: /show more details/i })).toBeInTheDocument();
  });

  it('displays collapsible trigger button', () => {
    render(<Default />);
    const toggleButton = screen.getByRole('button', { name: /toggle/i });
    expect(toggleButton).toBeInTheDocument();
  });
});
