import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

describe('ToggleGroup', () => {
  it('renders the single mode', () => {
    render(
      <ToggleGroup type="single" defaultValue="center">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Center')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('renders the multiple mode', () => {
    render(
      <ToggleGroup type="multiple" defaultValue={['bold']}>
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
        <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(screen.getByText('Bold')).toBeInTheDocument();
    expect(screen.getByText('Italic')).toBeInTheDocument();
    expect(screen.getByText('Underline')).toBeInTheDocument();
  });

  it('renders the outline variant', () => {
    render(
      <ToggleGroup type="single" variant="outline">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(screen.getByText('Left')).toBeInTheDocument();
  });

  it('renders small size', () => {
    render(
      <ToggleGroup type="single" size="sm">
        <ToggleGroupItem value="s">S</ToggleGroupItem>
        <ToggleGroupItem value="m">M</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(screen.getByText('S')).toBeInTheDocument();
  });

  it('renders large size', () => {
    render(
      <ToggleGroup type="single" size="lg">
        <ToggleGroupItem value="large">Large</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(screen.getByText('Large')).toBeInTheDocument();
  });

  it('toggles item on click', async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    );

    const leftButton = screen.getByText('Left');
    await user.click(leftButton);
    expect(leftButton).toHaveAttribute('data-state', 'on');
  });

  it('renders disabled state', () => {
    render(
      <ToggleGroup type="single" disabled>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
    );
    // Radix applies disabled to individual items
    const items = screen.getAllByRole('radio');
    items.forEach((item) => {
      expect(item).toBeDisabled();
    });
  });
});
