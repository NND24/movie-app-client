import { FC, useEffect, useRef } from "react";
import Hls from "hls.js";

type Props = {
  videoSrc: string;
};

const MoviePlayer: FC<Props> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          videoRef.current?.play();
        });
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = videoSrc;
        videoRef.current.addEventListener("loadedmetadata", () => {
          videoRef.current?.play();
        });
      }
    }
  }, [videoSrc]);

  return (
    <div className='video-container'>
      <video ref={videoRef} controls className='video-player' />
    </div>
  );
};

export default MoviePlayer;
