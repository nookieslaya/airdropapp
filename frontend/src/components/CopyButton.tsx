import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

const CopyButton = ({ url }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <button onClick={handleCopy} className={`flex flex-row  items-center dark:text-white px-1 py-1 ml-2 rounded`}>
            {copied ? <FaCheck className="text-green-500" /> : <FaRegCopy />}
        </button>
    );
};

export default CopyButton;