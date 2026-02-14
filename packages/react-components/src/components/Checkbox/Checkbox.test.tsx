import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Checkbox.stories';
import { Checkbox } from './Checkbox';

const composed = composeStories(stories);

describe('Checkbox', () => {
  it('renders default story', () => {
    render(<composed.Default />);
    const checkbox = screen.getByRole('checkbox', {
      name: /accept terms and conditions/i,
    });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(checkbox).not.toBeDisabled();
  });

  it('renders checked story', () => {
    render(<composed.Checked />);
    const checkbox = screen.getByRole('checkbox', {
      name: /subscribe to newsletter/i,
    });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it('renders disabled story', () => {
    render(<composed.Disabled />);
    const checkbox = screen.getByRole('checkbox', { name: /disabled checkbox/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeDisabled();
    expect(checkbox).not.toBeChecked();
  });

  it('renders disabled and checked story', () => {
    render(<composed.DisabledChecked />);
    const checkbox = screen.getByRole('checkbox', {
      name: /disabled and checked/i,
    });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeDisabled();
    expect(checkbox).toBeChecked();
  });

  it('toggles checked state on click', async () => {
    const user = userEvent.setup();
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('renders with text story', () => {
    render(<composed.WithText />);
    const checkbox = screen.getByRole('checkbox', {
      name: /accept terms and conditions/i,
    });
    expect(checkbox).toBeInTheDocument();
    expect(
      screen.getByText(/you agree to our terms of service/i)
    ).toBeInTheDocument();
  });
});
