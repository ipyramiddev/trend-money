import React from 'react';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';

interface Props {
    discordUrl?: string;
    githubUrl?: string;
    twitterUrl?: string;
}



const Icons = ({discordUrl, githubUrl, twitterUrl}:Props) => {
    return (
        <div className="flex flex-row gap gap-4 px-3 py-2 rounded-xl text-2xl">
            <a href={discordUrl} className={"icon rounded-full " + discordUrl ? "":"opacity-40"}>
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
