import { getImagesBySearch } from "api/images";
import { useEffect, useState } from "react";
import { GlobalStyles } from "utils/GlobalStyles";
import ImageGallery from "./ImageGallery/ImageGallery";
import { AppStyle } from "./App.styled";
import Searchbar from "./Searchbar/Searchbar";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
import { Toaster, toast } from "react-hot-toast";
import Modal from "./Modal/Modal";
import React from 'react'

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setImageModal] = useState("");

  useEffect(() => {

    if (!searchQuery) return;

    const apiImages = async () => {
    setIsLoading(true)
    setError('')
    try {
      const data = await getImagesBySearch(searchQuery, currentPage);
      setHits((prev) => [...prev, ...data.hits])
    setTotalPages(Math.floor(data.totalHits / 12));
    toast.success(`page: ${currentPage}`);
      if (data.hits.length === 0) {
        toast.error('Images not found')
      }
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
    }
    apiImages()
  }, [searchQuery, currentPage]);

    const handleSubmit = (text) => {
    if (searchQuery === text) {
      return toast.error(`Sorry, you just looked ${text}`);
    }

    setHits([]);
    setSearchQuery(text);
    setCurrentPage(1);
  };


  const handleLoader = () => {
    setCurrentPage((prev) => prev + 1);

  };

  

  const handleOpenModal = (imageURL) => {
    setShowModal(true)
    setImageModal(imageURL)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setImageModal('')
  }



  return (
     <AppStyle>
        <Searchbar onSubmit={handleSubmit} currentPage={currentPage} />
        {hits.length > 0 && <ImageGallery hits={hits} onOpenModal={handleOpenModal}/>}
        {hits.length > 0 && totalPages !== currentPage && !isLoading && <Button onClick={handleLoader} />}
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
        {showModal && <Modal onCloseModal={handleCloseModal}>
          <img src={imageModal} alt={hits.tags}/>
        </Modal>}
        <GlobalStyles />
        <Toaster/>
    </AppStyle>
  )
}


export default App;

