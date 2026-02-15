import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './ContextMenu.stories';

const { Default, WithCheckboxes, WithRadioGroup, WithSubMenu, Disabled } =
  composeStories(stories);

describe('ContextMenu', () => {
  it('renders the default context menu trigger', () => {
    render(<Default />);
    expect(screen.getByText('Right click here')).toBeInTheDocument();
  });

  it('renders the checkbox context menu trigger', () => {
    render(<WithCheckboxes />);
    expect(screen.getByText('Right click here')).toBeInTheDocument();
  });

  it('renders the radio group context menu trigger', () => {
    render(<WithRadioGroup />);
    expect(screen.getByText('Right click here')).toBeInTheDocument();
  });

  it('renders the submenu context menu trigger', () => {
    render(<WithSubMenu />);
    expect(screen.getByText('Right click here')).toBeInTheDocument();
  });

  it('renders the disabled context menu trigger', () => {
    render(<Disabled />);
    expect(screen.getByText('Right click here')).toBeInTheDocument();
  });
});
