// Contributions to other people's open-source projects, newest first.
export type Contribution = {
  project: string;
  repo: string;
  title: string;
  description: string;
  year: string;
  status?: "merged" | "open" | "closed";
  pr?: string;
};

export const contributions: Contribution[] = [
  {
    project: "ESP32-BLE-Keyboard",
    repo: "https://github.com/T-vK/ESP32-BLE-Keyboard",
    title: "Add F13–F24 to the HID descriptor",
    description:
      "The library couldn't send F13–F24. I extended the HID report descriptor so ESP32 devices can send keys no app uses by default, which I needed for a Bluetooth Discord mute button.",
    year: "2026",
    status: "open",
    // TODO: add the upstream PR link
  },
];

// The page (and its nav link) only appears once there's more than the
// ESP32 contribution, which already has its own project card.
export const showOpenSource = contributions.length > 1;
