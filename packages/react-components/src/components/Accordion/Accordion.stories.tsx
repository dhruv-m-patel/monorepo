import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion';

const meta = {
  title: 'Navigation/Accordion',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[400px]">
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
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Feature 1</AccordionTrigger>
        <AccordionContent>
          Details about feature 1 can be found here.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Feature 2</AccordionTrigger>
        <AccordionContent>
          Details about feature 2 can be found here.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Feature 3</AccordionTrigger>
        <AccordionContent>
          Details about feature 3 can be found here.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Accordion
      type="single"
      defaultValue="item-2"
      collapsible
      className="w-[400px]"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Question 1</AccordionTrigger>
        <AccordionContent>Answer to question 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Question 2 (Open by default)</AccordionTrigger>
        <AccordionContent>
          Answer to question 2 - this is open by default
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Question 3</AccordionTrigger>
        <AccordionContent>Answer to question 3</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
