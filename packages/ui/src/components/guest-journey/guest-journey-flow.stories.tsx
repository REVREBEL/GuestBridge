import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { GuestJourneyFlow } from "./guest-journey-flow";

const meta: Meta<typeof GuestJourneyFlow> = {
  title: "Components/GuestJourneyFlow",
  component: GuestJourneyFlow,
  parameters: {
    layout: "centered"
  }
};

export default meta;
type Story = StoryObj<typeof GuestJourneyFlow>;

export const Default: Story = {
  args: {}
};
