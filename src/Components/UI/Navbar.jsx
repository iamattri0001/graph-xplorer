import { PiGraphDuotone } from "react-icons/pi";
import { HiMenuAlt1 } from "react-icons/hi";
import { BsGithub } from "react-icons/bs";
const Navbar = () => {
  return (
    <nav className="absolute w-full z-10 flex items-center justify-between bg-wedgewood-400  text-3xl px-1">
      <div className="text-wedgewood-950 cursor-pointer">
        <HiMenuAlt1 className="hover:text-wedgewood-900 transition-all" />
      </div>
      <div className="flex py-3 text-wedgewood-950 bg-wedgewood-400 flex-wrap gap-x-3 items-center justify-center">
        <PiGraphDuotone />
        <h1 className="title-font">Graph Xplorer</h1>
      </div>
      <div className="mr-3 cursor-pointer">
        <a
          href="https://github.com/iamattri0001/graph-xplorer"
          rel="noreferrer"
          target="_blank"
        >
          <BsGithub className="hover:text-wedgewood-900 transition-all" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
