import React from "react";

interface Props {
  wrapperStyle: string;
  children: React.ReactNode;
  contentStyle: string;
  action?: (...args: any) => void;
}

const Card: React.FC<Props> = ({
  wrapperStyle,
  children,
  contentStyle,
  action,
}) => {
  return (
    <div
      className={`rounded shadow ${wrapperStyle}`}
      onClick={() => (action ? action() : null)}
    >
      <div className={contentStyle}>{children}</div>
    </div>
  );
};

export default Card;
