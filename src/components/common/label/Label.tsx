import React from "react";

export const Label = React.memo(({ label }: { label: string }) => (
  <div className="mb-1 font-bold text-lg text-gray-900">{label}</div>
));
