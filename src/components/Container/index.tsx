import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="l-container">
      <div className="l-row">
        <div className="l-col-full">{children}</div>
      </div>
    </div>
  );
};
