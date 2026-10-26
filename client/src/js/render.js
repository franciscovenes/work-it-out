export const renderTemplate = (appContainer, templateId) => {
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
};
