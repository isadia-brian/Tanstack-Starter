import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <h1>Hello world</h1>
      {/* <p>Tommorrow is tuesday</p> */}
    </div>
  );
}
