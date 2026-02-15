import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

const meta = {
  title: 'Components/ToggleGroup',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['bold']}>
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Outline: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Small: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline" size="sm">
      <ToggleGroupItem value="left">S</ToggleGroupItem>
      <ToggleGroupItem value="center">M</ToggleGroupItem>
      <ToggleGroupItem value="right">L</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Large: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline" size="lg">
      <ToggleGroupItem value="small">Small</ToggleGroupItem>
      <ToggleGroupItem value="medium">Medium</ToggleGroupItem>
      <ToggleGroupItem value="large">Large</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline">
      <ToggleGroupItem value="left">&#8592;</ToggleGroupItem>
      <ToggleGroupItem value="center">&#8596;</ToggleGroupItem>
      <ToggleGroupItem value="right">&#8594;</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ToggleGroup type="single" disabled>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};
