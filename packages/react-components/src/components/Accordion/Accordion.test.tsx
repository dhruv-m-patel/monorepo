import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion';

describe('Accordion', () => {
  it('renders single accordion with collapsible items', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that match the aesthetic.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Is it accessible?')).toBeInTheDocument();
    expect(screen.getByText('Is it styled?')).toBeInTheDocument();
  });

  it('renders multiple accordion', () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Feature 1</AccordionTrigger>
          <AccordionContent>Details about feature 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Feature 2</AccordionTrigger>
          <AccordionContent>Details about feature 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
  });

  it('expands item when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Click me</AccordionTrigger>
          <AccordionContent>Hidden content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByText('Click me');
    await user.click(trigger);
    expect(screen.getByText('Hidden content')).toBeVisible();
  });

  it('renders with default value expanded', () => {
    render(
      <Accordion type="single" defaultValue="item-2" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Question 1</AccordionTrigger>
          <AccordionContent>Answer 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Question 2</AccordionTrigger>
          <AccordionContent>Answer 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Answer 2')).toBeVisible();
  });

  it('has proper button roles for triggers', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('applies custom className to AccordionItem', () => {
    const { container } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="custom-class">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
