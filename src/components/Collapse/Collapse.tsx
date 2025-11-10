import React, { useState, ReactNode } from 'react';
import './Collapse.css';

export interface CollapsePanel {
  key: string;
  header: string | ReactNode;
  content: ReactNode;
  icon?: string;
  disabled?: boolean;
  extra?: ReactNode;
}

export interface CollapseProps {
  panels: CollapsePanel[];
  defaultActiveKeys?: string[];
  activeKeys?: string[];
  onChange?: (keys: string[]) => void;
  accordion?: boolean;
  bordered?: boolean;
  expandIconPosition?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  ghost?: boolean;
  className?: string;
}

export const Collapse: React.FC<CollapseProps> = ({
  panels,
  defaultActiveKeys = [],
  activeKeys: controlledActiveKeys,
  onChange,
  accordion = false,
  bordered = true,
  expandIconPosition = 'left',
  size = 'medium',
  ghost = false,
  className = '',
}) => {
  const [internalActiveKeys, setInternalActiveKeys] = useState<string[]>(defaultActiveKeys);

  const isControlled = controlledActiveKeys !== undefined;
  const activeKeys = isControlled ? controlledActiveKeys : internalActiveKeys;

  const handlePanelClick = (key: string, disabled?: boolean) => {
    if (disabled) return;

    let newActiveKeys: string[];

    if (accordion) {
      // Accordion mode: only one panel can be open
      newActiveKeys = activeKeys.includes(key) ? [] : [key];
    } else {
      // Collapse mode: multiple panels can be open
      if (activeKeys.includes(key)) {
        newActiveKeys = activeKeys.filter((k) => k !== key);
      } else {
        newActiveKeys = [...activeKeys, key];
      }
    }

    if (!isControlled) {
      setInternalActiveKeys(newActiveKeys);
    }
    onChange?.(newActiveKeys);
  };

  return (
    <div
      className={`jv-collapse ${bordered ? 'bordered' : ''} ${ghost ? 'ghost' : ''} ${size} ${className}`}
    >
      {panels.map((panel) => {
        const isActive = activeKeys.includes(panel.key);
        return (
          <div
            key={panel.key}
            className={`jv-collapse-panel ${isActive ? 'active' : ''} ${
              panel.disabled ? 'disabled' : ''
            }`}
          >
            <div
              className={`jv-collapse-header ${expandIconPosition}`}
              onClick={() => handlePanelClick(panel.key, panel.disabled)}
              role="button"
              tabIndex={panel.disabled ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePanelClick(panel.key, panel.disabled);
                }
              }}
            >
              <div className="jv-collapse-header-content">
                {panel.icon && <span className="jv-collapse-icon-custom">{panel.icon}</span>}
                <span className="jv-collapse-header-text">{panel.header}</span>
              </div>
              {panel.extra && <div className="jv-collapse-extra">{panel.extra}</div>}
              <span className={`jv-collapse-arrow ${isActive ? 'active' : ''}`}>▶</span>
            </div>
            <div className={`jv-collapse-content ${isActive ? 'active' : ''}`}>
              <div className="jv-collapse-content-inner">{panel.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
