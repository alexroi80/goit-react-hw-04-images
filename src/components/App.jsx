import { useState,useEffect } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImagesWithQuery } from './helpers/api';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { notificationOptions } from './Notification/Notification';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isButtonLoad, setIsButtonLoad] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [id, setId] = useState('');


  useEffect(() => {
    if (searchQuery !==''){
      setIsLoading(true);
      fetchImages(searchQuery, page);
    } 
  }, [searchQuery, page]);

  useEffect(() => {
    setImages([]);
    setIsButtonLoad(false);
  }, [searchQuery]);

  useEffect(() => {
    if(error){
      toast.error('An error occurred. Please try images search later.', notificationOptions)
    } 
  }, [error]);


  const fetchImages = async (searchQuery, page) => {
    setIsLoading(true);

    try {
      const newImages = await fetchImagesWithQuery(searchQuery, page);

      if (newImages.length === 0) {
        setIsButtonLoad(false);
        return toast.info(
          'No images found. Please try another search query',
          notificationOptions
        );
      }

      setImages(prevState => [...prevState, ...newImages]);
      setIsButtonLoad(true);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMoreImages = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = (largeImage, id) => {
    setIsShowModal(prevState => !prevState);
    setLargeImage(largeImage);
    setId(id);
  };

  const handleSearchQuery = searchQuery => {
    if (searchQuery === '') {
      setImages([]);
      setIsButtonLoad(false);
      return toast.warn('Please enter search query', notificationOptions);
    }
    setSearchQuery(searchQuery);
    setPage(1);
  };

  return (
    <div className={css.container}>
      <Searchbar onChange={handleSearchQuery} />
      {isLoading && <Loader />}
      <ImageGallery images={images} onOpenModal={toggleModal} />
      {isButtonLoad && <Button loadMore={fetchMoreImages} />}
      <ToastContainer />
      {isShowModal && (
        <Modal largeImage={largeImage} id={id} onClose={toggleModal} />
      )}
    </div>
  );
};
