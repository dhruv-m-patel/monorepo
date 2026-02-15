import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Label.stories';
import { Label } from './Label';

const composed = composeStories(stories);

describe('Label', () => {
  it('renders default story', () => {
    render(<composed.Default />);
    const label = screen.getByText('Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'input-id');
  });

  it('renders with input', () => {
    render(<composed.WithInput />);
    const label = screen.getByText('Email');
    const input = screen.getByPlaceholderText('email@example.com');
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'email');
    expect(input).toHaveAttribute('id', 'email');
  });

  it('renders required field', () => {
    render(<composed.Required />);
    const label = screen.getByText(/Password/);
    const asterisk = screen.getByText('*');
    const input = screen.getByLabelText(/Password/);
    expect(label).toBeInTheDocument();
    expect(asterisk).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('required');
  });

  it('renders disabled field', () => {
    render(<composed.Disabled />);
    const label = screen.getByText('Disabled Field');
    const input = screen.getByDisplayValue('Cannot edit');
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
  });

  it('renders with error', () => {
    render(<composed.WithError />);
    const label = screen.getByText('Username');
    const input = screen.getByDisplayValue('invalid-username!');
    const errorMsg = screen.getByText(/Username can only contain/);
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('text-destructive');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(errorMsg).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Label className="custom-class">Test</Label>);
    const label = container.querySelector('.custom-class');
    expect(label).toBeInTheDocument();
  });
});
