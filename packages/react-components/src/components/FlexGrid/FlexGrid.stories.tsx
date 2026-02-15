import type { Meta, StoryObj } from '@storybook/react';
import { FlexGrid } from './FlexGrid';

const meta = {
  title: 'Components/FlexGrid',
  component: FlexGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof FlexGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoBox = ({ children }: { children: React.ReactNode }) => (
  <div className="h-24 bg-muted rounded-md flex items-center justify-center border">
    {children}
  </div>
);

export const EqualColumns: Story = {
  render: () => (
    <FlexGrid gap="4">
      <FlexGrid.Column xs={4}>
        <DemoBox>1/3</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={4}>
        <DemoBox>1/3</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={4}>
        <DemoBox>1/3</DemoBox>
      </FlexGrid.Column>
    </FlexGrid>
  ),
};

export const ResponsiveLayout: Story = {
  render: () => (
    <FlexGrid gap="4">
      <FlexGrid.Column xs={12} md={6} lg={4}>
        <DemoBox>Full → Half → Third</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={12} md={6} lg={4}>
        <DemoBox>Full → Half → Third</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={12} md={6} lg={4}>
        <DemoBox>Full → Half → Third</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={12} md={6} lg={4}>
        <DemoBox>Full → Half → Third</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={12} md={6} lg={4}>
        <DemoBox>Full → Half → Third</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={12} md={6} lg={4}>
        <DemoBox>Full → Half → Third</DemoBox>
      </FlexGrid.Column>
    </FlexGrid>
  ),
};

export const MixedWidths: Story = {
  render: () => (
    <FlexGrid gap="4">
      <FlexGrid.Column xs={12} md={3}>
        <DemoBox>Sidebar</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={12} md={9}>
        <DemoBox>Main Content</DemoBox>
      </FlexGrid.Column>
    </FlexGrid>
  ),
};

export const NestedGrids: Story = {
  render: () => (
    <FlexGrid gap="4">
      <FlexGrid.Column xs={12}>
        <DemoBox>Header (Full Width)</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={12} md={8}>
        <FlexGrid gap="4">
          <FlexGrid.Column xs={12}>
            <DemoBox>Nested Row 1</DemoBox>
          </FlexGrid.Column>
          <FlexGrid.Column xs={6}>
            <DemoBox>Nested 1/2</DemoBox>
          </FlexGrid.Column>
          <FlexGrid.Column xs={6}>
            <DemoBox>Nested 1/2</DemoBox>
          </FlexGrid.Column>
        </FlexGrid>
      </FlexGrid.Column>
      <FlexGrid.Column xs={12} md={4}>
        <DemoBox>Sidebar</DemoBox>
      </FlexGrid.Column>
    </FlexGrid>
  ),
};

export const WithAlignment: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2">Align Center</h3>
        <FlexGrid gap="4" alignItems="center">
          <FlexGrid.Column xs={4}>
            <div className="h-32 bg-muted rounded-md flex items-center justify-center border">
              Tall
            </div>
          </FlexGrid.Column>
          <FlexGrid.Column xs={4}>
            <DemoBox>Normal</DemoBox>
          </FlexGrid.Column>
          <FlexGrid.Column xs={4}>
            <DemoBox>Normal</DemoBox>
          </FlexGrid.Column>
        </FlexGrid>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Justify Between</h3>
        <FlexGrid gap="4" justifyContent="between" wrap={false}>
          <FlexGrid.Column xs={3}>
            <DemoBox>1</DemoBox>
          </FlexGrid.Column>
          <FlexGrid.Column xs={3}>
            <DemoBox>2</DemoBox>
          </FlexGrid.Column>
          <FlexGrid.Column xs={3}>
            <DemoBox>3</DemoBox>
          </FlexGrid.Column>
        </FlexGrid>
      </div>
    </div>
  ),
};

export const TwelveColumnGrid: Story = {
  render: () => (
    <FlexGrid gap="2">
      {Array.from({ length: 12 }).map((_, i) => (
        <FlexGrid.Column key={i} xs={1}>
          <div className="h-16 bg-muted rounded flex items-center justify-center text-xs border">
            {i + 1}
          </div>
        </FlexGrid.Column>
      ))}
      <FlexGrid.Column xs={12}>
        <DemoBox>Full Width (12)</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={6}>
        <DemoBox>Half (6)</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={6}>
        <DemoBox>Half (6)</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={4}>
        <DemoBox>1/3 (4)</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={4}>
        <DemoBox>1/3 (4)</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={4}>
        <DemoBox>1/3 (4)</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={3}>
        <DemoBox>1/4 (3)</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={3}>
        <DemoBox>1/4 (3)</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={3}>
        <DemoBox>1/4 (3)</DemoBox>
      </FlexGrid.Column>
      <FlexGrid.Column xs={3}>
        <DemoBox>1/4 (3)</DemoBox>
      </FlexGrid.Column>
    </FlexGrid>
  ),
};

export const ComplexLayout: Story = {
  render: () => (
    <FlexGrid gap="4">
      <FlexGrid.Column xs={12}>
        <div className="h-16 bg-primary text-primary-foreground rounded-md flex items-center justify-center font-semibold">
          Header
        </div>
      </FlexGrid.Column>
      <FlexGrid.Column xs={12} md={3}>
        <div className="h-64 bg-muted rounded-md p-4 border">
          <h3 className="font-semibold mb-2">Navigation</h3>
          <ul className="space-y-1 text-sm">
            <li>Dashboard</li>
            <li>Settings</li>
            <li>Profile</li>
          </ul>
        </div>
      </FlexGrid.Column>
      <FlexGrid.Column xs={12} md={9}>
        <FlexGrid gap="4">
          <FlexGrid.Column xs={12} lg={8}>
            <div className="h-64 bg-muted rounded-md p-4 border">
              <h3 className="font-semibold mb-2">Main Content</h3>
              <p className="text-sm text-muted-foreground">
                This is the main content area with responsive layout.
              </p>
            </div>
          </FlexGrid.Column>
          <FlexGrid.Column xs={12} lg={4}>
            <div className="h-64 bg-muted rounded-md p-4 border">
              <h3 className="font-semibold mb-2">Sidebar</h3>
              <p className="text-sm text-muted-foreground">
                Additional information and widgets.
              </p>
            </div>
          </FlexGrid.Column>
        </FlexGrid>
      </FlexGrid.Column>
      <FlexGrid.Column xs={12}>
        <div className="h-16 bg-muted rounded-md flex items-center justify-center border">
          Footer
        </div>
      </FlexGrid.Column>
    </FlexGrid>
  ),
};
