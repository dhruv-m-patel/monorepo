import type { Meta, StoryObj } from '@storybook/react';
import {
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Muted,
  InlineCode,
  Blockquote,
} from './Typography';

const meta = {
  title: 'Components/Typography',
  component: H1,
  tags: ['autodocs'],
} satisfies Meta<typeof H1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  render: () => <H1>The Joke Tax Chronicles</H1>,
};

export const Heading2: Story = {
  render: () => <H2>The People of the Kingdom</H2>,
};

export const Heading3: Story = {
  render: () => <H3>The Joke Tax</H3>,
};

export const Heading4: Story = {
  render: () => <H4>People stopped telling jokes</H4>,
};

export const Paragraph: Story = {
  render: () => (
    <>
      <P>
        The king, seeing how much happier his subjects were, realized the error
        of his ways and repealed the joke tax.
      </P>
      <P>
        This is a second paragraph to demonstrate the spacing between multiple
        paragraphs.
      </P>
    </>
  ),
};

export const LeadText: Story = {
  render: () => (
    <Lead>
      A modal dialog that interrupts the user with important content and expects
      a response.
    </Lead>
  ),
};

export const LargeText: Story = {
  render: () => <Large>Are you absolutely sure?</Large>,
};

export const SmallText: Story = {
  render: () => <Small>Email address</Small>,
};

export const MutedText: Story = {
  render: () => <Muted>Enter your email address.</Muted>,
};

export const Code: Story = {
  render: () => (
    <P>
      Install the component using <InlineCode>npm install</InlineCode> or{' '}
      <InlineCode>yarn add</InlineCode>.
    </P>
  ),
};

export const Quote: Story = {
  render: () => (
    <Blockquote>
      "After all," he said, "everyone enjoys a good joke, so it's only fair that
      they should pay for the privilege."
    </Blockquote>
  ),
};

export const AllTypography: Story = {
  render: () => (
    <div className="space-y-6">
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <H4>Heading 4</H4>
      <Lead>This is a lead paragraph with larger text.</Lead>
      <P>
        This is a regular paragraph with normal text size. It demonstrates the
        default paragraph styling.
      </P>
      <Large>This is large text for emphasis.</Large>
      <Small>This is small text for labels.</Small>
      <Muted>This is muted text for secondary information.</Muted>
      <P>
        This paragraph includes <InlineCode>inline code</InlineCode> styling.
      </P>
      <Blockquote>
        This is a blockquote for quoted text or callouts.
      </Blockquote>
    </div>
  ),
};
