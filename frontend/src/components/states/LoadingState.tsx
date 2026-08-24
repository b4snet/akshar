export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="state" role="status" aria-live="polite">
      <p>{label}</p>
    </div>
  )
}
