import ReactPlayer from "react-player";

const YoutubePlayer = () => (
  <ReactPlayer
    className="video-player"
    url={`https://www.youtube.com/watch?v=f`}
    controls={true}
    playing={true}
    data-testid="youtube-player"
  />
);

export default YoutubePlayer;
