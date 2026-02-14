import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Menubar.stories';

const { Default, WithCheckboxes, WithRadioGroup, WithSubMenu, Complex } =
  composeStories(stories);

describe('Menubar', () => {
  it('renders the default menubar with triggers', () => {
    render(<Default />);
    expect(screen.getByText('File')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();
  });

  it('renders the checkbox menubar with trigger', () => {
    render(<WithCheckboxes />);
    expect(screen.getByText('View')).toBeInTheDocument();
  });

  it('renders the radio group menubar with trigger', () => {
    render(<WithRadioGroup />);
    expect(screen.getByText('Preferences')).toBeInTheDocument();
  });

  it('renders the submenu menubar with triggers', () => {
    render(<WithSubMenu />);
    expect(screen.getByText('File')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('renders the complex menubar with all triggers', () => {
    render(<Complex />);
    expect(screen.getByText('File')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();
  });
});
