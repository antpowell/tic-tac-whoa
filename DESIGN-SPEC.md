# Design Spec for Tic Tac WHOA app

This file will be maintained as a running brain dump for others to have a better understanding of my design decisions and justifications. If there are any questions around why something was used in this project that this file does not answer please reach out to me at powell.anthony.e@gmail.com for clarification.

## Technologies used in this project

- Next.js
- Bun
- Tailwind
- Preact Signals
- Shadcn
- Prettier

This project was created with Next.js using.

- Next.js was chosen because it was a easy a framework that

  1. is a quick way to setup a react application with SSR
  2. is most likely other developers have been exposed to or have knowledge around to reduce friction of getting started
  3. currently has very good documentation and tutorials can be found in multiple locations on how to complete both easy and difficult task

- Bun is used in this project in place of npm, yarn, or pnpm because:

  1. Bun 1.1.0 was recently release and stated to be production ready.
  2. Bun is stated to bring significant improvements to build, install, and hot reload times.
  3. Building something that is slightly involved is the best way to test every day limitations that might arise a real world use.

- Tailwind is used because

  1. its expressive utility classes that allow for rapid UI prototyping for those who already have knowledge of tailwind.

- Shadcn is used as a tailwind compliant component library that allows for traditional customization with tailwind classes.

- Preact signals are used as a state management framework instead of React built in hooks because:

  1. it requires less boilerplate code
  2. removes the need to implement global providers
  3. reduces the need for prop drilling

- Prettier is used here to organize tailwind classes in a systematic way. I would traditionally like to only use eslint but as of now eslint can't organize tailwind and the tailwind documentation states that the prettier plugin is the best way to automatically sort tailwind utility classes[[1]](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted).

## Project structure philosophy

- I chose to keep all additional folders at root level and only add pages to the app folder in an attempt to make app structure easier to understand. Routeable pages will live in the app folder and the components use in those pages in the component folder.
- I chose the atomic design methodology because it allows for quick understanding of components complexity via folder structure. More can be read about Atomic Design Methodology [here](https://atomicdesign.bradfrost.com/chapter-2/)
