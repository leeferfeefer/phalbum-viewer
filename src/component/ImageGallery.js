/** @jsxImportSource @emotion/react */
import {css, jsx } from '@emotion/react'

import React, {useState, useEffect, useRef} from 'react';

const ImageGallery = (props) => {
    return (
        <div 
            css={css`
                align-items: center;
                align-content: center;
                background-color: #000;
                height: ${window.innerHeight}px;
                width: ${window.innerWidth}px;`               
            }>
            <img 
                css={css`
                    display: block;
                    width: auto;   
                    height: auto;   
                    margin-left: auto;
                    margin-right: auto;  
                    max-width: ${window.innerWidth}px;
                    max-height: ${window.innerHeight}px;`        
                }
                src={props.images[1]?.original}
            />
        </div>
    )
};


export default ImageGallery;