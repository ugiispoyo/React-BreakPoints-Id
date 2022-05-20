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
        <p>Only XS</p>
      </BreakPoint>

      <BreakPoint breakPoint={['xs', 'md']}>
        <p>XS to MD</p>
      </BreakPoint>

      <BreakPoint valBreakPoint={{md: 500, lg: 700}} breakPoint={['xs', 'md']}>
        <p>Custom Value Break Point</p>
      </BreakPoint>
    </React.Fragment>
  );
}

```

## Props

No | Name | Type | Description | Default Value | Mandatory
-- | ---- | ---  | --- | --- | ---
1  | valBreakPoint | For custom from width xs, sm, md, lg, xl, xxl | object | { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 } | false
2  | breakPoint | To determine the break point layout to be used. Example: if you use ["xs"] it means that the inner component will render when the device is 0px to 575px, if you use ["md"] it means that the inner component will render when the device is 768px to 991px, if you use ["sm", "lg"] means the inner component will render when the device is 576px to 991px | Array<'xs', 'sm', 'md', 'lg', 'xl', 'xxl'> | - | true

## Break Points 
Extra Small (xs) | Small (sm) | Medium (md) | Large (lg) | X-Large (xl) | XX-Large |
0px to 575px | 576px to 767px | 768px to 991px | 992px to 1199px | 1200px to 1399px | >= 1400px

## Config For TypeScript

Add in file index.d.ts or global.d.ts

```javascript
declare module 'react-breakpoints-id';
```

<br/>
<hr/>

#### [Live Preview](https://stackblitz.com/edit/react-l7qco7?file=src/App.js)

<br/>
