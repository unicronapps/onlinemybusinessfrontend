import React from "react";

const Typography = ({ variant = "p", children, className = "" }) => {
  const variants = {
    h1: "text-3xl font-bold text-primary mb-4",
    h2: "text-2xl font-semibold text-primary mb-4",
    h3: "text-xl font-medium text-primary mb-3",
    p: "text-textSecondary leading-relaxed mb-4",
  };

  const Tag = variant; // Dynamically choose the HTML tag (e.g., h1, h2, etc.)

  return (
    <Tag className={`${variants[variant] || variants.p} ${className}`}>
      {children}
    </Tag>
  );
};

export default Typography;
