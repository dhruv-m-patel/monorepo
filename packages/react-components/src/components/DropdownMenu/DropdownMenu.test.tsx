import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './DropdownMenu.stories';

const { Default, WithCheckboxes, WithRadioGroup, WithSubMenu, Disabled } =
  composeStories(stories);

describe('DropdownMenu', () => {
  it('renders the default dropdown menu trigger', () => {
    render(<Default />);
    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });

  it('renders the checkbox dropdown menu trigger', () => {
    render(<WithCheckboxes />);
    expect(screen.getByText('View Options')).toBeInTheDocument();
  });

  it('renders the radio group dropdown menu trigger', () => {
    render(<WithRadioGroup />);
    expect(screen.getByText('Panel Position')).toBeInTheDocument();
  });

  it('renders the submenu dropdown menu trigger', () => {
    render(<WithSubMenu />);
    expect(screen.getByText('More Options')).toBeInTheDocument();
  });

  it('renders the disabled dropdown menu trigger', () => {
    render(<Disabled />);
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });
});
