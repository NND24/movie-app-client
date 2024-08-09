import { useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

const ThemeSwitcher = () => {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className='flex items-center justify-center mx-4'>
      <button onClick={() => darkModeHandler()}>
        {dark && <BiSun className='cursor-pointer' fill='white' size={25} />}
        {!dark && <BiMoon className='cursor-pointer' fill='black' size={25} />}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
