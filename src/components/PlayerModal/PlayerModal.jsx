import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";
import RequestService from "../../core/services/request.service";
import { APIRoutesBase } from "../../core/http";
import { setSelectedMovie } from "../../store/reducers/movies/moviesSlice";

const PlayerModal = () => {
  const [videoKey, setVideoKey] = useState("");
  const { selectedMovie } = useAppSelector((state) => state.movies);
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

      data.find((video) =>
        video.type === "Trailer" ? setVideoKey(video.key) : setVideoKey("")
      );
    } catch (error) {
      console.error("Failed to fetch movie:", error);
    } finally {
    }
  };

  return (
    <>
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
          <h6>no trailer available. Try another movie</h6>
        </div>
      )}
      <button onClick={() => dispatch(setSelectedMovie(null))}>
        Close Trailer
      </button>
    </>
  );
};

export default PlayerModal;
