import React, { useState } from 'react';
import { SearchableSelect, Option } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const SearchableSelectDemo: React.FC = () => {
  const [singleSelect, setSingleSelect] = useState<string | number | (string | number)[]>('');
  const [multiSelect, setMultiSelect] = useState<string | number | (string | number)[]>([]);

  const options: Option[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Mango', value: 'mango' },
    { label: 'Grape', value: 'grape' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Pineapple', value: 'pineapple' },
    { label: 'Watermelon', value: 'watermelon' },
  ];

  const basicExample = `import { SearchableSelect, Option } from 'jithvar-ui';

const options: Option[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
];

const [value, setValue] = useState('');

<SearchableSelect
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Select a fruit..."
/>`;

  const multipleExample = `<SearchableSelect
  options={options}
  value={selectedValues}
  onChange={setSelectedValues}
  multiple={true}
  placeholder="Select multiple fruits..."
/>`;

  const apiExample = `<SearchableSelect
  apiUrl="https://api.example.com/search"
  apiSearchParam="q"
  minSearchLength={3}
  value={value}
  onChange={setValue}
  placeholder="Type to search..."
/>`;

  return (
    <div className="jv-demo-page">
      <h1>🔍 SearchableSelect</h1>
      <p className="jv-subtitle">Searchable dropdown with single/multiple selection</p>

      <section className="jv-section">
        <h2>Single Selection</h2>
        <div className="jv-demo-preview">
          <SearchableSelect
            options={options}
            value={singleSelect}
            onChange={setSingleSelect}
            placeholder="Select a fruit..."
          />
        </div>
        {singleSelect && (
          <div className="jv-info-box">
            Selected: {singleSelect}
          </div>
        )}
      </section>

      <section className="jv-section">
        <h2>Multiple Selection</h2>
        <div className="jv-demo-preview">
          <SearchableSelect
            options={options}
            value={multiSelect}
            onChange={setMultiSelect}
            multiple={true}
            placeholder="Select multiple fruits..."
          />
        </div>
        {Array.isArray(multiSelect) && multiSelect.length > 0 && (
          <div className="jv-info-box">
            Selected: {multiSelect.join(', ')}
          </div>
        )}
      </section>

      <section className="jv-section">
        <h2>Basic Usage</h2>
        <CodeBlock code={basicExample} />
      </section>

      <section className="jv-section">
        <h2>Multiple Selection</h2>
        <CodeBlock code={multipleExample} />
      </section>

      <section className="jv-section">
        <h2>API-Based Search</h2>
        <CodeBlock code={apiExample} />
      </section>

      <section className="jv-section">
        <h2>Features</h2>
        <ul className="jv-feature-list">
          <li>✅ Single/multiple selection modes</li>
          <li>✅ Static options or API-based data</li>
          <li>✅ Server-side search (requires 3+ characters)</li>
          <li>✅ Debounced search (300ms)</li>
          <li>✅ Custom option rendering</li>
          <li>✅ Tag display for multiple selections</li>
          <li>✅ Keyboard navigation</li>
        </ul>
      </section>
    </div>
  );
};
