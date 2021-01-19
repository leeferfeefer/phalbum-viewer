/** @jsxImportSource @emotion/react */
import {css, jsx } from '@emotion/react'

import React, {useState, useEffect, useImperativeHandle, forwardRef} from 'react';


const ImageGallery = (props, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!props.isWaitingForImages) {
                if (currentIndex === props.images.length-1) {
                    setCurrentIndex(0);
                } else {
                    setCurrentIndex(currentIndex+1);
                }
                props.onSlide(currentIndex);
            }            
        }, 10000); // in ms
        return () => clearInterval(interval);
    });

    useImperativeHandle(ref, () => ({
        getCurrentIndex: () => {
            return currentIndex;
        },
        goToIndex: (index) => {
            setCurrentIndex(index);
        }
    }));    

    return (        
        <img 
            css={css`
                display: block;
                width: auto;   
                height: auto;   
                margin-left: auto;
                margin-right: auto;  
                margin-top: auto;
                margin-bottom: auto;  
                max-width: ${window.innerWidth}px;
                max-height: ${window.innerHeight}px;`        
            }
            src={props.images[currentIndex]?.original}
        />
    )
};


export default forwardRef(ImageGallery);