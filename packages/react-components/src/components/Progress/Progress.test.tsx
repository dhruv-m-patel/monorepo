import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Progress.stories';

const { Default, Quarter, Half, ThreeQuarters, Complete, CustomMax } =
  composeStories(stories);

describe('Progress', () => {
  describe('Default story', () => {
    it('renders progress bar at 0%', () => {
      const { container } = render(<Default />);
      const progressRoot = container.querySelector('[role="progressbar"]');
      expect(progressRoot).toBeInTheDocument();
      expect(progressRoot).toHaveAttribute('aria-valuenow', '0');
      expect(progressRoot).toHaveAttribute('aria-valuemax', '100');
    });
  });

  describe('Quarter story', () => {
    it('renders progress bar at 25%', () => {
      const { container } = render(<Quarter />);
      const progressRoot = container.querySelector('[role="progressbar"]');
      expect(progressRoot).toBeInTheDocument();
      expect(progressRoot).toHaveAttribute('aria-valuenow', '25');
    });
  });

  describe('Half story', () => {
    it('renders progress bar at 50%', () => {
      const { container } = render(<Half />);
      const progressRoot = container.querySelector('[role="progressbar"]');
      expect(progressRoot).toBeInTheDocument();
      expect(progressRoot).toHaveAttribute('aria-valuenow', '50');
    });
  });

  describe('ThreeQuarters story', () => {
    it('renders progress bar at 75%', () => {
      const { container } = render(<ThreeQuarters />);
      const progressRoot = container.querySelector('[role="progressbar"]');
      expect(progressRoot).toBeInTheDocument();
      expect(progressRoot).toHaveAttribute('aria-valuenow', '75');
    });
  });

  describe('Complete story', () => {
    it('renders progress bar at 100%', () => {
      const { container } = render(<Complete />);
      const progressRoot = container.querySelector('[role="progressbar"]');
      expect(progressRoot).toBeInTheDocument();
      expect(progressRoot).toHaveAttribute('aria-valuenow', '100');
    });
  });

  describe('CustomMax story', () => {
    it('renders progress bar with custom max value', () => {
      const { container } = render(<CustomMax />);
      const progressRoot = container.querySelector('[role="progressbar"]');
      expect(progressRoot).toBeInTheDocument();
      expect(progressRoot).toHaveAttribute('aria-valuenow', '30');
      expect(progressRoot).toHaveAttribute('aria-valuemax', '50');
    });
  });

  it('applies transition classes to indicator', () => {
    const { container } = render(<Half />);
    const indicator = container.querySelector('.bg-primary');
    expect(indicator).toHaveClass('transition-all');
  });
});
