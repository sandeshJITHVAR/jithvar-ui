import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './demo.css';

// Page components
import { Installation } from './pages/Installation';
import { DateRangePickerDemo } from './pages/DateRangePickerDemo';
import { DatePickerDemo } from './pages/DatePickerDemo';
import { SearchableSelectDemo } from './pages/SearchableSelectDemo';
import { RangeSliderDemo } from './pages/RangeSliderDemo';
import { JTableDemo } from './pages/JTableDemo';
import { ConfigurationGuide } from './pages/ConfigurationGuide';

const navItems = [
  { path: '/', label: '📦 Installation', component: Installation },
  { path: '/configuration', label: '⚙️ Configuration Guide', component: ConfigurationGuide },
  { path: '/jtable', label: '📊 JTable', component: JTableDemo },
  { path: '/date-range-picker', label: '📅 DateRangePicker', component: DateRangePickerDemo },
  { path: '/date-picker', label: '📆 DatePicker', component: DatePickerDemo },
  { path: '/searchable-select', label: '🔍 SearchableSelect', component: SearchableSelectDemo },
  { path: '/range-slider', label: '🎚️ RangeSlider', component: RangeSliderDemo },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="jv-sidebar">
      <div className="jv-sidebar-header">
        <h1>🎨 Jithvar UI</h1>
        <p className="jv-sidebar-version">v1.0.0</p>
      </div>
      <nav className="jv-sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`jv-sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="jv-sidebar-footer">
        <a href="https://github.com/yourusername/jithvar-ui" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://www.npmjs.com/package/jithvar-ui" target="_blank" rel="noopener noreferrer">
          npm
        </a>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="jv-demo-container">
        <Sidebar />
        <main className="jv-demo-main">
          <Routes>
            {navItems.map((item) => (
              <Route key={item.path} path={item.path} element={<item.component />} />
            ))}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
