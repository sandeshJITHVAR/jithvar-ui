import React, { useState } from 'react';
import { DateRangePicker, DateRange } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const DateRangePickerDemo: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });

  const basicExample = `import { DateRangePicker, DateRange } from 'jithvar-ui';

const [dateRange, setDateRange] = useState<DateRange>({
  startDate: null,
  endDate: null
});

<DateRangePicker
  value={dateRange}
  onChange={setDateRange}
/>`;

  return (
    <div className="jv-demo-page">
      <h1>📅 DateRangePicker</h1>
      <p className="jv-subtitle">Date range selection with predefined ranges</p>

      <section className="jv-section">
        <h2>Live Demo</h2>
        <div className="jv-demo-preview">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
        {dateRange.startDate && dateRange.endDate && (
          <div className="jv-info-box">
            Selected: {dateRange.startDate.toLocaleDateString()} - {dateRange.endDate.toLocaleDateString()}
          </div>
        )}
      </section>

      <section className="jv-section">
        <h2>Basic Usage</h2>
        <CodeBlock code={basicExample} />
      </section>

      <section className="jv-section">
        <h2>Features</h2>
        <ul className="jv-feature-list">
          <li>✅ Dual calendar view</li>
          <li>✅ Predefined ranges (Yesterday, Last 7/15/30 Days, etc.)</li>
          <li>✅ Current/Last Month, Last 3 Months</li>
          <li>✅ Custom date selection</li>
          <li>✅ Highlights all dates in selected range</li>
          <li>✅ Keyboard navigation</li>
        </ul>
      </section>
    </div>
  );
};
