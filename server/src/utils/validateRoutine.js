import Ajv2020 from "ajv/dist/2020.js";
import routineSchema from "../schemas/routineSchema.json" with { type: "json" };

const ajv = new Ajv2020({ allErrors: true });
const validate = ajv.compile(routineSchema);

export function validateRoutine(routine) {
  const validationResult = validate(routine);
  if (!validationResult) {
    console.error("Routine validation failed:", validate.errors);
  }

  return validationResult;
}
