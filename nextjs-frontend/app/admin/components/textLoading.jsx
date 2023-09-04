'use client'
import React, { useEffect } from 'react';

export default function TextLoading({ key, height, width, paddingX, paddingY }) {
    console.log(key)
    useEffect(() => {
        
        const setStyle = () => {
            const target = document.getElementById(key);
            if (paddingX) {
                // Horizontal
                target.style.paddingLeft = `${paddingX / 2}px`;
                target.style.paddingRight = `${paddingX / 2}px`;
            }
            if (paddingY) {
                // Vertical
                target.style.paddingTop = `${paddingY / 2}px`;
                target.style.paddingBottom = `${paddingY / 2}px`;
            }
            if (height && height !== 0) {
                target.style.height = `${height}px`;
            }
            if (width && width !== 0) {
                target.style.width = `${width}px`;
            }
        };
        
        setStyle();
    }, []);

    if (key != undefined ) {
        return (
            <div
                id={key}
                className="skeleton-line min-h-[20px]"
            >
            </div>
        );
    } else {
        return (
            <p className='text-red-800 bg-red-400 py-4 px-8'>
                Please provide both "id" and "count" for the component to work.
            </p>
        );
    }
}
