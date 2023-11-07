
import React, { createContext, useContext, useState } from "react";

const SlideContext = createContext();

export const SlideProvider = ({ children }) => {
  const [currentAltText, setCurrentAltText] = useState("");

  return (
    <SlideContext.Provider value={{ currentAltText, setCurrentAltText }}>
      {children}
    </SlideContext.Provider>
  );
};

export const useSlideContext = () => {
  return useContext(SlideContext);
};
