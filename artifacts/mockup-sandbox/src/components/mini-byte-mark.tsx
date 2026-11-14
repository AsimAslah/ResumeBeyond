export function MiniByteMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`mini-byte-mark${compact ? ' mini-byte-mark--compact' : ''}`} aria-hidden="true">
      <span className="mini-byte-antenna" />
      <span className="mini-byte-head">
        <span className="mini-byte-eye mini-byte-eye--left" />
        <span className="mini-byte-eye mini-byte-eye--right" />
        <span className="mini-byte-mouth" />
      </span>
      <span className="mini-byte-body"><span /></span>
    </span>
  );
}

