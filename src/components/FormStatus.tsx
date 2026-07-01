import type { LeadState } from '@/lib/useLeadSubmit';

export default function FormStatus({
  state,
  error,
  successText,
}: {
  state: LeadState;
  error: string;
  successText: string;
}) {
  if (state === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="osw"
        style={{
          marginTop: 6,
          padding: '14px 18px',
          borderRadius: 12,
          background: 'rgba(72, 200, 130, .12)',
          border: '1px solid rgba(72, 200, 130, .4)',
          color: '#B8F0D0',
          fontSize: 14,
          lineHeight: 1.45,
          letterSpacing: '.02em',
        }}
      >
        {successText}
      </div>
    );
  }
  if (state === 'error' && error) {
    return (
      <div
        role="alert"
        style={{
          marginTop: 6,
          padding: '12px 16px',
          borderRadius: 12,
          background: 'rgba(230, 70, 70, .1)',
          border: '1px solid rgba(230, 70, 70, .4)',
          color: '#F4B8B8',
          fontSize: 14,
          lineHeight: 1.45,
        }}
      >
        {error}
      </div>
    );
  }
  return null;
}
