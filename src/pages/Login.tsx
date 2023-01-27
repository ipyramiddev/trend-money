import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "pages/Home";

    interface UserData {
    id: string;
    name: string;
}

const Login: React.FC<UserData | null> = () => {

    window.addEventListener("scroll", () => {
        if (window.scrollY > 0) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    });   

    const [user, setUser] = React.useState<UserData | null>(null);
    const handleLogin = () => setUser({ id: "1", name: "bj" });
    const handleLogout = () => setUser(null);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat bg-[url('/public/background2.svg')] min-h-screen overflow-hidden">
  <div className="bg-gray-800 bg-opacity-50 px-16 py-10 backdrop-blur-md max-sm:px-8 border border-[3px] border-dashed rounded-2xl transform transition duration-300 hover:scale-110 shadow-lg">
    <div className="text-white">
      <div className="mb-8 flex flex-col items-center">
        <img src="https://www.seam.money/images/logo.png" width="150" alt="" />
        <h1 className="mb-2 text-2xl">Seam Plus</h1>
        <span className="text-gray-300">Enter Login Details</span>
      </div>
      <form action="#">
        <div className="mb-4 text-lg">
          <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="text" name="name" placeholder="id@email.com" />
        </div>

        <div className="mb-4 text-lg">
          <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="Password" name="name" placeholder="*********" />
        </div>
        <div className="mt-8 flex justify-center text-lg text-black">
          {user ? <></> : <button onClick={handleLogin} type="submit" className="border border-[3px] border-dashed rounded-3xl bg-yellow-400 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Login</button>}
        </div>
      </form>
    </div>
  </div>
</div>
  );
};

export default Login;