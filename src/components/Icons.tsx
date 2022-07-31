import React from 'react';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';

const Icons = () => {
    return (
        <div className="flex flex-row gap gap-6 px-4 py-2 my-4 rounded-3xl text-3xl bg-white">
            <a href="./" className="hover:bg-black hover:text-white p-1 rounded-full">
                <FaDiscord />
            </a>
            <a href="./" className="hover:bg-black hover:text-white p-1 rounded-full">
                <FaGithub />
            </a>
            <a href="./" className="hover:bg-black hover:text-white p-1 rounded-full">
                <FaTwitter />
            </a>
        </div>
    );
}

export default Icons;
