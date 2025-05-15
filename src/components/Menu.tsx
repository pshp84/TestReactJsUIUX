import { useState, useRef } from "react";
import { close, menu } from "../assets/index";
import { NavLink } from "react-router-dom";
import { Card, List, ListItem, Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import OutsideMenu from "./OutsideMenu";

export function Menu() {
  const [toggle, setToggle] = useState<boolean>(false);
  const ref = useRef(null);

  OutsideMenu(ref, () => {
    setToggle(true);
  });
  const toggleMenu = (e: any) => {
    if (e) {
      e.preventDefault();
    }
    setToggle(true);
  };
  return (
    <div className="flex items-center justify-center px-4 " ref={ref}>
      <img
        src={toggle ? close : menu}
        alt="menu"
        className="w-[28px] h-[28px] object-contain "
        onClick={() => setToggle((prev) => !prev)}
      />
      <div
        className={`${
          !toggle ? "hidden" : "flex"
        } absolute top-14 left-0 w-full `}
        onClick={toggleMenu}
      >
        <Card className=" w-full py-4 sm:px-20 px-6 animate-dropIn rounded-none">
          <div className="p-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div>
          <List>
            <List className="px-0">
              <NavLink to="/Blog">
                <ListItem>Blog</ListItem>
              </NavLink>
              <hr className="my-2 border-blue-gray-50" />
              <NavLink to="/About">
                <ListItem>About</ListItem>
              </NavLink>
              <hr className="my-2 border-blue-gray-50" />
              <NavLink to="/Services">
                <ListItem>Services</ListItem>
              </NavLink>
              <hr className="my-2 border-blue-gray-50" />
              <NavLink to={"/register"} className={"w-full"}>
                <button
                  type="button"
                  className="cursor-pointer flex flex-row justify-center items-start py-4 px-8 bg-[#7A9CA5] rounded-[4px] overflow-hidden group relative "
                >
                  <div className="absolute inset-0 w-0 bg-[#5C8692] transition-all duration-[200ms] ease-out group-hover:w-full"></div>
                  <span className="text-white font-normal font-manrope text-[16px] uppercase leading-[17.5px] relative ">
                    Register
                  </span>
                </button>
              </NavLink>
            </List>
          </List>
        </Card>
      </div>
    </div>
  );
}
