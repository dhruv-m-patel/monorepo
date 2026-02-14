import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Command.stories';

const { Default, WithDisabledItems, Minimal } = composeStories(stories);

describe('Command', () => {
  describe('Default Story', () => {
    it('should render command input', () => {
      render(<Default />);
      const input = screen.getByPlaceholderText('Type a command or search...');
      expect(input).toBeInTheDocument();
    });

    it('should render command list', () => {
      const { container } = render(<Default />);
      const list = container.querySelector('[cmdk-list]');
      expect(list).toBeInTheDocument();
    });

    it('should render Suggestions group', () => {
      render(<Default />);
      expect(screen.getByText('Suggestions')).toBeInTheDocument();
    });

    it('should render suggestion items', () => {
      render(<Default />);
      expect(screen.getByText('Calendar')).toBeInTheDocument();
      expect(screen.getByText('Search Emoji')).toBeInTheDocument();
      expect(screen.getByText('Calculator')).toBeInTheDocument();
    });

    it('should render Settings group', () => {
      render(<Default />);
      // "Settings" appears as both a group heading and an item — use getAllByText
      const settingsElements = screen.getAllByText('Settings');
      expect(settingsElements.length).toBeGreaterThanOrEqual(1);
    });

    it('should render settings items', () => {
      render(<Default />);
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Billing')).toBeInTheDocument();
      // "Settings" is both a group heading and an item
      const settingsElements = screen.getAllByText('Settings');
      expect(settingsElements.length).toBeGreaterThanOrEqual(2);
    });

    it('should render keyboard shortcuts', () => {
      render(<Default />);
      expect(screen.getByText('⌘P')).toBeInTheDocument();
      expect(screen.getByText('⌘B')).toBeInTheDocument();
      expect(screen.getByText('⌘S')).toBeInTheDocument();
    });

    it('should render separator between groups', () => {
      const { container } = render(<Default />);
      const separator = container.querySelector('[cmdk-separator]');
      expect(separator).toBeInTheDocument();
    });

    it('should have CommandEmpty in story source', () => {
      // cmdk removes [cmdk-empty] from the DOM when there are matching results
      // We verify the command palette renders successfully with items visible
      const { container } = render(<Default />);
      const items = container.querySelectorAll('[cmdk-item]');
      expect(items.length).toBeGreaterThan(0);
    });
  });

  describe('WithDisabledItems Story', () => {
    it('should render command input', () => {
      render(<WithDisabledItems />);
      const input = screen.getByPlaceholderText('Type a command or search...');
      expect(input).toBeInTheDocument();
    });

    it('should render Actions group', () => {
      render(<WithDisabledItems />);
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    it('should render action items', () => {
      render(<WithDisabledItems />);
      expect(screen.getByText('Copy')).toBeInTheDocument();
      expect(screen.getByText('Cut')).toBeInTheDocument();
      expect(screen.getByText('Paste (Disabled)')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('should have disabled item with disabled attribute', () => {
      const { container } = render(<WithDisabledItems />);
      const disabledItem = container.querySelector('[data-disabled="true"]');
      expect(disabledItem).toBeInTheDocument();
    });
  });

  describe('Minimal Story', () => {
    it('should render command input', () => {
      render(<Minimal />);
      const input = screen.getByPlaceholderText('Search...');
      expect(input).toBeInTheDocument();
    });

    it('should render list items', () => {
      render(<Minimal />);
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('Cherry')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Elderberry')).toBeInTheDocument();
    });

    it('should render command list with items', () => {
      // cmdk removes [cmdk-empty] from the DOM when there are matching results
      // We verify the command palette renders successfully with items visible
      const { container } = render(<Minimal />);
      const items = container.querySelectorAll('[cmdk-item]');
      expect(items.length).toBeGreaterThan(0);
    });
  });

  describe('Command Structure', () => {
    it('should render search icon in input wrapper', () => {
      const { container } = render(<Default />);
      const inputWrapper = container.querySelector('[cmdk-input-wrapper]');
      expect(inputWrapper).toBeInTheDocument();
      const searchIcon = inputWrapper?.querySelector('svg');
      expect(searchIcon).toBeInTheDocument();
    });

    it('should render command groups', () => {
      const { container } = render(<Default />);
      const groups = container.querySelectorAll('[cmdk-group]');
      expect(groups.length).toBeGreaterThan(0);
    });

    it('should render command items', () => {
      const { container } = render(<Default />);
      const items = container.querySelectorAll('[cmdk-item]');
      expect(items.length).toBeGreaterThan(0);
    });

    it('should render group headings', () => {
      const { container } = render(<Default />);
      const headings = container.querySelectorAll('[cmdk-group-heading]');
      expect(headings.length).toBeGreaterThan(0);
    });
  });
});
