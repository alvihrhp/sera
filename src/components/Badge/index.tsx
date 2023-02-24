import React from "react";

interface Props {
  style: string;
  text: string;
  textStyle: string;
}

const Badge: React.FC<Props> = ({ style, text, textStyle }) => {
  return (
    <div className={`shadow rounded-lg ${style}`}>
      <span className={textStyle}>{text}</span>
    </div>
  );
};

export default Badge;
