import React, { type CSSProperties } from "react";

interface PageProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
  navigateTo?: string;
  styleHave?: boolean;
}

export const PageWrapper: React.FC<PageProps> = ({
  children,
  styleHave = true,
}) => {
  const containerStyle: CSSProperties = styleHave
    ? {
        backgroundColor: "var(--bg-app)",
        position: "relative",
        margin: "0 auto",
        padding: "12px 16px",
        width: "100%",
        lineHeight: "20px",
        boxSizing: "border-box",
        letterSpacing: "-0.24px",
      }
    : {};

  return <div style={containerStyle}>{children}</div>;
};
