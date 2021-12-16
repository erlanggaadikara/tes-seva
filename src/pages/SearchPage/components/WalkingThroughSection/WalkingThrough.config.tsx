import WalkingThrough1Origin from "./images/WalkingThrough1.png";
import WalkingThrough2Origin from "./images/WalkingThrough2.png";
import WalkingThrough1 from "./images/WalkingThrough1.webp";
import WalkingThrough2 from "./images/WalkingThrough2.webp";
import { carResultsUrl, surveyFormUrl } from "routes/routes";

export const WalkingThroughConfig = [
  {
    originImg: WalkingThrough1Origin,
    webpImg: WalkingThrough1,
    title: "homePageSearch.walkingThrough.findCar.title",
    desc: "homePageSearch.walkingThrough.findCar.desc",
    destination: carResultsUrl,
  },
  {
    originImg: WalkingThrough2Origin,
    webpImg: WalkingThrough2,
    title: "homePageSearch.walkingThrough.survey.title",
    desc: "homePageSearch.walkingThrough.survey.desc",
    destination: surveyFormUrl,
  },
];
