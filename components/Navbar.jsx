import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3  rounded-sm">
      <Link href={"/"} className="font-bold text-white ">
        Javed
      </Link>
      <Link href={"/addTopic"} className="bg-white p-2 rounded">
        Add Todo
      </Link>
    </nav>
  );
};

export default Navbar;
