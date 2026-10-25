import { loadRecipe, state } from "./modal.js";
import recipeViews from "./views/recipeViews.js";

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipe = async function () {
  const id = location.hash.slice(1);

  try {
    if (!id) return;
    recipeViews.renderSpinner();
    // 1) Loading recipe
    await loadRecipe(id);
    // 2 Rendering recipe
    recipeViews.render(state.recipe);
  } catch (error) {
    console.log(`O seu erro ${error}`);
  }
};

["load", "hashchange"].forEach((e) =>
  window.addEventListener(e, controlRecipe),
);
