import { loadRecipe, state, loadSearchResults } from "./modal.js";
import recipeViews from "./views/recipeView.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import "core-js/stable";
import "regenerator-runtime/runtime.js";
// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

// Initi hot module
if (module.hot) {
  module.hot.accept();
}
const controlRecipe = async function () {
  const id = location.hash.slice(1);

  try {
    if (!id) return;
    recipeViews.renderSpinner();
    // 1)"" Loading recipe
    await loadRecipe(id);
    // 2 Rendering recipe
    recipeViews.render(state.recipe);
  } catch (error) {
    // calling the error methodo
    recipeViews.renderError();
    console.log(`O seu erro ${error}`);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getInput();
    // 1 serach   query
    if (!query) return "";
    //  load serach results
    await loadSearchResults(query);
    //  Render Results
    resultsView.render(state.search.results);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  // iniciando o app com a funcao init logo no inicio  TODO
  recipeViews.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
