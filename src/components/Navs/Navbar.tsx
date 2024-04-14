import { Dispatch, SetStateAction } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/full-logo.png";
import logoOnly from "../../assets/logoOnly.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { MdExpandCircleDown } from "react-icons/md";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import useThemeButton from "../../hooks/useThemeButton";
import { useTranslation } from "react-i18next";

interface Opened {
  menu: boolean;
  calcs: boolean;
  extraCalcs: boolean;
  account: boolean;
  links: boolean;
}

export default function Navbar({
  token,
  setToken,
  opened,
  setOpened,
}: {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  opened: Opened;
  setOpened: Dispatch<SetStateAction<Opened>>;
}) {
  const { i18n } = useTranslation();
  const { theme, toggle } = useThemeButton();
  return (
    <nav className="h-20 fixed top-0 z-[51] flex items-center justify-between mb-[1rem]">
      <div className="w-screen h-full bg-sidebar flex justify-between items-center text-textColor text-xl text-center relative">
        <nav className="flex items-center justify-between sm:text-[1rem] text-[.6rem] my-0">
          <button
            className="relative ml-4"
            onClick={() =>
              setOpened((prev) => {
                return { ...prev, menu: !prev.menu };
              })
            }
          >
            {opened.menu ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </button>
          <div
            className={`${
              opened.menu ? "grid" : "hidden"
            } w-[40vw] bg-sidebar text-start left-0 rounded-xl translate-y-2/4 mt-8 -mx-8`}
          >
            <div className="flex items-center justify-center w-fit mx-2 hover:text-background transition-colors">
              <NavLink to="/">Calculators</NavLink>
              <button
                className="mx-2"
                onClick={() =>
                  setOpened((prev) => {
                    return { ...prev, calcs: !prev.calcs };
                  })
                }
              >
                {opened.calcs ? (
                  <IoIosArrowDropupCircle />
                ) : (
                  <MdExpandCircleDown />
                )}
              </button>
            </div>
            <div className={`${opened.calcs ? "grid" : "hidden"} mx-2`}>
              <NavLink
                className="hover:text-background transition-colors sm:mx-4 mx-[.125rem] "
                to="/"
              >
                Recipe Builder
              </NavLink>
              <NavLink
                className="hover:text-background transition-colors sm:mx-4 mx-[.125rem] "
                to="/NuteCalc/"
              >
                Nutrient Calculator
              </NavLink>
              <div className="flex items-center">
                <NavLink
                  className="hover:text-background transition-colors sm:mx-4 mx-[.125rem] "
                  to="/ExtraCalcs"
                >
                  Extra Calculators
                </NavLink>
                <button
                  onClick={() =>
                    setOpened((prev) => {
                      return { ...prev, extraCalcs: !prev.extraCalcs };
                    })
                  }
                >
                  {opened.extraCalcs ? (
                    <IoIosArrowDropupCircle />
                  ) : (
                    <MdExpandCircleDown />
                  )}
                </button>
              </div>
              <div className={`${opened.extraCalcs ? "grid" : "hidden"} mx-8`}>
                <Link to="/ExtraCalcs/" className="hover:text-background ">
                  ABV Calculator
                </Link>
                <Link
                  to="/ExtraCalcs/brixCalc"
                  className="hover:text-background "
                >
                  Brix Conversion
                </Link>
                <Link to="/ExtraCalcs/estOG" className="hover:text-background ">
                  Estimated OG
                </Link>
                <Link
                  to="/ExtraCalcs/benchTrials"
                  className="hover:text-background "
                >
                  Bench Trials
                </Link>
                <Link
                  to="/ExtraCalcs/stabilizers"
                  className="hover:text-background "
                >
                  Stabilizers
                </Link>
                <Link
                  to="/ExtraCalcs/RefractometerCorrection"
                  className="hover:text-background "
                >
                  Refractometer Correction
                </Link>
                <Link
                  to="/ExtraCalcs/tempCorrection"
                  className="hover:text-background "
                >
                  Temperature Correction
                </Link>
                <Link
                  to="/ExtraCalcs/blending"
                  className="hover:text-background pb-2"
                >
                  Blending
                </Link>
              </div>
            </div>
            <div className="flex items-center w-fit mx-2 hover:text-background transition-colors ">
              <NavLink to={"/account"}>Account</NavLink>
              <button
                className="mx-2"
                onClick={() =>
                  setOpened((prev) => {
                    return { ...prev, account: !prev.account };
                  })
                }
              >
                {opened.account ? (
                  <IoIosArrowDropupCircle />
                ) : (
                  <MdExpandCircleDown />
                )}
              </button>
            </div>
            <div className={`${opened.account ? "block" : "hidden"} mx-2`}>
              {token ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setToken(null);
                  }}
                  className="hover:text-background transition-colors sm:mx-4 mx-2 "
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  className="hover:text-background transition-colors sm:mx-4 mx-2 "
                  to="/login"
                >
                  Login/Register
                </NavLink>
              )}
            </div>
            <div className="flex items-center w-fit mx-2 hover:text-background transition-colors">
              <NavLink to="/about">Additional Links</NavLink>
              <button
                className="mx-2"
                onClick={() =>
                  setOpened((prev) => {
                    return { ...prev, links: !prev.links };
                  })
                }
              >
                {opened.links ? (
                  <IoIosArrowDropupCircle />
                ) : (
                  <MdExpandCircleDown />
                )}
              </button>
            </div>
            <div className={`${opened.links ? "grid" : "hidden"} mx-2`}>
              <NavLink
                className="hover:text-background transition-colors sm:mx-4 mx-[.125rem] "
                to="/about"
              >
                About
              </NavLink>
              <NavLink
                className="hover:text-background transition-colors sm:mx-4 mx-[.125rem] "
                to="/contact"
              >
                Contact
              </NavLink>
            </div>
          </div>
        </nav>
        <div className="flex h-full justify-center items-center">
          <button onClick={toggle} className="mr-[2rem]">
            {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
          </button>
          <select
            name=""
            id=""
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
            }}
            className="mr-[2rem] h-fit bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background"
          >
            <option value="en">EN</option>
            <option value="de">DE</option>
          </select>
          <Link
            className="bg-background w-[3rem] md:flex md:w-24 lg:w-52 h-full left-0 border-[1px] border-sidebar hover:opacity-80 transition-all"
            to="/"
          >
            <span className="w-full h-full flex flex-col justify-center items-center">
              <img src={logo} alt="MeadTools logo" className="hidden lg:flex" />
              <img
                src={logoOnly}
                alt="MeadTools logo"
                className="lg:hidden w-[50%]"
              />
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
