import { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../../utils";
import { LiaUserCircle } from "react-icons/lia";
import { LuClipboardList } from "react-icons/lu";
import { SiSimpleanalytics } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/AuthSlice";

export default function SideNav() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  function handleRouting(index: number) {
    setActiveIndex(index);
  }

  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
  }
  return (
    <div className="sticky w-[20%] h-[95vh] border-r  border-[#DADBF2] left-0 top-0">
      <h2 className="py-5 text-3xl font-bold bg-white text-primary-1 text-center">
        E-Biding
      </h2>
      {navLinks.map((nav, index) => (
        <div
          className={`${
            activeIndex === index
              ? "bg-primary-1 text-white"
              : "bg-transparent text-[#8787A8]"
          } w-full px-4 mt-5 py-3 transition-all flex justify-start items-center gap-2`}
          key={index}
          onClick={() => handleRouting(index)}
        >
          {index === 0 ? (
            <LiaUserCircle />
          ) : index === 1 ? (
            <LuClipboardList />
          ) : (
            <SiSimpleanalytics />
          )}

          <Link to={nav.link}>
            <p>{nav.label}</p>
          </Link>
        </div>
      ))}
      <hr />
      <div
        className="flex py-4 transition-all mt-5 text-primary-1 hover:bg-primary-1 cursor-pointer hover:text-white px-4 justify-start gap-2 items-center"
        onClick={handleLogout}
      >
        <CiLogout size={40} />
        <p className="font-medium leading-4">Logout</p>
      </div>
    </div>
  );
}
