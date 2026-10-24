import "./css/styles.css";
import { routine } from "./data/routine";
import { createIcons, ArrowLeft, ArrowRight } from "lucide";

let currentSet = 1;

const appContainer = document.getElementById("app");

const setupHomeScreen = () => {
  const startBtn = document.getElementById("start-workout");
  const title = document.getElementById("routine-title");
  const exerciseCount = document.getElementById("exercise-count");
  const setCount = document.getElementById("set-count");
  const tableBody = document.getElementById("table-body");

  const missingElement = Object.entries({
    "start-workout": startBtn,
    "routine-title": title,
    "exercise-count": exerciseCount,
    "set-count": setCount,
    "table-body": tableBody,
  }).find(([, value]) => value === null);

  if (missingElement) {
    throw new Error(`${missingElement[0]} is missing.`);
  }

  const { name, sets, exercises } = routine;

  title.textContent = name;
  exerciseCount.textContent = exercises.length;
  setCount.textContent = sets;

  exercises.forEach(({ name, machineNum, minReps, maxReps, weightKg }) => {
    // Create table row and cells
    const tableRow = document.createElement("tr");

    // Create cells and set textContent
    const nameCell = document.createElement("td");
    nameCell.textContent =
      name + (machineNum !== null ? ` (${machineNum})` : "");

    const repsCell = document.createElement("td");
    repsCell.classList.add("right-columns");
    repsCell.textContent = `${minReps}-${maxReps}`;

    const weightCell = document.createElement("td");
    weightCell.classList.add("right-columns");
    weightCell.textContent = `${weightKg} kg`;

    // Append cells to row
    tableRow.append(nameCell, repsCell, weightCell);

    // Append row to table body
    tableBody.append(tableRow);
  });

  // Add event listener to button clicks
  startBtn.addEventListener("click", () => {
    // When clicked, the startBtn renders the exercise-template
    const exerciseId = routine.exercises[0].id;
    renderTemplate("exercise-template", exerciseId);
  });
};

const setupExerciseScreen = (exerciseId) => {
  // Check the exercise with exerciseId exists
  const exercise = routine.exercises.find(
    (exercise) => exercise.id === exerciseId,
  );

  if (exercise === undefined) {
    throw new Error(`Exercise with id ${exerciseId} doesn't exist`);
  }

  // Get elements and check validity
  const currentSetEl = document.getElementById("current-set");
  const nameEl = document.getElementById("exercise-name");
  const repsEl = document.getElementById("exercise-reps");
  const weightValueEl = document.getElementById("exercise-weight-value");

  const missingElement = Object.entries({
    "current-set": currentSetEl,
    "exercise-name": nameEl,
    "exercise-reps": repsEl,
    "exercise-weight-value": weightValueEl,
  }).find(([, value]) => value === null);

  if (missingElement) {
    throw new Error(`${missingElement[0]} is missing.`);
  }

  // Get exercise values
  const { id, name, machineNum, minReps, maxReps, weightKg } = exercise;

  // Update DOM with set and exercise values
  currentSetEl.textContent = currentSet;
  nameEl.textContent = name;
  repsEl.textContent = `${minReps}-${maxReps}`;
  weightValueEl.textContent = weightKg;

  // If machineNum exists, create element and add it to DOM
  if (machineNum !== null) {
    const machineNumEl = document.createElement("div");
    machineNumEl.classList.add("exercise-machine");
    machineNumEl.textContent = `M ${machineNum}`;
    nameEl.after(machineNumEl);
  }

  // Add navigation icons
  createIcons({
    icons: {
      ArrowLeft,
      ArrowRight,
    },
  });

  // Find the index of current exercise
  const currExerciseIndex = routine.exercises.findIndex(
    ({ id }) => id === exerciseId,
  );

  if (currExerciseIndex === -1) {
    throw new Error(
      `Exercise with ID: ${exerciseId} does not exist in the exercises array`,
    );
  }

  // CHANGE WEIGHT
  const weightControlBtns = document.querySelectorAll(".weight-adjustment");

  // add event listeners

  weightControlBtns.forEach((btn) => {
    const amount = btn.dataset.weightChange;
    console.log(amount);
    if (amount === undefined) {
      throw new Error(
        "Adjustment button has no data weight change information",
      );
    }

    btn.addEventListener("click", () => {
      let newWeightValue = Math.max(exercise.weightKg + Number(amount), 0);

      exercise.weightKg = newWeightValue;
      weightValueEl.textContent = newWeightValue;

      console.log("Exercise: ", exercise);
    });
  });

  // NAVIGATION BUTTONS

  const prevBtn = document.getElementById("navigate-previous");

  // On the  first exercise (of the first set)
  if (currExerciseIndex <= 0 && currentSet === 1) {
    // Disable prev button
    prevBtn.disabled = true;
  } else {
    // Add event listeners to prev nav button

    prevBtn.addEventListener("click", () => {
      let prevExerciseId;
      if (currExerciseIndex === 0 && currentSet > 1) {
        currentSet--;
        ({ id: prevExerciseId } =
          routine.exercises[routine.exercises.length - 1]);
      } else if (currExerciseIndex > 0) {
        ({ id: prevExerciseId } = routine.exercises[currExerciseIndex - 1]);
      }

      renderTemplate("exercise-template", prevExerciseId);
    });
  }

  const nextBtn = document.getElementById("navigate-next");

  // On last exercise (of the last set)
  if (
    currExerciseIndex >= routine.exercises.length - 1 &&
    currentSet === routine.sets
  ) {
    // Disable next button
    nextBtn.disabled = true;
  } else {
    // Add event listeners to prev nav button
    nextBtn.addEventListener("click", () => {
      let nextExerciseId;
      if (
        currExerciseIndex === routine.exercises.length - 1 &&
        currentSet < routine.sets
      ) {
        currentSet++;
        ({ id: nextExerciseId } = routine.exercises[0]);
      } else if (currExerciseIndex < routine.exercises.length - 1) {
        ({ id: nextExerciseId } = routine.exercises[currExerciseIndex + 1]);
      }
      renderTemplate("exercise-template", nextExerciseId);
    });
  }
};

const renderTemplate = (templateId, exerciseId) => {
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
      setupExerciseScreen(exerciseId);
      break;
  }
};

renderTemplate("home-template");
