import "../css/styles.css";
import { renderTemplate } from "./render";
import { setupHomeScreen, setupExerciseScreen } from "./screens";

let currentSet = 1;

const appContainer = document.getElementById("app");

const updateCurrentSet = (adjustment) => {
  currentSet = currentSet + adjustment;
};

const navigate = (templateId, exerciseId) => {
  // Setup the screen for the template
  switch (templateId) {
    case "home-template":
      renderTemplate(appContainer, "home-template");
      setupHomeScreen(navigate);
      break;
    case "exercise-template":
      renderTemplate(appContainer, "exercise-template");
      setupExerciseScreen(exerciseId, currentSet, updateCurrentSet, navigate);
      break;
  }
};

navigate("home-template");
