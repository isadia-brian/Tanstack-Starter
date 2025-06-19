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

#### The Basics

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
