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
    setInterval(getImages, 30000);  
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
    <div>
        {isLoaderVisible && 
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}        
          />
        }
        {!isError ?        
          <ImageGallery items={images} autoPlay/>                
          :
          <div style={{color: 'red'}}> Error! Try again.</div>
        }
    </div>
  );
}

export default App;
