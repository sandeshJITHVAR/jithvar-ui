import React from 'react';

interface PageWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ title, description, children }) => {
  return (
    <div className="jv-page-wrapper">
      <div className="jv-page-header">
        <h1 className="jv-page-title">{title}</h1>
        {description && <p className="jv-page-description">{description}</p>}
      </div>
      <div className="jv-page-content">
        {children}
      </div>
    </div>
  );
};
