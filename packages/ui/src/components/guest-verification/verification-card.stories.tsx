import type { Meta, StoryObj } from "@storybook/react";
import { VerificationCard } from "./verification-card";

const meta: Meta<typeof VerificationCard> = {
  title: "Components/GuestVerification/VerificationCard",
  component: VerificationCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onVerify: { action: "verified" },
  },
};

export default meta;
type Story = StoryObj<typeof VerificationCard>;

export const Default: Story = {
  args: {
    onVerify: (phone, zip) => {
      alert(`Verified Guest credentials:\nPhone: ${phone}\nZIP: ${zip}`);
    },
  },
};
