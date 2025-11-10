import React, { useState } from 'react';
import { DatePicker } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const DatePickerDemo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const basicExample = `import { DatePicker } from 'jithvar-ui';

const [selectedDate, setSelectedDate] = useState<Date | null>(null);

<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
/>`;

  const constraintsExample = `<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  minDate={new Date()} // No past dates
  maxDate={new Date('2025-12-31')} // Max date
/>`;

  return (
    <div className="jv-demo-page">
      <h1>📆 DatePicker</h1>
      <p className="jv-subtitle">Single date selection with constraints</p>

      <section className="jv-section">
        <h2>Live Demo</h2>
        <div className="jv-demo-preview">
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder="Select a date"
          />
        </div>
        {selectedDate && (
          <div className="jv-info-box">
            Selected: {selectedDate.toLocaleDateString()}
          </div>
        )}
      </section>

      <section className="jv-section">
        <h2>Basic Usage</h2>
        <CodeBlock code={basicExample} />
      </section>

      <section className="jv-section">
        <h2>With Constraints</h2>
        <CodeBlock code={constraintsExample} />
      </section>

      <section className="jv-section">
        <h2>Features</h2>
        <ul className="jv-feature-list">
          <li>✅ Single date selection</li>
          <li>✅ Min/max date constraints</li>
          <li>✅ Disabled state support</li>
          <li>✅ Clear button</li>
          <li>✅ Custom placeholder</li>
          <li>✅ Keyboard navigation</li>
        </ul>
      </section>
    </div>
  );
};
