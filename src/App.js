/** @jsxImportSource @emotion/react */
import {css, jsx } from '@emotion/react'
import React, {useState, useEffect, useRef, useCallback} from 'react';
import ImageGallery from './component/ImageGallery';
import Loader from "react-loader-spinner";
import Image from './model/Image';
import ReactFullscreen from 'react-easyfullscreen';
import {directoryOpen} from 'browser-fs-access';


const BATCH_SIZE = 5;

function App() {
  const [images, setImages] = useState([]);
  const [isError, setIsError] = useState(false); 
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const galleryRef = useRef();

  useEffect(() => {
    getImages(true);    
  }, []);

  const openDir = async () => {
    try {
      setIsError(false);
      setIsLoaderVisible(true);
      const filesInDirectory = await directoryOpen({
        recursive: true,
      });
      console.log("files: ", filesInDirectory);
  
      let files = [];
      for (const file of filesInDirectory) {       
        const fileReader = new FileReader();    
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          const fileInfo = {    
              original: fileReader.result,
          };
          files.push(fileInfo);  
  
          if (files.length === filesInDirectory.length) {
            setIsLoaderVisible(false);
            setImages(files);             
          }  
        }                      
      }
    } catch (error) {
      console.log("uh oh: ", error);
      setIsError(true);
      setIsLoaderVisible(false);
    }
  };

  const toggleRight = () => {
    galleryRef.current.goRight();
  };

  const toggleLeft = () => {
    galleryRef.current.goLeft();
  };

  const toggleTimer = () => {
    galleryRef.current.startTimer();
  }

  return (
    <div
      css={css`
        align-items: center;
        align-content: center;
        background-color: #000;
        height: ${window.innerHeight}px;
        width: ${window.innerWidth}px;`               
    }>
      <ReactFullscreen>
        {({ ref, onToggle }) => (
          <div ref={ref}>
            {isLoaderVisible && 
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}        
              />
            }
            {!isError ?        
                <>
                  <ImageGallery
                    ref={galleryRef}
                    images={images}
                    slideDuration={10000}
                  />
                  <button 
                    css={css`
                      position: absolute;
                      top: 0px; 
                      left: 0px;
                      width: 50px;
                      height: 20px;
                    `}
                    onClick={onToggle}>
                      {`[  ]`}
                  </button>           
                  <button 
                  css={css`
                    position: absolute;
                    top: 20px; 
                    left: 0px;
                    width: 50px;
                    height: 20px;
                  `}
                  onClick={toggleRight}
                  >
                    {`-->`}
                  </button>
                  <button 
                    css={css`
                      position: absolute;
                      top: 40px; 
                      left: 0px;
                      width: 50px;
                      height: 20px;
                    `}
                    onClick={toggleLeft}
                    >
                      {`<--`}
                  </button>
                  <button 
                    css={css`
                      position: absolute;
                      top: 60px; 
                      left: 0px;
                      width: 50px;
                      height: 20px;
                    `}
                    onClick={toggleTimer}
                    >
                      {`:)`}
                  </button>      
                  <button 
                    css={css`
                      position: absolute;
                      top: 80px; 
                      left: 0px;
                      width: 50px;
                      height: 20px;
                    `}
                    onClick={openDir}
                    >
                      {`[<--`}
                  </button>          
                </>
              :
              <div style={{color: 'red'}}> Error! Try again.</div>
            }
          </div>
        )}
      </ReactFullscreen>
    </div>
  );
}

export default App;
