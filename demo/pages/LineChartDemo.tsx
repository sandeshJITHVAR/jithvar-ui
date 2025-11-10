import React, { useState } from 'react';
import { LineChart } from '../../src';
import { PageWrapper } from '../components/PageWrapper';
import { CodeBlock } from '../components/CodeBlock';

const LineChartDemo: React.FC = () => {
  const [smooth, setSmooth] = useState(true);
  const [showFill, setShowFill] = useState(true);
  const [showPoints, setShowPoints] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showLegend, setShowLegend] = useState(true);

  // Single dataset data
  const singleData = [
    { label: 'Jan', value: 30 },
    { label: 'Feb', value: 45 },
    { label: 'Mar', value: 38 },
    { label: 'Apr', value: 55 },
    { label: 'May', value: 48 },
    { label: 'Jun', value: 62 },
  ];

  // Multiple datasets
  const multipleDatasets = [
    {
      label: 'Revenue',
      data: [
        { label: 'Jan', value: 45000 },
        { label: 'Feb', value: 52000 },
        { label: 'Mar', value: 48000 },
        { label: 'Apr', value: 61000 },
        { label: 'May', value: 55000 },
        { label: 'Jun', value: 67000 },
      ],
      color: '#3b82f6',
    },
    {
      label: 'Expenses',
      data: [
        { label: 'Jan', value: 32000 },
        { label: 'Feb', value: 38000 },
        { label: 'Mar', value: 35000 },
        { label: 'Apr', value: 42000 },
        { label: 'May', value: 39000 },
        { label: 'Jun', value: 45000 },
      ],
      color: '#ef4444',
    },
    {
      label: 'Profit',
      data: [
        { label: 'Jan', value: 13000 },
        { label: 'Feb', value: 14000 },
        { label: 'Mar', value: 13000 },
        { label: 'Apr', value: 19000 },
        { label: 'May', value: 16000 },
        { label: 'Jun', value: 22000 },
      ],
      color: '#10b981',
    },
  ];

  // Temperature data
  const temperatureData = [
    { label: '00:00', value: 18 },
    { label: '04:00', value: 16 },
    { label: '08:00', value: 20 },
    { label: '12:00', value: 28 },
    { label: '16:00', value: 32 },
    { label: '20:00', value: 26 },
    { label: '24:00', value: 20 },
  ];

  // Stock price data
  const stockData = [
    { label: 'Week 1', value: 145.2 },
    { label: 'Week 2', value: 152.8 },
    { label: 'Week 3', value: 148.5 },
    { label: 'Week 4', value: 156.3 },
    { label: 'Week 5', value: 162.1 },
    { label: 'Week 6', value: 158.9 },
    { label: 'Week 7', value: 168.4 },
    { label: 'Week 8', value: 172.6 },
  ];

  const basicUsageCode = `import { LineChart } from 'jithvar-ui';

const data = [
  { label: 'Jan', value: 30 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 38 },
  { label: 'Apr', value: 55 },
  { label: 'May', value: 48 },
  { label: 'Jun', value: 62 },
];

<LineChart 
  data={data}
  width={600}
  height={400}
/>`;

  const multipleDatasetsCode = `const datasets = [
  {
    label: 'Revenue',
    data: [
      { label: 'Jan', value: 45000 },
      { label: 'Feb', value: 52000 },
      // ... more data
    ],
    color: '#3b82f6',
  },
  {
    label: 'Expenses',
    data: [
      { label: 'Jan', value: 32000 },
      { label: 'Feb', value: 38000 },
      // ... more data
    ],
    color: '#ef4444',
  },
];

<LineChart 
  datasets={datasets}
  width={800}
  height={400}
  showLegend={true}
/>`;

  const customizationCode = `<LineChart 
  data={data}
  width={600}
  height={400}
  smooth={false}           // Straight lines instead of curves
  showFill={true}          // Fill area under line
  showPoints={true}        // Show data points
  showGrid={true}          // Show grid lines
  showLegend={false}       // Hide legend (for single dataset)
  color="#10b981"          // Custom line color
/>`;

  return (
    <PageWrapper
      title="LineChart Component"
      description="Display data trends over time with smooth curves and interactive points"
    >
      {/* Basic Usage */}
      <section className="demo-section">
        <h2>Basic Usage</h2>
        <p>A simple line chart with smooth curves and fill area.</p>
        <div className="demo-container">
          <LineChart data={singleData} width={700} height={300} />
        </div>
        <CodeBlock code={basicUsageCode} />
      </section>

      {/* Multiple Datasets */}
      <section className="demo-section">
        <h2>Multiple Datasets</h2>
        <p>Display multiple lines to compare different data series.</p>
        <div className="demo-container">
          <LineChart datasets={multipleDatasets} width={800} height={400} showLegend={true} />
        </div>
        <CodeBlock code={multipleDatasetsCode} />
      </section>

      {/* Customization Options */}
      <section className="demo-section">
        <h2>Customization Options</h2>
        <p>Control various aspects of the line chart appearance.</p>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={smooth}
              onChange={(e) => setSmooth(e.target.checked)}
            />
            Smooth Curves
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={showFill}
              onChange={(e) => setShowFill(e.target.checked)}
            />
            Show Fill
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={showPoints}
              onChange={(e) => setShowPoints(e.target.checked)}
            />
            Show Points
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
            />
            Show Grid
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={showLegend}
              onChange={(e) => setShowLegend(e.target.checked)}
            />
            Show Legend
          </label>
        </div>
        <div className="demo-container">
          <LineChart
            data={singleData}
            width={700}
            height={300}
            smooth={smooth}
            showFill={showFill}
            showPoints={showPoints}
            showGrid={showGrid}
            showLegend={showLegend}
            color="#8b5cf6"
          />
        </div>
        <CodeBlock code={customizationCode} />
      </section>

      {/* Temperature Trend */}
      <section className="demo-section">
        <h2>Temperature Trend</h2>
        <p>Track temperature changes throughout the day.</p>
        <div className="demo-container">
          <LineChart
            data={temperatureData}
            width={700}
            height={300}
            color="#f59e0b"
            smooth={true}
            showFill={true}
          />
        </div>
      </section>

      {/* Stock Price */}
      <section className="demo-section">
        <h2>Stock Price Chart</h2>
        <p>Monitor stock price movements with straight lines.</p>
        <div className="demo-container">
          <LineChart
            data={stockData}
            width={700}
            height={300}
            color="#10b981"
            smooth={false}
            showFill={false}
            showPoints={true}
          />
        </div>
      </section>

      {/* API Reference */}
      <section className="demo-section">
        <h2>API Reference</h2>
        <div className="api-table-container">
          <table className="api-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>data</td>
                <td>LineChartDataPoint[]</td>
                <td>-</td>
                <td>Single dataset array (use this OR datasets)</td>
              </tr>
              <tr>
                <td>datasets</td>
                <td>LineChartDataset[]</td>
                <td>-</td>
                <td>Multiple datasets array (use this OR data)</td>
              </tr>
              <tr>
                <td>width</td>
                <td>number</td>
                <td>600</td>
                <td>Chart width in pixels</td>
              </tr>
              <tr>
                <td>height</td>
                <td>number</td>
                <td>400</td>
                <td>Chart height in pixels</td>
              </tr>
              <tr>
                <td>color</td>
                <td>string</td>
                <td>'#3b82f6'</td>
                <td>Line color for single dataset</td>
              </tr>
              <tr>
                <td>smooth</td>
                <td>boolean</td>
                <td>true</td>
                <td>Use smooth curves instead of straight lines</td>
              </tr>
              <tr>
                <td>showFill</td>
                <td>boolean</td>
                <td>true</td>
                <td>Fill area under the line</td>
              </tr>
              <tr>
                <td>showPoints</td>
                <td>boolean</td>
                <td>true</td>
                <td>Show data points on the line</td>
              </tr>
              <tr>
                <td>showGrid</td>
                <td>boolean</td>
                <td>true</td>
                <td>Show grid lines</td>
              </tr>
              <tr>
                <td>showLegend</td>
                <td>boolean</td>
                <td>false</td>
                <td>Show legend (for multiple datasets)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: '30px' }}>TypeScript Interfaces</h3>
        <CodeBlock
          code={`interface LineChartDataPoint {
  label: string;      // X-axis label
  value: number;      // Y-axis value
}

interface LineChartDataset {
  label: string;                  // Dataset name
  data: LineChartDataPoint[];     // Data points
  color?: string;                 // Line color
}

interface LineChartProps {
  data?: LineChartDataPoint[];    // Single dataset
  datasets?: LineChartDataset[];  // Multiple datasets
  width?: number;                 // Chart width
  height?: number;                // Chart height
  color?: string;                 // Default line color
  smooth?: boolean;               // Smooth curves
  showFill?: boolean;             // Fill area
  showPoints?: boolean;           // Show points
  showGrid?: boolean;             // Show grid
  showLegend?: boolean;           // Show legend
}`}
        />
      </section>

      {/* Features */}
      <section className="demo-section">
        <h2>Features</h2>
        <ul className="feature-list">
          <li>✅ Single or multiple dataset support</li>
          <li>✅ Smooth bezier curves or straight lines</li>
          <li>✅ Animated line drawing effect</li>
          <li>✅ Interactive points with hover effects</li>
          <li>✅ Optional fill area with gradient</li>
          <li>✅ Configurable grid lines</li>
          <li>✅ Legend for multiple datasets</li>
          <li>✅ Auto-scaling for optimal display</li>
          <li>✅ Custom colors per dataset</li>
          <li>✅ Responsive and performant</li>
        </ul>
      </section>
    </PageWrapper>
  );
};

export { LineChartDemo };
