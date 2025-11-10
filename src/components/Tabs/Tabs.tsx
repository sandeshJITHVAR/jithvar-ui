import React, { useState, ReactNode } from 'react';
import './Tabs.css';

export interface Tab {
  key: string;
  label: string;
  icon?: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (key: string) => void;
  variant?: 'default' | 'pills' | 'underline' | 'boxed';
  size?: 'small' | 'medium' | 'large';
  position?: 'top' | 'left' | 'right';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  animated?: boolean;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultActiveKey,
  activeKey: controlledActiveKey,
  onChange,
  variant = 'default',
  size = 'medium',
  position = 'top',
  color = 'primary',
  animated = true,
  className = '',
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState(
    defaultActiveKey || tabs[0]?.key || ''
  );

  const isControlled = controlledActiveKey !== undefined;
  const activeKey = isControlled ? controlledActiveKey : internalActiveKey;

  const handleTabClick = (key: string, disabled?: boolean) => {
    if (disabled) return;

    if (!isControlled) {
      setInternalActiveKey(key);
    }
    onChange?.(key);
  };

  const activeTab = tabs.find((tab) => tab.key === activeKey);
  const activeIndex = tabs.findIndex((tab) => tab.key === activeKey);

  return (
    <div className={`jv-tabs jv-tabs-${position} ${className}`}>
      <div className={`jv-tabs-nav jv-tabs-${variant} jv-tabs-${size} jv-tabs-${color}`}>
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            className={`jv-tab-button ${activeKey === tab.key ? 'active' : ''} ${
              tab.disabled ? 'disabled' : ''
            }`}
            onClick={() => handleTabClick(tab.key, tab.disabled)}
            disabled={tab.disabled}
            type="button"
          >
            {tab.icon && <span className="jv-tab-icon">{tab.icon}</span>}
            <span className="jv-tab-label">{tab.label}</span>
          </button>
        ))}
        {variant === 'underline' && (
          <div
            className="jv-tabs-indicator"
            style={{
              transform: `translateX(${activeIndex * 100}%)`,
              width: `${100 / tabs.length}%`,
            }}
          />
        )}
      </div>
      <div className={`jv-tabs-content ${animated ? 'animated' : ''}`}>
        {activeTab?.content}
      </div>
    </div>
  );
};
