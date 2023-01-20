import React from "react";

export const Wrapper = React.memo(
  ({ children }: { children: JSX.Element[] }) => {
    return <div className="my-2">{children}</div>;
  }
);
