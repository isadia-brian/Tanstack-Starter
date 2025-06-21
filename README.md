# Tanstack Start

This is the initial tanstack app without any modifications. Use this to start your projects

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

## The Basics

---

##### Dependencies

Tanstack is powered by vite and Tanstack Router

##### The router file

Dictates behaviour of Tanstack router used within tanstack start

`src/router.tsx`

##### Route Generation

When first running the app with `bun run dev` a file called `routeTree.gen.ts` is generated.

It contains:

- Generated route tree
- Handful of utilities that make Tanstack start fully type safe

##### Server Entry Point - Optional

Optional out of the box and if not provided Tanstack Start automatically handles the server entry point using the below example as default:

```tsx
// src/server.ts

import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { createRouter } from "./router";

export default createStartHandler({
  createRouter,
})(defaultStreamHandler);
```

This app acts as the entry file for doing all ssr-related tasks

- It's important that a new router is created for each request. This ensures that any data handled by the router is unique to the request.
- `defaultStreamHandler` function renders application to a stream. This is vital for streaming HTML to the client.

##### Client Entry Point - Optional

Optional out of the box and if not provided Tanstack Start automatically handles the client entry point using the below example as default:

```tsx
// app/client.tsx

import { StartClient } from "@tanstack/react-start";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { createRouter } from "./router";

const router = createRouter();

hydrateRoot(
  document,
  <StrictMode>
    <StartClient router={router} />
  </StrictMode>,
);
```

The `StartClient` component seen above helps us hydrate client-side javascript once the route resolves to the client

We therefore use it to hydrate the root of our application

This enables us to kick off client-side routing once the user's initial server request has fulfilled.

##### The Root of the Application

`src/__root.tsx`

The `__root` route is the entry point of the application

- It wrappes all other routes of the application including the home page.
- It behaves like a pathless layout route for the whole application.
- It is always rendered hence the perfect place to construct the application shell and place global logic.

##### Routes

Are an extensive feature of Tanstack Router

- Defined using the `createFileRoute` function
- Are code-split and lazy-loaded automatically
- Critical data fetching are done here through the loader

`src/routes/index.tsx, src/routes/about.tsx`

##### Navigation

Tanstack Start is build on top of Tanstack Router, hence all nav features of TS Router are available.

A summary of features:

- `Link` component navigates to a new route.
- `useNavigate` hook can be used to navigate imperatively.
- You can use the `useRouter` hook anywhere in the application to access the router instance and perform invalidations.
- Every router hook that returns state is reactive, reruns when appropriate state changes.

Quick example of the `Link` component

```tsx
import { Link } from "@tanstack/react-router";

function Home() {
  return <Link to="/about">About</Link>;
}
```

##### Server Functions

Allow you to create server-side functions that can be called from both the server during SSR and the client!

Quick overview of how server functions work:

- Created using the `createServerFn` function.
- Can be called from both the server during SSR and the client.
- Can be used to fetch data, or perform other server side functions.

An example of how you can use server functions to fetch and return data from the server:

```tsx
import { createServerFn } from "@tanstack/react-start";
import * as fs from "node:fs";
import { z } from "zod";

const getUserById = createServerFn({ method: "GET" })
  // Always validate data sent to the function, here we use Zod
  .validator(z.string())
  // The handler function is where you perform the server-side logic
  .handler(async ({ data }) => {
    return db.query.users.findFirst({ where: eq(users.id, data) });
  });

// Somewhere else in your application
const user = await getUserById({ data: "1" });
```
