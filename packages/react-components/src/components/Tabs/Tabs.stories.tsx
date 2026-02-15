import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Make changes to your account here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Password Settings</h3>
          <p className="text-sm text-muted-foreground">
            Change your password here.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const ThreeTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="p-4">
          <p>Overview dashboard content</p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="p-4">
          <p>Analytics data visualization</p>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="p-4">
          <p>Generated reports</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Active Tab</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
          Disabled Tab
        </TabsTrigger>
        <TabsTrigger value="tab3">Another Tab</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4">Content for active tab</div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4">This content won&apos;t be accessible</div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4">Content for another tab</div>
      </TabsContent>
    </Tabs>
  ),
};
