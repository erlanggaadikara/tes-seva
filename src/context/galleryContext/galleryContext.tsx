import { useContext } from "react";
import createDataContext from "context/createDataContext";

const { Context, Provider } = createDataContext<string | undefined>(undefined);

export const GalleryContextProvider = Provider;

export const useContextForGallery = () => {
  const { state, setState } = useContext(Context);
  return {
    galleryFile: state,
    setGalleryFile: setState,
  };
};
