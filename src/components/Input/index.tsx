import React, { ChangeEvent } from "react";

interface Props {
  inputs: Record<string, any>[];
  setInputs: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
  attr: Record<string, any>;
  icon?: Record<string, any>;
  wrapperStyle: string;
  inputSyle: string;
}

const Input: React.FC<Props> = ({
  inputs,
  setInputs,
  attr,
  icon,
  wrapperStyle,
  inputSyle,
}) => {
  const handleInput = (id: string, value: string) => {};

  return (
    <div className={wrapperStyle}>
      <>
        {icon && icon.render()}
        <input
          {...attr}
          className={inputSyle}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInput(e.currentTarget.id, e.currentTarget.value)
          }
        />
      </>
    </div>
  );
};

export default Input;
