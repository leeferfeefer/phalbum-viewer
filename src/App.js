/** @jsxImportSource @emotion/react */
import {css, jsx } from '@emotion/react'
import React, {useState, useEffect, useRef} from 'react';
import ImageGallery from './component/ImageGallery';
import AxiosService from './service/Axios.service';
import Loader from "react-loader-spinner";
import Image from './model/Image';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const BATCH_SIZE = 5;

function App() {
  const [images, setImages] = useState([]);
  const [isError, setIsError] = useState(false); 
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [batchIndex, setBatchIndex] = useState(0);
  const handle = useFullScreenHandle();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isWaitingForImages, setIsWaitingForImages] = useState(false);

  useEffect(() => {
    getImages(true);    
  }, []);

  const getImages = async (initial) => {
    setIsError(false);
    let imageResponse;
    let newImages;
    try {
      if (initial) setIsLoaderVisible(true);
      setIsWaitingForImages(true);
      imageResponse = await AxiosService.getImages(batchIndex, BATCH_SIZE);
      if (initial) setIsLoaderVisible(false);
      console.log("imageResponse", imageResponse)
      if (imageResponse?.images?.length > 0) {
        newImages = await Image.convertImagesDTOToImages(imageResponse.images)
        if (images.length === 0) {
          setImages(newImages);
        } else {
          setImages([...images, ...newImages]);  
        }        
        setBatchIndex(batchIndex+1); 
      }     
      setIsWaitingForImages(false);
    } catch (error) {
      console.log("error", error)
      if (initial) setIsLoaderVisible(false);
      if (initial) setIsError(true);
    }    
  };
  
  const toggleFullScreen = () => {
    if (isFullScreen) {
      handle.exit();
      setIsFullScreen(false);
    } else {
      handle.enter();
      setIsFullScreen(true);
    }
  }

  const onSlide = (currentIndex) => {
    // call get images 1 image before
    if (images.length > 0 && currentIndex === images.length-2) {
      getImages();
    }
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
      <FullScreen handle={handle}>
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
                images={images}
                onSlide={onSlide}
                slideDuration={10000}
                isWaitingForImages={isWaitingForImages}
              />
              {!isFullScreen && 
                <button 
                  css={css`
                    position: absolute;
                    top: 0px; 
                    left 0px;
                  `}
                  onClick={toggleFullScreen}
                  >
                    {`[  ]`}
                </button>
              }
            </>
          :
          <div style={{color: 'red'}}> Error! Try again.</div>
        }
      </FullScreen>    
    </div>
  );
}

export default App;
