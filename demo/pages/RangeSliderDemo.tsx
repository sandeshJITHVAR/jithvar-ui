import React, { useState } from 'react';
import { RangeSlider } from '../../src';
import { CodeBlock } from '../components/CodeBlock';

export const RangeSliderDemo: React.FC = () => {
  const [range, setRange] = useState<[number, number]>([20, 80]);
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 500]);

  const basicExample = `import { RangeSlider } from 'jithvar-ui';

const [range, setRange] = useState<[number, number]>([20, 80]);

<RangeSlider
  min={0}
  max={100}
  value={range}
  onChange={setRange}
/>`;

  const advancedExample = `<RangeSlider
  min={0}
  max={1000}
  step={10}
  value={priceRange}
  onChange={setPriceRange}
  showLabels={true}
  showTooltip={true}
  formatLabel={(value) => \`$\${value}\`}
/>`;

  return (
    <div className="jv-demo-page">
      <h1>🎚️ RangeSlider</h1>
      <p className="jv-subtitle">Dual-handle range slider for min/max selection</p>

      <section className="jv-section">
        <h2>Basic Range</h2>
        <div className="jv-demo-preview">
          <RangeSlider
            min={0}
            max={100}
            value={range}
            onChange={setRange}
            showLabels={true}
            showTooltip={true}
          />
        </div>
        <div className="jv-info-box">
          Selected range: {range[0]} - {range[1]}
        </div>
      </section>

      <section className="jv-section">
        <h2>Price Range</h2>
        <div className="jv-demo-preview">
          <RangeSlider
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onChange={setPriceRange}
            showLabels={true}
            showTooltip={true}
            formatLabel={(value) => `$${value}`}
          />
        </div>
        <div className="jv-info-box">
          Selected price range: ${priceRange[0]} - ${priceRange[1]}
        </div>
      </section>

      <section className="jv-section">
        <h2>Basic Usage</h2>
        <CodeBlock code={basicExample} />
      </section>

      <section className="jv-section">
        <h2>With Custom Formatting</h2>
        <CodeBlock code={advancedExample} />
      </section>

      <section className="jv-section">
        <h2>Features</h2>
        <ul className="jv-feature-list">
          <li>✅ Dual handles for min/max selection</li>
          <li>✅ Customizable min/max/step</li>
          <li>✅ Labels and tooltips</li>
          <li>✅ Custom label formatting</li>
          <li>✅ Smooth dragging with visual feedback</li>
          <li>✅ Keyboard support</li>
          <li>✅ Touch-friendly</li>
        </ul>
      </section>
    </div>
  );
};
