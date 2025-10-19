import { ACDialogueView, IconWithTitle } from "./types.ts";

export const dialogues: ACDialogueView[] = [
  {
    name: "Estella",
    affiliation: "friendly",
    content: "Hey buddy, welcome to my portfolio. I designed it myself~",
  },
  {
    name: "Estella",
    affiliation: "friendly",
    content: "This bad boy is hosted in a Hostinger VPS with Deno and Oak.",
  },
  {
    name: "Estella",
    affiliation: "friendly",
    content:
      "HTMX for simple actions, TailwindCSS, and NginX for a reverse proxy.",
  },
  {
    name: "Estella",
    affiliation: "friendly",
    content: "I hope you like my portfolio as I liked making it.",
  },
  {
    name: "Estella",
    affiliation: "friendly",
    content: "Stick around to the bottom for more about me, buddy.",
  },
];

export const technicalSkills: IconWithTitle[] = [
  {
    title: "React/React Native",
    iconSource: "react-logo",
  },
  {
    title: "Type/JavaScript",
    iconSource: "tsjs-logo",
  },
  {
    title: "Swift",
    iconSource: "swift-logo",
  },
  {
    title: "Deno + Oak",
    iconSource: "deno-logo",
  },
  {
    title: "HTMX",
    iconSource: "htmx-logo",
  },
  {
    title: "TailwindCSS",
    iconSource: "tailwind-logo",
  },
  {
    title: "NextJS",
    iconSource: "nextjs-logo",
  },
  {
    title: "CI/CD",
    iconSource: "infinity",
  },
];
