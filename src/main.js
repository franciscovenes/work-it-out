import "./css/styles.css";
import { routine } from "./data/routine";

let exerciseIndex = null;

const appContainer = document.getElementById("app");

const setupHomeScreen = () => {
  const startBtn = document.getElementById("start-workout");

  // Check the startBtn exists
  if (startBtn === null) {
    throw new Error(`startBtn doesn't exist`);
  }

  // Add event listener to button clicks
  startBtn.addEventListener("click", () => {
    // When clicked, the startBtn renders the exercise-template
    exerciseIndex = 0;
    renderTemplate("exercise-template");
  });
};

const setupExerciseScreen = (exerciseIndex) => {
  // Check the exercise index validity
  if (
    exerciseIndex === null ||
    exerciseIndex < 0 ||
    exerciseIndex >= routine.length
  ) {
    throw new Error(`Exercise with index ${exerciseIndex} doesn't exist`);
  }

  // Get exercise values
  const { id, name, minReps, maxReps, weightKg } =
    routine.exercises[exerciseIndex];

  const nameEl = document.getElementById("name");
  const minRepsEl = document.getElementById("name");
  const maxRepsEl = document.getElementById("name");
  const weightKgEl = document.getElementById("name");
};

const renderTemplate = (templateId) => {
  const template = document.getElementById(templateId);

  // Check that the template exists.
  if (template === null) throw new Error(`ID ${templateId} doesn't exist`);

  // Validate the template
  switch (templateId) {
    case "home-template":
      break;
    case "exercise-template":
      break;
    default: {
      throw new Error(`ID ${templateId} not allowed`);
    }
  }

  // Render the template
  const clone = document.importNode(template.content, true);
  appContainer.replaceChildren(clone);

  // Setup the screen for the template
  switch (templateId) {
    case "home-template":
      setupHomeScreen();
      break;
    case "exercise-template":
      // setupExerciseScreen();
      break;
  }
};

renderTemplate("home-template");
