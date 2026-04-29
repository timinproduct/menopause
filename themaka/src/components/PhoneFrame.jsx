import { T } from '../tokens';

export function PhoneFrame({ children }) {
  return (
    <div style={{
      width: 360,
      height: 760,
      borderRadius: 44,
      background: T.ink,
      padding: 8,
      boxShadow: '0 32px 80px -24px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.12)',
      flexShrink: 0,
      position: 'relative',
    }}>
      {/* notch */}
      <div style={{
        position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)',
        width: 100, height: 26, background: T.ink,
        borderRadius: 14, zIndex: 10,
      }}/>
      {/* screen */}
      <div style={{
        width: '100%', height: '100%',
        borderRadius: 36,
        overflow: 'hidden',
        position: 'relative',
        background: T.cream,
      }}>
        {children}
      </div>
    </div>
  );
}
