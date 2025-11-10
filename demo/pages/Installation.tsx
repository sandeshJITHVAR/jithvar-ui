import React from 'react';
import { CodeBlock } from '../components/CodeBlock';

export const Installation: React.FC = () => {
  return (
    <div className="jv-demo-page">
      <h1>📦 Installation</h1>
      <p className="jv-subtitle">Get started with Jithvar UI in your React project</p>

      <section className="jv-section">
        <h2>Install via npm</h2>
        <CodeBlock language="bash" code="npm install jithvar-ui" />
      </section>

      <section className="jv-section">
        <h2>Install via yarn</h2>
        <CodeBlock language="bash" code="yarn add jithvar-ui" />
      </section>

      <section className="jv-section">
        <h2>Basic Usage</h2>
        <p>Import the components you need and their CSS:</p>
        <CodeBlock
          code={`import { JTable, DateRangePicker, SearchableSelect } from 'jithvar-ui';
import 'jithvar-ui/dist/style.css';

function App() {
  return (
    <div>
      <DateRangePicker
        value={{ startDate: null, endDate: null }}
        onChange={(range) => console.log(range)}
      />
    </div>
  );
}`}
        />
      </section>

      <section className="jv-section">
        <h2>Features</h2>
        <div className="jv-features-grid">
          <div className="jv-feature-card">
            <h3>📅 Date Components</h3>
            <p>DatePicker and DateRangePicker with predefined ranges and custom selection</p>
          </div>
          <div className="jv-feature-card">
            <h3>🔍 SearchableSelect</h3>
            <p>Single/multiple selection with static or API-based data and server-side search</p>
          </div>
          <div className="jv-feature-card">
            <h3>🎚️ RangeSlider</h3>
            <p>Dual-handle range slider with customizable min/max/step and tooltips</p>
          </div>
          <div className="jv-feature-card">
            <h3>📊 JTable</h3>
            <p>Advanced data table with server-side pagination, sorting, filtering, and floating actions</p>
          </div>
        </div>
      </section>

      <section className="jv-section">
        <h2>TypeScript Support</h2>
        <p>Jithvar UI is written in TypeScript and includes full type definitions out of the box.</p>
      </section>

      <section className="jv-section">
        <h2>Browser Support</h2>
        <p>Works on all modern browsers including:</p>
        <ul>
          <li>Chrome (latest)</li>
          <li>Firefox (latest)</li>
          <li>Safari (latest)</li>
          <li>Edge (latest)</li>
        </ul>
      </section>
    </div>
  );
};
