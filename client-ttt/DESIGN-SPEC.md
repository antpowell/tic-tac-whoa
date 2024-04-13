---
runme:
  id: 01HV1QRTK23P6MWG83G70ZXF2M
  version: v3
---

# Design Spec for Tic Tac WHOA app

This file will be maintained as a running brain dump for others to have a better understanding of my design decisions and justifications. If there are any questions around why something was used in this project that this file does not answer please reach out to me at powell.anthony.e@gmail.com for clarification.

## Technologies used in this project

- Next.js
- Bun
- Tailwind
- Preact Signals
- Shadcn
- Prettier
- Supabase

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

Supabase is used in this project as the Postgres DB. It's a plus that it's an open source alternative to Firebase, which I have used in the pass. Documentation is pretty good to get up and running. Supabase also allows for easy data migration away or for self hosting. (No vender  lock in)

## Project structure philosophy

- I chose to keep all additional folders at root level and only add pages to the app folder in an attempt to make app structure easier to understand. Routeable pages will live in the app folder and the components use in those pages in the component folder.
- I chose a slightly modified atomic design methodology because it allows for quick understanding of components complexity via folder structure. More can be read about Atomic Design Methodology [here](https://atomicdesign.bradfrost.com/chapter-2/)

## Key Learnings

Preact Signals currently don't have a mechanism for deep equality so is is recommended to make singles from primitive data types vs complex ones. Although it is possible to do so as I have done in this project, the constraint is that the `<signal>.value` must be directly changed not any other data that might hang off of `.value`.

For example:

```sh {"id":"01HV65DP6APX3WJKRDSSE4AGXK"}
const test = signal({data: 0, values:{x: 0, y: 0}});
test.value.values.x = 1; //❌This is not allowed
text.value = {...test.value, values: {...test.value.values, x: 1}}}; //✅ This is allowed 
```

Ref: [StackOverflow explanation](https://stackoverflow.com/questions/75876994/how-to-change-value-of-properties-with-signal#:~:text=The%20issue%20you%27re%20running%20into%20is%20that%20you%27re,to%20assign%20to%20the%20signal%27s%20value%20property%20directly.)