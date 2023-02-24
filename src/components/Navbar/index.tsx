import React from "react";
/** Const */
import { images, colors } from "../../const";

interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <nav className={`w-full max-w-[1440px] p-3 bg-[${colors.blue}]`}>
      <img src={images.pokeball} />
    </nav>
  );
};

export default Navbar;
