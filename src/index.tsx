import React from 'react';

interface Props {
  children: React.ReactNode;
  breakPoint: Array<Required<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'>>;
  valBreakPoint?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}

const defaultBreakPoint = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

const Index = ({
  children,
  breakPoint,
  valBreakPoint = defaultBreakPoint,
}: Props): React.ReactNode | JSX.Element | null => {
  const [size, setSize] = React.useState<Array<number>>([0, 0]);

  valBreakPoint = { ...defaultBreakPoint, ...valBreakPoint };

  const updateSize = () => {
    setSize([window.innerWidth, window.innerHeight]);
  };


  React.useEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const findValBreakPoint = (): Array<number> => {
    let result: Array<number> = [];
    breakPoint.forEach((val: string) => {
      result.push(valBreakPoint[val as keyof typeof valBreakPoint]);
    });

    return result;
  };

  const display = size;

  const checkBreakPoint = (): boolean => {

    const arr: Array<number> = findValBreakPoint().sort(
      (a: number, b: number) => a - b
    );
    const valArr: Array<number> = Object.values(valBreakPoint).sort(
      (a: number, b: number) => a - b
    );
    let result: boolean = false;
    let indexVal = valArr.indexOf(arr[0]);
    if (arr.length === 2) {
      result = display[0] <= arr[0] || display[0] >= arr[1];
    } else {
      if (indexVal + 1 !== valArr.length) {
        result = display[0] <= arr[0] || display[0] >= valArr[indexVal + 1];
      } else {
        result = display[0] <= arr[0];
      }
    }

    return result;
  };

  if (checkBreakPoint()) {
    return null;
  }

  return children;
};


// export default React.memo(Index);
// export default Index;
module.exports = {
  Index
}
