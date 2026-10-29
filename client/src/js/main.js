import "../css/styles.css";
import { renderTemplate } from "./render";
import { setupHomeScreen, setupExerciseScreen } from "./screens";

const sessionRoutine = sessionStorage.getItem("routine");
const sessionSet = sessionStorage.getItem("set");

let currentSet = sessionSet === null ? undefined : Number(sessionSet);

let routine;
let errorState;

if (sessionRoutine !== null) {
  try {
    routine = JSON.parse(sessionRoutine);
  } catch (error) {
    console.error("Invalid routine in session storage:", error);
    sessionStorage.removeItem("routine");
  }
}

if (routine === undefined) {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL);

    if (!response.ok) {
      const { error } = await response.json();
      errorState = error;
    } else {
      routine = await response.json();
      sessionStorage.setItem("routine", JSON.stringify(routine));
    }
  } catch (error) {
    console.error(error);
    errorState = error.message;
  }
}

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
    sessionStorage.setItem("set", destinationSet);
  }

  // Call your existing route-rendering function.
  renderCurrentRoute();
};

const renderCurrentRoute = () => {
  if (errorState !== undefined) {
    appContainer.textContent = errorState;
    return;
  }
  const { templateId, exerciseId } = resolveRoute();

  if (templateId === null) {
    throw new Error("No template ID, later goes to not-found screen");
  }

  renderTemplate(appContainer, templateId);

  // Setup the screen for the template
  switch (templateId) {
    case "home-template":
      setupHomeScreen(navigateTo, routine);
      break;
    case "exercise-template":
      setupExerciseScreen(exerciseId, currentSet, navigateTo, routine);
      break;
  }
};

renderCurrentRoute();

window.addEventListener("popstate", (event) => {
  currentSet = event.state.set;
  renderCurrentRoute();
});
