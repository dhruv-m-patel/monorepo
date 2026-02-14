import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Input.stories';
import { Input } from './Input';

const composed = composeStories(stories);

describe('Input', () => {
  it('renders default story', () => {
    render(<composed.Default />);
    const input = screen.getByPlaceholderText('Enter text...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders email type', () => {
    render(<composed.Email />);
    const input = screen.getByPlaceholderText('email@example.com');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
  });

  it('renders password type', () => {
    render(<composed.Password />);
    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('renders number type', () => {
    render(<composed.Number />);
    const input = screen.getByPlaceholderText('0');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'number');
  });

  it('renders with value', () => {
    render(<composed.WithValue />);
    const input = screen.getByDisplayValue('Hello World');
    expect(input).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<composed.Error />);
    const input = screen.getByPlaceholderText('Invalid input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveClass('border-destructive');
  });

  it('renders disabled state', () => {
    render(<composed.Disabled />);
    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:opacity-50');
  });

  it('renders file type', () => {
    const { container } = render(<composed.File />);
    const input = container.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'file');
  });

  it('applies custom className', () => {
    const { container } = render(<Input className="custom-class" />);
    const input = container.querySelector('.custom-class');
    expect(input).toBeInTheDocument();
  });
});
