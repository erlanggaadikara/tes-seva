import { useContext } from "react";
import { CarRecommendation } from "types/types";
import createDataContext from "context/createDataContext";

const { Context, Provider } = createDataContext<CarRecommendation[]>([]);

export const PopularCarsContextProvider = Provider;

export const useContextPopularCars = () => {
  const { state, setState } = useContext(Context);
  return {
    popularCarsRecommendation: state,
    setPopularCarsRecommendation: setState,
  };
};
