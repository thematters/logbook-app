import React, { useEffect, useRef } from "react";

interface Props {
  url: string;
  posterImg?: string;
}

const BannerVideo: React.FC<Props> = ({ url, posterImg }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setTimeout(() => {
      videoRef.current?.play();
    }, 5000);
  }, []);

  return (
    <video
      ref={videoRef}
      // controls
      width="100%"
      loop
      muted
      // style={{...}}
      poster={posterImg}
    >
      <source src="/video/Banner-book_cover.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BannerVideo;
