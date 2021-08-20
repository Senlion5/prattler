import React from "react";
import Lottie from "react-lottie";
import * as animationData from "../../../../assets/animations/isLoading.json";

const LoadingIndicator = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default LoadingIndicator;
