/** @jsxImportSource @emotion/react */
import {css, jsx } from '@emotion/react'

import React, {useState, useEffect, useImperativeHandle, forwardRef, useRef} from 'react';


const ImageGallery = (props, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const {images, isWaitingForImages, onSlide} = props;
    const intervalTimerRef = useRef();

    const startTimer = () => {
        if (!!!intervalTimerRef.current) {
            console.log("creating timer...");
            intervalTimerRef.current = setInterval(() => {
                if (!isWaitingForImages) {
                    if (currentIndex === images.length-1) {
                        setCurrentIndex(0);
                    } else {
                        setCurrentIndex(currentIndex+1);
                    }
                    onSlide(currentIndex);
                }            
            }, 10000); // in ms
        }        
    };

    const stopTimer = () => {
        if (!!intervalTimerRef.current) {
            clearInterval(intervalTimerRef.current);
            intervalTimerRef.current = undefined;
            console.log("destroying timer...");
        }
    };

    useEffect(() => {
        startTimer();
        return () => stopTimer();
    }, []);

    useImperativeHandle(ref, () => ({
        getCurrentIndex: () => {
            return currentIndex;
        },
        goToIndex: (index) => {
            setCurrentIndex(index);
        },
        goRight: () => {       
            console.log("calling stop timer...")
            stopTimer();
            const newIndex = currentIndex+1;
            if (newIndex < images.length) {            
                onSlide(newIndex);                
                setCurrentIndex(newIndex);            
            }            
        },
        goLeft: () => {
            console.log("calling stop timer...")
            stopTimer();
            const newIndex = currentIndex-1;
            if (newIndex > -1) {            
                onSlide(newIndex);                
                setCurrentIndex(newIndex);
            }
        },
        startTimer: () => {
            startTimer();
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
            src={images[currentIndex]?.original}
        />
    )
};


export default forwardRef(ImageGallery);