/**
 * The small status-style label that appears above headlines.
 * Live cyan dot + monospace label = signature Mukala header treatment.
 */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow mb-8">
      <span className="eyebrow-dot" />
      {children}
    </div>
  );
}
