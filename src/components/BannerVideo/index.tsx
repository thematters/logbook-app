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
      width="100%"
      loop
      muted
      disablePictureInPicture
      style={{ border: "2px solid #f7f7f7" }}
      poster={posterImg}
    >
      <source src="/video/intro-book-cover.webm" type="video/webm" />
      <source src="/video/intro-book-cover.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BannerVideo;
