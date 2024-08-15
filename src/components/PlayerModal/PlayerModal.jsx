import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "../../store/store";
import RequestService from "../../core/services/request.service";
import { APIRoutesBase } from "../../core/http";
import { closeModal, openModal } from "../../store/reducers/modal/modalSlice";
import { setSelectedMovie } from "../../store/reducers/movies/moviesSlice";

const PlayerModal = () => {
  const [videoKey, setVideoKey] = useState("");
  const { selectedMovie } = useAppSelector((state) => state.movies);
  const { isOpen } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedMovie) {
      fetchSelectedMovie();
    }
  }, [selectedMovie]);

  const fetchSelectedMovie = async () => {
    try {
      const response = await RequestService.fetchMovie(
        APIRoutesBase.MOVIE,
        selectedMovie.id
      );
      const data = response.data.videos.results;

      const trailer = data.find((video) => video.type === "Trailer");
      if (trailer) {
        setVideoKey(trailer.key);
        dispatch(openModal());
      }
    } catch (error) {
      console.error("Failed to fetch movie:", error);
    }
  };

  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(closeModal());
    dispatch(setSelectedMovie(null));
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content">
        {videoKey ? (
          <ReactPlayer
            className="video-player"
            url={`https://www.youtube.com/watch?v=${videoKey}`}
            controls={true}
            playing={true}
            data-testid="youtube-player"
          />
        ) : (
          <div>
            <h6>No trailer available. Try another movie</h6>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerModal;
