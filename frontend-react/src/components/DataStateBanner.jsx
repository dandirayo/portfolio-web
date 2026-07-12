function DataStateBanner({ type = "info", children }) {
  if (!children) return null;

  return (
    <p className={`data-state data-state-${type}`} role="status" aria-live="polite">
      {children}
    </p>
  );
}

export default DataStateBanner;
