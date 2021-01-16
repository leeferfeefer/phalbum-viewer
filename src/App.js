import React, {useState, useEffect, useRef} from 'react';
import ImageGallery from './component/ImageGallery';
import AxiosService from './service/Axios.service';
import Loader from "react-loader-spinner";
import Image from './model/Image';

const BATCH_SIZE = 5;

function App() {
  const [images, setImages] = useState([]);
  const [isError, setIsError] = useState(false); 
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [batchIndex, setBatchIndex] = useState(0);
  // const galleryRef = useRef(null);

  useEffect(() => {
    getImages(true);    
  }, []);

  const getImages = async (initial) => {
    // const currentIndex = galleryRef.current.getCurrentIndex();
    setIsError(false);
    let imageResponse;
    let newImages;
    try {
      if (initial) setIsLoaderVisible(true);
      imageResponse = await AxiosService.getImages(batchIndex, BATCH_SIZE);
      if (initial) setIsLoaderVisible(false);
      console.log("imageResponse", imageResponse)
      if (imageResponse?.images?.length > 0) {
        newImages = await Image.convertImagesDTOToImages(imageResponse.images)
        if (images.length === 0) {
          setImages(newImages);
        } else {
          setImages([...images, ...newImages]);  
          // galleryRef.current.slideToIndex(currentIndex);
        }        
        setBatchIndex(batchIndex+1); 
      }     

    } catch (error) {
      console.log("error", error)
      if (initial) setIsLoaderVisible(false);
      if (initial) setIsError(true);
    }    
  };

  // const onSlide = (currentIndex) => {
  //   if (images.length > 0 && currentIndex === images.length-1) {
  //     getImages();
  //   }
  // }

  return (
    <div id="container">
        {isLoaderVisible && 
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}        
          />
        }
        {!isError ?        
            <ImageGallery
              images={images}
            />
          :
          <div style={{color: 'red'}}> Error! Try again.</div>
        }
    </div>
  );
}

export default App;
