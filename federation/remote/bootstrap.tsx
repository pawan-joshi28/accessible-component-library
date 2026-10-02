import { createRoot } from "react-dom/client";
import { Alert, Button, Tabs } from "../../src";
import "../../src/styles.css";

createRoot(document.getElementById("root")!).render(
  <main style={{ padding: 24, fontFamily: "system-ui", display: "grid", gap: 16, maxWidth: 640 }}>
    <h1>UI remote (Module Federation)</h1>
    <Alert>This app exposes the component library through <code>remoteEntry.js</code>. The host app consumes it at runtime.</Alert>
    <Button>Remote button</Button>
    <Tabs label="Remote demo" items={[{ id: "a", label: "One", content: "First" }, { id: "b", label: "Two", content: "Second" }]} />
  </main>
);
