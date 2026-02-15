import type { Meta, StoryObj } from '@storybook/react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from './Resizable';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Components/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Left Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Right Panel</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[400px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Top Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Bottom Panel</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const WithHandle: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Left Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Right Panel</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-4xl rounded-lg border"
    >
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Main Content</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Side Panel</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Nested: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[400px] max-w-4xl rounded-lg border"
    >
      <ResizablePanel defaultSize={30} minSize={20}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Top Content</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Bottom Content</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const IDE: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[500px] max-w-6xl rounded-lg border"
    >
      <ResizablePanel defaultSize={20} minSize={15}>
        <div className="flex h-full flex-col gap-2 p-4">
          <span className="font-semibold text-sm">File Explorer</span>
          <div className="flex-1 rounded-md bg-muted p-2 text-xs">
            <div>📁 src</div>
            <div className="ml-4">📄 App.tsx</div>
            <div className="ml-4">📄 index.tsx</div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={70}>
            <div className="flex h-full flex-col gap-2 p-4">
              <span className="font-semibold text-sm">Editor</span>
              <div className="flex-1 rounded-md bg-muted p-2 text-xs font-mono">
                <div>function App() {'{'}</div>
                <div className="ml-4">return &lt;div&gt;Hello&lt;/div&gt;</div>
                <div>{'}'}</div>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="flex h-full flex-col gap-2 p-4">
              <span className="font-semibold text-sm">Terminal</span>
              <div className="flex-1 rounded-md bg-muted p-2 text-xs font-mono">
                $ npm start
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={20} minSize={15}>
        <div className="flex h-full flex-col gap-2 p-4">
          <span className="font-semibold text-sm">Properties</span>
          <div className="flex-1 rounded-md bg-muted p-2 text-xs">
            Component props and settings
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
