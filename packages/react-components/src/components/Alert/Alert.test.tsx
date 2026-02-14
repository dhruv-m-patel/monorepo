import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Alert.stories';

const { Default, Destructive, WithIcon, DestructiveWithIcon } =
  composeStories(stories);

describe('Alert', () => {
  describe('Default story', () => {
    it('renders default alert with title and description', () => {
      render(<Default />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Heads up!')).toBeInTheDocument();
      expect(
        screen.getByText('You can add components to your app using the cli.')
      ).toBeInTheDocument();
    });

    it('applies default variant classes', () => {
      render(<Default />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('bg-background', 'text-foreground');
    });
  });

  describe('Destructive story', () => {
    it('renders destructive alert with title and description', () => {
      render(<Destructive />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(
        screen.getByText('Your session has expired. Please log in again.')
      ).toBeInTheDocument();
    });

    it('applies destructive variant classes', () => {
      render(<Destructive />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('text-destructive');
    });
  });

  describe('WithIcon story', () => {
    it('renders alert with icon', () => {
      render(<WithIcon />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      const svg = screen.getByRole('alert').querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('DestructiveWithIcon story', () => {
    it('renders destructive alert with icon', () => {
      render(<DestructiveWithIcon />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Critical Error')).toBeInTheDocument();
      const svg = screen.getByRole('alert').querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });
});
