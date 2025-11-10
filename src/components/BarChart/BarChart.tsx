import React, { useRef, useEffect, useState } from 'react';
import './BarChart.css';

export interface BarChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartProps {
  data: BarChartDataPoint[];
  width?: number;
  height?: number;
  title?: string;
  orientation?: 'vertical' | 'horizontal';
  showValues?: boolean;
  showGrid?: boolean;
  animated?: boolean;
  barWidth?: number;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

const colorMap = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
};

export const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 600,
  height = 400,
  title,
  orientation = 'vertical',
  showValues = true,
  showGrid = true,
  animated = true,
  barWidth = 40,
  color = 'primary',
  className = '',
}) => {
  const [animatedData, setAnimatedData] = useState<BarChartDataPoint[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animated) {
      // Animate bars from 0 to their target values
      setAnimatedData(data.map(item => ({ ...item, value: 0 })));
      
      const timeout = setTimeout(() => {
        setAnimatedData(data);
      }, 100);

      return () => clearTimeout(timeout);
    } else {
      setAnimatedData(data);
    }
  }, [data, animated]);

  const maxValue = Math.max(...data.map(d => d.value));
  const padding = { top: 40, right: 40, bottom: 60, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const getBarColor = (index: number, item: BarChartDataPoint) => {
    if (item.color) return item.color;
    return colorMap[color];
  };

  const formatValue = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toFixed(0);
  };

  const renderVerticalBars = () => {
    const barSpacing = chartWidth / animatedData.length;
    const actualBarWidth = Math.min(barWidth, barSpacing * 0.8);

    return animatedData.map((item, index) => {
      const barHeight = (item.value / maxValue) * chartHeight;
      const x = padding.left + (index * barSpacing) + (barSpacing - actualBarWidth) / 2;
      const y = padding.top + chartHeight - barHeight;

      return (
        <g key={index}>
          {/* Bar */}
          <rect
            x={x}
            y={y}
            width={actualBarWidth}
            height={barHeight}
            fill={getBarColor(index, item)}
            rx={4}
            className="jv-bar-chart-bar"
          />
          
          {/* Value label */}
          {showValues && item.value > 0 && (
            <text
              x={x + actualBarWidth / 2}
              y={y - 8}
              textAnchor="middle"
              className="jv-bar-chart-value"
            >
              {formatValue(item.value)}
            </text>
          )}
          
          {/* X-axis label */}
          <text
            x={x + actualBarWidth / 2}
            y={height - padding.bottom + 20}
            textAnchor="middle"
            className="jv-bar-chart-label"
          >
            {item.label}
          </text>
        </g>
      );
    });
  };

  const renderHorizontalBars = () => {
    const barSpacing = chartHeight / animatedData.length;
    const actualBarHeight = Math.min(barWidth, barSpacing * 0.8);

    return animatedData.map((item, index) => {
      const barWidth = (item.value / maxValue) * chartWidth;
      const x = padding.left;
      const y = padding.top + (index * barSpacing) + (barSpacing - actualBarHeight) / 2;

      return (
        <g key={index}>
          {/* Bar */}
          <rect
            x={x}
            y={y}
            width={barWidth}
            height={actualBarHeight}
            fill={getBarColor(index, item)}
            rx={4}
            className="jv-bar-chart-bar"
          />
          
          {/* Value label */}
          {showValues && item.value > 0 && (
            <text
              x={x + barWidth + 8}
              y={y + actualBarHeight / 2 + 4}
              textAnchor="start"
              className="jv-bar-chart-value"
            >
              {formatValue(item.value)}
            </text>
          )}
          
          {/* Y-axis label */}
          <text
            x={padding.left - 10}
            y={y + actualBarHeight / 2 + 4}
            textAnchor="end"
            className="jv-bar-chart-label"
          >
            {item.label}
          </text>
        </g>
      );
    });
  };

  const renderGrid = () => {
    const gridLines = 5;
    const lines = [];

    for (let i = 0; i <= gridLines; i++) {
      if (orientation === 'vertical') {
        const y = padding.top + (chartHeight / gridLines) * i;
        const value = maxValue - (maxValue / gridLines) * i;
        
        lines.push(
          <g key={i}>
            <line
              x1={padding.left}
              y1={y}
              x2={padding.left + chartWidth}
              y2={y}
              className="jv-bar-chart-grid-line"
            />
            <text
              x={padding.left - 10}
              y={y + 4}
              textAnchor="end"
              className="jv-bar-chart-axis-label"
            >
              {formatValue(value)}
            </text>
          </g>
        );
      } else {
        const x = padding.left + (chartWidth / gridLines) * i;
        const value = (maxValue / gridLines) * i;
        
        lines.push(
          <g key={i}>
            <line
              x1={x}
              y1={padding.top}
              x2={x}
              y2={padding.top + chartHeight}
              className="jv-bar-chart-grid-line"
            />
            <text
              x={x}
              y={height - padding.bottom + 40}
              textAnchor="middle"
              className="jv-bar-chart-axis-label"
            >
              {formatValue(value)}
            </text>
          </g>
        );
      }
    }

    return lines;
  };

  return (
    <div className={`jv-bar-chart ${className}`} ref={chartRef}>
      {title && <h3 className="jv-bar-chart-title">{title}</h3>}
      <svg width={width} height={height} className="jv-bar-chart-svg">
        {/* Grid */}
        {showGrid && renderGrid()}
        
        {/* Axes */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + chartHeight}
          className="jv-bar-chart-axis"
        />
        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={padding.left + chartWidth}
          y2={padding.top + chartHeight}
          className="jv-bar-chart-axis"
        />
        
        {/* Bars */}
        {orientation === 'vertical' ? renderVerticalBars() : renderHorizontalBars()}
      </svg>
    </div>
  );
};
