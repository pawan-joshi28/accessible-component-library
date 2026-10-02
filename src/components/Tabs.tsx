import { KeyboardEvent, ReactNode, useId, useRef, useState } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

// WAI-ARIA tabs pattern: roving tabindex, arrow/Home/End keys, automatic activation.
export function Tabs({ items, label }: { items: TabItem[]; label: string }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const move = (index: number) => {
    const next = (index + items.length) % items.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      move(keys[e.key]);
    }
  };

  return (
    <div>
      <div role="tablist" aria-label={label} className="ui-tablist" onKeyDown={onKeyDown}>
        {items.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { refs.current[i] = el; }}
            role="tab"
            id={`${base}-tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`${base}-panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            className="ui-tab"
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {items.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${base}-panel-${t.id}`}
          aria-labelledby={`${base}-tab-${t.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="ui-tabpanel"
        >
          {i === active && t.content}
        </div>
      ))}
    </div>
  );
}
