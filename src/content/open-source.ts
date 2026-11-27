// Contributions to other people's open-source projects, newest first.
export type Contribution = {
  project: string;
  repo: string;
  // What kind of contribution it was, shown as a label on the card
  kind: "Pull request" | "Investigation" | "Answer";
  title: string;
  description: string;
  year: string;
  // Pull request state, when there is one
  status?: "merged" | "open" | "closed";
  links: { label: string; href: string }[];
};

export const contributions: Contribution[] = [
  {
    project: "wouter",
    repo: "https://github.com/molefrog/wouter",
    kind: "Investigation",
    title: "Diagnosed a hash-routing bug report",
    description:
      "A report said links didn't work with hash routing, and its reproduction no longer ran. I rebuilt it as a public broken/fixed pair and traced the cause: the links sat outside the <Router>, so they used the browser location instead of the hash one, which explained every symptom in the thread. I also flagged a real edge case: links written with a leading # render a double ##.",
    year: "2026",
    links: [
      { label: "Write-up", href: "https://github.com/molefrog/wouter/issues/542#issuecomment-7218504742" },
      { label: "Reproduction repo", href: "https://github.com/BrunMartins/wouter-542-repro" },
      { label: "Live: broken", href: "https://brunmartins.github.io/wouter-542-repro/broken/" },
      { label: "Live: fixed", href: "https://brunmartins.github.io/wouter-542-repro/fixed/" },
    ],
  },
  {
    project: "ESP32-BLE-Keyboard",
    repo: "https://github.com/T-vK/ESP32-BLE-Keyboard",
    kind: "Pull request",
    title: "Add F13–F24 to the HID descriptor",
    description:
      "The library couldn't send F13–F24. I extended the HID report descriptor so ESP32 devices can send keys no app uses by default, which I needed for a Bluetooth Discord mute button.",
    year: "2026",
    status: "open",
    links: [{ label: "Pull request", href: "https://github.com/T-vK/ESP32-BLE-Keyboard/pull/392" }],
  },
  {
    project: "proj4js",
    repo: "https://github.com/proj4js/proj4js",
    kind: "Answer",
    title: "Explained negative UTM values in the southern hemisphere",
    description:
      "A user got negative northings for southern-hemisphere points. I showed that the projection string was missing +south, gave a corrected version of their code, and pointed to the lines in proj4js where the flag sets the 10,000 km false northing.",
    year: "2026",
    links: [{ label: "Answer", href: "https://github.com/proj4js/proj4js/issues/464#issuecomment-7216846081" }],
  },
];

// The page (and its nav link) only appears once there's more than the
// ESP32 contribution, which already has its own project card.
export const showOpenSource = contributions.length > 1;
