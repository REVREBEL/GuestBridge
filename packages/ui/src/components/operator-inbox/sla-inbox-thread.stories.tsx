import type { Meta, StoryObj } from "@storybook/react";
import { SLAInboxThread } from "./sla-inbox-thread";

const meta: Meta<typeof SLAInboxThread> = {
  title: "Components/OperatorInbox/SLAInboxThread",
  component: SLAInboxThread,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SLAInboxThread>;

export const Default: Story = {
  args: {},
};
