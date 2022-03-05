import React from "react";
import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<Props> = ({ children, className }) => (
  <div className="l-container">
    <div className="l-row">
      <div className={classNames([className, "l-col-full"])}>{children}</div>
    </div>
  </div>
);
