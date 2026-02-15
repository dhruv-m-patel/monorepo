import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Textarea.stories';
import { Textarea } from './Textarea';

const composed = composeStories(stories);

describe('Textarea', () => {
  it('renders default story', () => {
    render(<composed.Default />);
    const textarea = screen.getByPlaceholderText('Type your message here...');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('renders with value', () => {
    render(<composed.WithValue />);
    const textarea = screen.getByDisplayValue(/This is a sample text/);
    expect(textarea).toBeInTheDocument();
  });

  it('renders with custom rows', () => {
    render(<composed.WithRows />);
    const textarea = screen.getByPlaceholderText('This textarea has 10 rows');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('rows', '10');
  });

  it('renders error state', () => {
    render(<composed.Error />);
    const textarea = screen.getByDisplayValue(/This text exceeds/);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveClass('border-destructive');
  });

  it('renders disabled state', () => {
    render(<composed.Disabled />);
    const textarea = screen.getByDisplayValue('Cannot edit this content');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('disabled:opacity-50');
  });

  it('renders with maxLength', () => {
    render(<composed.WithMaxLength />);
    const textarea = screen.getByPlaceholderText('Maximum 100 characters');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('maxLength', '100');
  });

  it('applies custom className', () => {
    const { container } = render(<Textarea className="custom-class" />);
    const textarea = container.querySelector('.custom-class');
    expect(textarea).toBeInTheDocument();
  });
});
