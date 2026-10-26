import "../css/styles.css";
import { routine } from "../data/routine";
import { renderTemplate } from "./render";
import { setupHomeScreen, setupExerciseScreen } from "./screens";

const sessionRoutine = sessionStorage.getItem("routine");

if (sessionRoutine !== null) {
  routine.exercises = JSON.parse(sessionRoutine).exercises;
}

let currentSet = history.state?.set ?? 1;

const appContainer = document.getElementById("app");

const updateCurrentSet = (adjustment) => {
  currentSet = currentSet + adjustment;
};

export const resolveRoute = () => {
  const { pathname } = window.location;
  const destinationObj = {
    templateId: null,
    exerciseId: null,
  };
  if (pathname === "/") {
    destinationObj.templateId = "home-template";
  } else if (pathname.startsWith("/exercise/")) {
    const exerciseId = pathname.split("/")[2];
    const exerciseExists = routine.exercises.some(
      (exercise) => exercise.id === exerciseId,
    );

    if (exerciseExists) {
      destinationObj.templateId = "exercise-template";
      destinationObj.exerciseId = exerciseId;
    }
  }
  return destinationObj;
};

export const navigateTo = (destinationExerciseId, destinationSet) => {
  if (destinationExerciseId === undefined) {
    const pathname = "/";
    history.pushState(
      {
        exerciseId: undefined,
        set: undefined,
      },
      "",
      pathname,
    );
  } else {
    // Construct the destination pathname.
    const pathname = `/exercise/${destinationExerciseId}`;

    // Store the destination state using history.pushState().
    history.pushState(
      {
        exerciseId: destinationExerciseId,
        set: destinationSet,
      },
      "",
      pathname,
    );

    // Update currentSet.
    currentSet = destinationSet;
  }

  // Call your existing route-rendering function.
  renderCurrentRoute();
};

const renderCurrentRoute = () => {
  const { templateId, exerciseId } = resolveRoute();

  if (templateId === null) {
    throw new Error("No template ID, later goes to not-found screen");
  }

  renderTemplate(appContainer, templateId);

  // Setup the screen for the template
  switch (templateId) {
    case "home-template":
      setupHomeScreen(navigateTo);
      break;
    case "exercise-template":
      setupExerciseScreen(exerciseId, currentSet, navigateTo);
      break;
  }
};

renderCurrentRoute();

window.addEventListener("popstate", (event) => {
  currentSet = event.state.set;
  renderCurrentRoute();
});
