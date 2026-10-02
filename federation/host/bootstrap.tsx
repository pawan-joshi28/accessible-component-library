import "../../src/styles.css";
import { Suspense, lazy, useState } from "react";
import { createRoot } from "react-dom/client";

// Components are loaded at runtime from the remote app, not bundled into the host.
const Button = lazy(() => import("uiRemote/Button").then((m) => ({ default: m.Button })));
const Modal = lazy(() => import("uiRemote/Modal").then((m) => ({ default: m.Modal })));
const TextField = lazy(() => import("uiRemote/TextField").then((m) => ({ default: m.TextField })));
const Tabs = lazy(() => import("uiRemote/Tabs").then((m) => ({ default: m.Tabs })));

function App() {
  const [open, setOpen] = useState(false);
  return (
    <main style={{ padding: 24, fontFamily: "system-ui", display: "grid", gap: 16, maxWidth: 640 }}>
      <h1>Host app</h1>
      <p>Every control below is rendered from the shared component library served by a different app.</p>
      <Suspense fallback={<p role="status">Loading remote components…</p>}>
        <TextField label="Your name" hint="Rendered from the remote." />
        <Button onClick={() => setOpen(true)}>Open remote modal</Button>
        <Tabs label="Host demo" items={[{ id: "x", label: "Overview", content: "Shared design system, independent deployments." }, { id: "y", label: "Details", content: "React is a shared singleton, so hooks work across apps." }]} />
        <Modal open={open} title="Hello from the remote" onClose={() => setOpen(false)}>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Modal>
      </Suspense>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
