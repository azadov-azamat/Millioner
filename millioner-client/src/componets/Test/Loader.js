import React from "react";
import "./Loader.css";
function Loader() {
    return (
        <div className="loading-container">
            <span className="black">
                <svg
                    width="32"
                    height="64"
                    viewBox="0 0 32 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M31 31C31 48.1208 17.1208 62 5.72205e-06 62C5.72205e-06 62 0.00019598 50.6208 0.00019598 33.5C0.00019598 16.3792 5.72205e-06 0 5.72205e-06 0C17.1208 0 31 13.8792 31 31Z"
                        fill="#313E47"
                    />
                </svg>
            </span>
            <span className="blue">
                <svg
                    width="32"
                    height="64"
                    viewBox="0 0 32 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M31 31C31 48.1208 17.1208 62 5.72205e-06 62C5.72205e-06 62 0.00019598 50.6208 0.00019598 33.5C0.00019598 16.3792 5.72205e-06 0 5.72205e-06 0C17.1208 0 31 13.8792 31 31Z"
                        fill="#04A6FB"
                    />
                </svg>
            </span>
            <span className="text">
                <img src={"/assets/img/logo-text-only.png"} alt="text-logo" />
            </span>
        </div>
    );
}

export default Loader;
