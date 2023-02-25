import React from "react";
/** Const */
import { images } from "../../const";
/** React Router Dom */
import { NavigateFunction, useNavigate } from "react-router-dom";

interface Props {}

const Navbar: React.FC<Props> = () => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <nav className="w-full py-2 px-3 bg-blue/[0.9]">
      <div className="max-w-[1440px]">
        <img
          src={images.pokeball}
          className="w-[3rem] h-[3rem] cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
    </nav>
  );
};

export default Navbar;
