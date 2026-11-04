interface DemoDisclosureProps {
  text?: string;
  className?: string;
}

export function DemoDisclosure({
  text = 'Sample pricing and availability — concept demonstration only',
  className = ''
}: DemoDisclosureProps) {
  return (
    <div
      role="note"
      aria-label="Demonstration Disclosure"
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        color: 'var(--color-muted)',
        letterSpacing: '0.02em',
        padding: '4px 8px',
        backgroundColor: 'rgba(24, 34, 31, 0.04)',
        borderRadius: 'var(--radius-sm)'
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-bronze)',
          display: 'inline-block'
        }}
      />
      <span>{text}</span>
    </div>
  );
}
