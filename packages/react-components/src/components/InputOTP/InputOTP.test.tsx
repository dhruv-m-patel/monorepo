import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './InputOTP.stories';

const { Default, WithSeparator, FourDigit, WithPattern } =
  composeStories(stories);

describe('InputOTP', () => {
  it('renders the default story', () => {
    render(<Default />);
    const slots = screen.getAllByRole('textbox');
    expect(slots).toHaveLength(6);
  });

  it('renders with separator', () => {
    render(<WithSeparator />);
    const separator = screen.getByRole('separator');
    expect(separator).toBeInTheDocument();
  });

  it('renders four digit variant', () => {
    render(<FourDigit />);
    const slots = screen.getAllByRole('textbox');
    expect(slots).toHaveLength(4);
  });

  it('renders with pattern', () => {
    render(<WithPattern />);
    const slots = screen.getAllByRole('textbox');
    expect(slots).toHaveLength(6);
  });

  it('advances to next slot when typing', () => {
    render(<Default />);
    const slots = screen.getAllByRole('textbox');
    const firstSlot = slots[0];

    fireEvent.keyDown(firstSlot, { key: '1' });

    // Check that value is displayed
    expect(screen.getByText('Value: 1')).toBeInTheDocument();
  });

  it('handles backspace to delete and move back', () => {
    render(<Default />);
    const slots = screen.getAllByRole('textbox');
    const firstSlot = slots[0];

    // Type a digit
    fireEvent.keyDown(firstSlot, { key: '1' });
    expect(screen.getByText('Value: 1')).toBeInTheDocument();

    // Backspace
    const secondSlot = slots[1];
    fireEvent.keyDown(secondSlot, { key: 'Backspace' });

    // Value should be empty
    expect(screen.getByText('Value: (empty)')).toBeInTheDocument();
  });
});
