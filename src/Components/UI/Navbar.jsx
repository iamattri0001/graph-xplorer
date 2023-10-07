import { PiGraphDuotone } from "react-icons/pi";
const Navbar = () => {
  return (
    <nav className="absolute w-full bg-black/10 py-4 z-10 flex items-center justify-center text-3xl pt-3">
      <a href="/">
        <div className="flex text-wedgewood-50 hover:text-wedgewood-400 transition-all flex-wrap gap-x-3 items-center justify-center">
          <PiGraphDuotone />
          <h1 className="title-font">Graph Xplorer</h1>
        </div>
      </a>
    </nav>
  );
};

export default Navbar;
