import React from "react";

export default function AnchorBlank({ to, children, className }) {
  return (
    <a href={to} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}
