import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Select.stories';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select';

const composed = composeStories(stories);

describe('Select', () => {
  it('renders default story', () => {
    render(<composed.Default />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    // Label and SelectValue placeholder both contain "Select a fruit"
    const fruitElements = screen.getAllByText(/select a fruit/i);
    expect(fruitElements.length).toBeGreaterThanOrEqual(1);
  });

  it('renders with default value story', () => {
    render(<composed.WithDefaultValue />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    expect(screen.getByText(/banana/i)).toBeInTheDocument();
  });

  it('renders with groups story', () => {
    render(<composed.WithGroups />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    // Label and SelectValue placeholder both contain "Select a food"
    const foodElements = screen.getAllByText(/select a food/i);
    expect(foodElements.length).toBeGreaterThanOrEqual(1);
  });

  it('renders with disabled items story', () => {
    render(<composed.WithDisabledItems />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
  });

  it('renders disabled story', () => {
    render(<composed.Disabled />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toBeDisabled();
  });

  it('renders long list story', () => {
    render(<composed.LongList />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    // Label and SelectValue placeholder both contain "Select a timezone"
    const tzElements = screen.getAllByText(/select a timezone/i);
    expect(tzElements.length).toBeGreaterThanOrEqual(1);
  });

  it('renders basic select component', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    expect(screen.getByText(/choose/i)).toBeInTheDocument();
  });
});
