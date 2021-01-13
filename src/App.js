import React, {useState, useEffect} from 'react';
import ImageGallery from 'react-image-gallery';
import AxiosService from './service/Axios.service';
import Loader from "react-loader-spinner";
import Image from './model/Image';

function App() {
  const [images, setImages] = useState([]);
  const [isError, setIsError] = useState(false); 
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  useEffect(() => {
    getImages();
    setInterval(getImages, 30000*2*5);  
  }, []);

  const getImages = async () => {
    setIsError(false);
    setIsLoaderVisible(true);
    const imagesDTO = await AxiosService.getImages();
    setIsLoaderVisible(false);

    const images = await Image.convertImagesDTOToImages(imagesDTO)

    if (images) {    
      setImages(images);    
    } else {
      setIsError(true);
    } 
  };

  return (
    <div id="container" style={{flex: 1, height: '100%', width: '100%'}}>
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
            slideInterval={5000}    
          />                
          :
          <div style={{color: 'red'}}> Error! Try again.</div>
        }
    </div>
  );
}

export default App;
