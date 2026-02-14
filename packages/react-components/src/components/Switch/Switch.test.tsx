import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Switch.stories';
import { Switch } from './Switch';

const composed = composeStories(stories);

describe('Switch', () => {
  it('renders default story', () => {
    render(<composed.Default />);
    const switchElement = screen.getByRole('switch', { name: /airplane mode/i });
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).not.toBeChecked();
    expect(switchElement).not.toBeDisabled();
  });

  it('renders checked story', () => {
    render(<composed.Checked />);
    const switchElement = screen.getByRole('switch', { name: /notifications/i });
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toBeChecked();
  });

  it('renders disabled story', () => {
    render(<composed.Disabled />);
    const switchElement = screen.getByRole('switch', { name: /disabled switch/i });
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toBeDisabled();
    expect(switchElement).not.toBeChecked();
  });

  it('renders disabled and checked story', () => {
    render(<composed.DisabledChecked />);
    const switchElement = screen.getByRole('switch', {
      name: /disabled and checked/i,
    });
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toBeDisabled();
    expect(switchElement).toBeChecked();
  });

  it('toggles checked state on click', async () => {
    const user = userEvent.setup();
    render(<Switch />);
    const switchElement = screen.getByRole('switch');

    expect(switchElement).not.toBeChecked();

    await user.click(switchElement);
    expect(switchElement).toBeChecked();

    await user.click(switchElement);
    expect(switchElement).not.toBeChecked();
  });

  it('renders with description story', () => {
    render(<composed.WithDescription />);
    const switchElement = screen.getByRole('switch', { name: /marketing emails/i });
    expect(switchElement).toBeInTheDocument();
    expect(
      screen.getByText(/receive emails about new products/i)
    ).toBeInTheDocument();
  });

  it('renders multiple switches story', () => {
    render(<composed.Multiple />);
    const wifi = screen.getByRole('switch', { name: /wi-fi/i });
    const bluetooth = screen.getByRole('switch', { name: /bluetooth/i });
    const cellular = screen.getByRole('switch', { name: /cellular data/i });
    const hotspot = screen.getByRole('switch', { name: /personal hotspot/i });

    expect(wifi).toBeInTheDocument();
    expect(bluetooth).toBeInTheDocument();
    expect(cellular).toBeInTheDocument();
    expect(hotspot).toBeInTheDocument();

    expect(wifi).toBeChecked();
    expect(bluetooth).not.toBeChecked();
    expect(cellular).toBeChecked();
    expect(hotspot).toBeDisabled();
  });
});
