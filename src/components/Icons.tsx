import React from 'react';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';

interface Props {
    discordUrl?: string;
    githubUrl?: string;
    twitterUrl?: string;
}

const Icons = ({discordUrl, githubUrl, twitterUrl}:Props) => {
    return (
        <div className="flex flex-row gap gap-6 px-4 py-2 my-4 rounded-3xl text-3xl bg-white">
            <a href={discordUrl} className="icon rounded-full">
                <FaDiscord />
            </a>
            <a href={githubUrl} className="icon rounded-full">
                <FaGithub />
            </a>
            <a href={twitterUrl} className="icon rounded-full">
                <FaTwitter />
            </a>
        </div>
    );
}

export default Icons;
