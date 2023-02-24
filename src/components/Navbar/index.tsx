import React from "react";
/** Const */
import { images } from "../../const";

interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <nav className="w-full py-2 px-3 bg-blue/[0.9]">
      <div className="max-w-[1440px]">
        <img src={images.pokeball} className="w-[3rem] h-[3rem]" />
      </div>
    </nav>
  );
};

export default Navbar;
