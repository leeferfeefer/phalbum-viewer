import React, {useState, useEffect} from 'react';
import ImageGallery from 'react-image-gallery';
import AxiosService from './service/Axios.service';
import Loader from "react-loader-spinner";

function App() {
  const [images, setImages] = useState([]);
  const [isError, setIsError] = useState(false); 
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    setIsError(false);
    setIsLoaderVisible(true);
    const images = await AxiosService.getImages();
    setIsLoaderVisible(false);

    if (images) {    
      setImages(images);    
    } else {
      setIsError(true);
    } 
  };

  return (
    <div className="App">
        {isLoaderVisible && 
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}        
          />
        }
        {!isError ?        
          <ImageGallery items={images}/>                
          :
          <div style={{color: 'red'}}> Error! Try again.</div>
        }
    </div>
  );
}

export default App;
