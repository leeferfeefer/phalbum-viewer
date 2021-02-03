/** @jsxImportSource @emotion/react */
import {css, jsx } from '@emotion/react'
import React, {useState, useEffect, useRef, useCallback} from 'react';
import ImageGallery from './component/ImageGallery';
import AxiosService from './service/Axios.service';
import Loader from "react-loader-spinner";
import Image from './model/Image';
import ReactFullscreen from 'react-easyfullscreen';
import {directoryOpen} from 'browser-fs-access';


const BATCH_SIZE = 5;

function App() {
  const [images, setImages] = useState([]);
  const [isError, setIsError] = useState(false); 
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [batchIndex, setBatchIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isWaitingForImages, setIsWaitingForImages] = useState(false);
  const galleryRef = useRef();

  useEffect(() => {
    getImages(true);    
  }, []);

  const openDir = async () => {
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
          setImages(files);             
        }  
      }                      
    }
  };

  const getImages = async (initial) => {
    // setIsError(false);
    // let imageResponse;
    // let newImages;
    // try {
    //   if (initial) setIsLoaderVisible(true);
    //   setIsWaitingForImages(true);
    //   imageResponse = await AxiosService.getImages(batchIndex, BATCH_SIZE);
    //   if (initial) setIsLoaderVisible(false);
    //   console.log("imageResponse", imageResponse)
    //   if (imageResponse?.images?.length > 0) {
    //     newImages = await Image.convertImagesDTOToImages(imageResponse.images)
    //     if (images.length === 0) {
    //       setImages(newImages);
    //     } else {
    //       setImages([...images, ...newImages]);  
    //     }        
    //     setBatchIndex(batchIndex+1); 
    //   }     
    // } catch (error) {
    //   console.log("error", error)
    //   if (initial) setIsLoaderVisible(false);
    //   if (initial) setIsError(true);
    // }    
    // setIsWaitingForImages(false);
  };

  const openFile = async () => {
    openDir();
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

  const onSlide = (currentIndex) => {
    // call get images 1 image before
    if (images.length > 0 && currentIndex === images.length-2) {
      // getImages();
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
                    onSlide={onSlide}
                    slideDuration={10000}
                    isWaitingForImages={isWaitingForImages}
                  />
                  <button 
                    css={css`
                      position: absolute;
                      top: 0px; 
                      left: 0px;
                      width: 50px;
                      height: 20px;
                    `}
                    onClick={openFile}>
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
