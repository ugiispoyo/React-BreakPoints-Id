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

  const oriPropsValBreakPoint = valBreakPoint;
  valBreakPoint = { ...defaultBreakPoint, ...valBreakPoint };

  const updateSize = (): void => {
    setSize([window.innerWidth, window.innerHeight]);
  };

  React.useEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const checkTypeBreakPoints = (): boolean => {
    let trueType: boolean = true;
    if (Array.isArray(breakPoint)) {
      if (breakPoint?.length <= 2) {
        breakPoint?.forEach(function (item: string) {
          if (typeof item !== 'string') {
            trueType = false;
          }
        });
      } else {
        trueType = false;
      }
    }
    return trueType;
  };

  const findValBreakPoint = (): Array<number> => {
    let result: Array<number> = [];
    try {
      // Check type value of props breakPoint
      if (checkTypeBreakPoints()) {
        // Check type value of props valBreakPoint
        if (
          typeof oriPropsValBreakPoint !== 'object' ||
          oriPropsValBreakPoint === null ||
          Array.isArray(oriPropsValBreakPoint)
        ) {
          throw 'false type valBreakPoint';
        }

        Object.entries(valBreakPoint).forEach(([key, value]) => {
          if (
            !Object.keys(defaultBreakPoint).includes(key) ||
            typeof value !== 'number'
          ) {
            throw 'false type valBreakPoint';
          }
        });

        breakPoint?.forEach((val: string, i: number) => {
          let a = valBreakPoint[val as keyof typeof valBreakPoint];
          // Check value of props valBreakPoint
          if (i > 0) {
            if (val === breakPoint[0] || a <= valBreakPoint[breakPoint[0]]) {
              throw 'false value breakPoint';
            }
          }
          if (!Object.keys(valBreakPoint).includes(val)) {
            throw 'not match value breakPoint';
          }
          result.push(a);
        });

        return result;
      } else {
        throw 'false type breakPoint';
      }
    } catch (e: any) {
      if (e === 'false type valBreakPoint') {
        console.error(
          `The value (${JSON.stringify(
            oriPropsValBreakPoint
          )}) of props given by valBreakPoint does not match!`
        );
        return result;
      } else if (e === 'false value breakPoint') {
        console.error(
          'The value of the breakpoint array cannot be the same or the value of the last index of the breakpoint array cannot be less than the first index!'
        );
        return [];
      } else if (e === 'not match value breakPoint') {
        console.error(
          'BreakPoint value props do not match! values only allow "xs", "sm", "md", "lg", "xl" or "xxl"'
        );
        return [];
      } else {
        console.error('Breakpoint type must be string array or max 2 length!');
        return result;
      }
    }
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
      if (breakPoint?.[1] === 'xxl') {
        result = display[0] <= arr[0];
      } else {
        result = display[0] <= arr[0] || display[0] >= arr[1];
      }
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
export default Index;
