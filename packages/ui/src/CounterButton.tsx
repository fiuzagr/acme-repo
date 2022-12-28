import React from 'react';

export const CounterButton = () => {
  const [count, setCount] = React.useState(1);

  return (
    <div
      style={{
        background: 'rgb(0 100 0 / 10%)',
        borderRadius: '6px',
        padding: '1.5rem',
        fontWeight: 500,
      }}
    >
      <p style={{ marginBlockEnd: '1.5rem', marginInline: 0 }}>
        This component is from{' '}
        <code
          style={{
            paddingBlock: '0.2rem',
            paddingInline: '0.3rem',
            background: 'rgba(0 0 0 / 10%)',
            borderRadius: '0.25rem',
          }}
        >
          ui
        </code>
      </p>
      <div>
        <button
          style={{
            background: 'black',
            color: 'white',
            border: 'none',
            paddingBlock: '0.5rem',
            paddingInline: '1rem',
            borderRadius: '0.25rem',
            display: 'inline-block',
            cursor: 'pointer',
          }}
          type="button"
          onClick={() => setCount((c) => c + 1)}
        >
          Count: {count}
        </button>
      </div>
    </div>
  );
};
