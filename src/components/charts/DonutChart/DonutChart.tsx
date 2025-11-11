import React from 'react';
import { PieChart, PieChartProps } from '../PieChart/PieChart';

export interface DonutChartProps extends Omit<PieChartProps, 'innerRadius'> {
  innerRadius?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  innerRadius = 60,
  ...props
}) => {
  return <PieChart {...props} innerRadius={innerRadius} />;
};
