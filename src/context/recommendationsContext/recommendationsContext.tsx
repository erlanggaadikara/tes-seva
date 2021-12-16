import { useContext } from "react";
import { CarRecommendation } from "types/types";
import createDataContext from "context/createDataContext";

const { Context, Provider } = createDataContext<CarRecommendation[]>([]);

export const RecommendationsContextProvider = Provider;

export const useContextRecommendations = () => {
  const { state, setState } = useContext(Context);
  return {
    recommendations: state,
    setRecommendations: setState,
  };
};
