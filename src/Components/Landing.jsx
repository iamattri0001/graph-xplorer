import React from "react";
import { FaCode } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className="text-wedgewood-200 items-center justify-center flex flex-col min-h-screen gap-y-10">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-[85vw] md:w-[75vw] lg:w-[60vw] py-8 px-8 rounded gap-y-10 shadow-2xl backdrop-blur-md flex items-center justify-center flex-col">
          <div className="flex items-center justify-center flex-col gap-y-2">
            <h1 className="text-3xl md:text-4xl text-center">
              <span className="title-font text-node">Graph Xplorer</span>: Graph
              Adventure Begins Here!
            </h1>
            <p className="text-center">
              Hey there! Welcome to Graph Xplorer, my passion project designed
              to make graph exploration a breeze. 🚀
            </p>
          </div>
          <span className="text-lg">What's Graph Xplorer all about?</span>

          <ul className="flex items-start flex-col gap-y-4 lg:flex-row gap-x-4 justify-between">
            <li className="bg-black/30 px-3 py-2 rounded-lg hover:bg-black/50">
              <b>🌟 Interactive Playground:</b> Dive into the world of graphs on
              an interactive canvas. Create, edit, and play with graphs like a
              pro.
            </li>

            <li className="bg-black/30 px-3 py-2 rounded-lg hover:bg-black/50">
              <b>🎥 Algorithm Showtime:</b> Ever wondered how DFS, BFS,
              Dijkstra's, and more actually work? Graph Xplorer brings them to
              life with awesome animations.
            </li>
            <li className="bg-black/30 px-3 py-2 rounded-lg hover:bg-black/50">
              <b>🎨 Make It Yours: </b>Customize your graphs and tweak algorithm
              settings to match your style and learning pace.
            </li>
          </ul>
          <div className="flex items-center justify-center gap-x-5">
            <Link
              to="/explore"
              className="btn px-4 py-2 flex items-center justify-center gap-x-2"
            >
              <FaCode /> Xplore
            </Link>
            <a
              href="https://github.com/iamattri0001/graph-xplorer"
              className="btn-secondary rounded-sm flex items-center justify-center gap-x-2"
              target="_blank"
            >
              <FaGithub /> Github
            </a>
          </div>
        </div>
      </div>
      <div
        id="footer"
        className=" backdrop-blur-md w-full flex items-center justify-center py-2"
      >
        <Link
          href="https://www.linkedin.com/in/deepanshu-attri-17a895241/"
          target="_blank"
          className="text-wedgewood-400 hover:text-wedgewood-300"
        >
          @Deepanshu Attri
        </Link>
      </div>
    </div>
  );
};

export default Landing;
