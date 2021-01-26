/** @jsxImportSource @emotion/react */
import {css, jsx } from '@emotion/react'
import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {useInterval} from '../hook/UseIntervalHook';

const ImageGallery = (props, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const {images, isWaitingForImages, onSlide} = props;
    const [delay, setDelay] = useState(10000);
    const [isRunning, setIsRunning] = useState(true);

    useInterval(() => {
        if (!isWaitingForImages) {
            if (currentIndex === images.length-1) {
                setCurrentIndex(0);
            } else {
                setCurrentIndex(currentIndex+1);
            }
            onSlide(currentIndex);
        }    
    }, isRunning ? delay : null)

    useImperativeHandle(ref, () => ({
        getCurrentIndex: () => {
            return currentIndex;
        },
        goToIndex: (index) => {
            setCurrentIndex(index);
        },
        goRight: () => {       
            setIsRunning(false);
            const newIndex = currentIndex+1;
            if (newIndex < images.length) {            
                onSlide(newIndex);                
                setCurrentIndex(newIndex);            
            }            
        },
        goLeft: () => {
            setIsRunning(false);
            const newIndex = currentIndex-1;
            if (newIndex > -1) {            
                onSlide(newIndex);                
                setCurrentIndex(newIndex);
            }
        },
        startTimer: () => {
            setIsRunning(true);
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