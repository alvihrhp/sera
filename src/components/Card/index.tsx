import React from "react";

interface Props {
  wrapperStyle: string;
  children: React.ReactNode;
  contentStyle: string;
}

const Card: React.FC<Props> = ({ wrapperStyle, children, contentStyle }) => {
  return (
    <div className={`rounded shadow ${wrapperStyle}`}>
      <div className={contentStyle}>{children}</div>
    </div>
  );
};

export default Card;
