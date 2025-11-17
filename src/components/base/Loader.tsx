import React from "react";

interface LoaderProps {
    text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text = "Loading..." }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <i className="ri-loader-4-line animate-spin text-2xl text-gray-400 mb-4"></i>
            <p className="text-gray-500">{text}</p>
        </div>
    );
};

export default Loader;
