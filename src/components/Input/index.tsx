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
  const renderNormalInput = () => (
    <input
      {...attr}
      className={inputSyle}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleNormalInput(e.currentTarget.id, e.currentTarget.value)
      }
    />
  );

  const renderCheckboxInput = () => (
    <input
      {...attr}
      checked={attr.value}
      className={inputSyle}
      onChange={(e: any) =>
        handleChecboxInput(e.currentTarget.id, e.currentTarget.value)
      }
    />
  );

  const handleNormalInput = (id: string, value: string | number) => {
    const newInputs = inputs.map((input: Record<string, any>) => {
      return {
        ...input,
        attr: {
          ...input.attr,
          value: id === input.attr.id ? value : input.attr.value,
        },
      };
    });

    setInputs(newInputs);
  };

  const handleChecboxInput = (id: string, value: string) => {
    const newInputs = inputs.map((input: Record<string, any>) => {
      if (id === input.attr.id) {
        return {
          ...input,
          attr: {
            ...input.attr,
            value: value === "false" ? true : false,
          },
        };
      }
      return {
        ...input,
        attr: {
          ...input.attr,
        },
      };
    });
    setInputs(newInputs);
  };

  return (
    <div className={wrapperStyle}>
      <>
        {attr.type === "checkbox" ? (
          renderCheckboxInput()
        ) : attr.type === "text" ||
          attr.type === "number" ||
          attr.type === "email" ||
          attr.type === "password" ? (
          renderNormalInput()
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default Input;
