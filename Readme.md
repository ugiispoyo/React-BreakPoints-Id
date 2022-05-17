# React BreakPoints Id

Breakpoints are customizable widths that determine how your responsive layout without render for Reactjs

## Installation

```bash
npm i react-breakpoints-id
```

## Usage Example

```javascript
import React from 'react';
import BreakPoint from 'react-breakpoints-id';

export default function App() {
  return (
    <React.Fragment>
      <BreakPoint breakPoint={['xs']}>
        <p>Just XS</p>
      </BreakPoint>

      <BreakPoint breakPoint={['xs', 'md']}>
        <p>XS until MD</p>
      </BreakPoint>
    </React.Fragment>
  );
}

```