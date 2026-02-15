import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Typography.stories';

const composed = composeStories(stories);

describe('Typography', () => {
  it('renders heading1 story', () => {
    render(<composed.Heading1 />);
    expect(screen.getByText('The Joke Tax Chronicles')).toBeInTheDocument();
  });

  it('renders heading2 story', () => {
    render(<composed.Heading2 />);
    expect(screen.getByText('The People of the Kingdom')).toBeInTheDocument();
  });

  it('renders heading3 story', () => {
    render(<composed.Heading3 />);
    expect(screen.getByText('The Joke Tax')).toBeInTheDocument();
  });

  it('renders heading4 story', () => {
    render(<composed.Heading4 />);
    expect(
      screen.getByText('People stopped telling jokes')
    ).toBeInTheDocument();
  });

  it('renders paragraph story', () => {
    render(<composed.Paragraph />);
    expect(
      screen.getByText(/The king, seeing how much happier/i)
    ).toBeInTheDocument();
  });

  it('renders lead text story', () => {
    render(<composed.LeadText />);
    expect(
      screen.getByText(/A modal dialog that interrupts/i)
    ).toBeInTheDocument();
  });

  it('renders large text story', () => {
    render(<composed.LargeText />);
    expect(screen.getByText('Are you absolutely sure?')).toBeInTheDocument();
  });

  it('renders small text story', () => {
    render(<composed.SmallText />);
    expect(screen.getByText('Email address')).toBeInTheDocument();
  });

  it('renders muted text story', () => {
    render(<composed.MutedText />);
    expect(screen.getByText('Enter your email address.')).toBeInTheDocument();
  });

  it('renders code story', () => {
    render(<composed.Code />);
    expect(screen.getByText('npm install')).toBeInTheDocument();
    expect(screen.getByText('yarn add')).toBeInTheDocument();
  });

  it('renders quote story', () => {
    render(<composed.Quote />);
    expect(screen.getByText(/"After all," he said/i)).toBeInTheDocument();
  });

  it('renders all typography story', () => {
    render(<composed.AllTypography />);
    expect(screen.getByText('Heading 1')).toBeInTheDocument();
    expect(screen.getByText('Heading 2')).toBeInTheDocument();
    expect(screen.getByText('Heading 3')).toBeInTheDocument();
    expect(screen.getByText('Heading 4')).toBeInTheDocument();
  });
});
