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
declare const Index: ({ children, breakPoint, valBreakPoint, }: Props) => React.ReactNode | JSX.Element | null;
export default Index;
