import React, {useState, useEffect} from 'react';
import ImageGallery from 'react-image-gallery';
import AxiosService from './service/Axios.service';
import Loader from "react-loader-spinner";
import Image from './model/Image';

const BATCH_SIZE = 5;

function App() {
  const [images, setImages] = useState([]);
  const [isError, setIsError] = useState(false); 
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [batchIndex, setBatchIndex] = useState(0);
  const [totalImageAmount, setTotalImageAmount] = useState(0);

  useEffect(() => {
    getImages(true);    
  }, []);

  const getImages = async (initial) => {
    console.log("is iniital: ", initial)
    setIsError(false);
    if (initial) setIsLoaderVisible(true);
    const imageResponse = await AxiosService.getImages(batchIndex, BATCH_SIZE);
    if (initial) setIsLoaderVisible(false);

    console.log("imageResponse", imageResponse)


    const images = await Image.convertImagesDTOToImages(imageResponse.images)
    setTotalImageAmount(imageResponse.total);

    if (images) {    
      setImages(images);    
    } else {
      if (initial) setIsError(true);
    } 
  };

  const onSlide = (currentIndex) => {
    if (currentIndex === images.length-1) {
      getImages();
      if (batchIndex+1 * BATCH_SIZE < totalImageAmount)
      setBatchIndex(batchIndex++);
    }
  }

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
            items={images} 
            autoPlay
            showNav={false}
            showThumbnails={true}
            thumbnailPosition={'left'}
            slideInterval={10000}    
            onSlide={onSlide}
          />                
          :
          <div style={{color: 'red'}}> Error! Try again.</div>
        }
    </div>
  );
}

export default App;
