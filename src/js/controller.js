import * as model from "./model.js";
import paginationView from "./views/paginationView.js";
import recipeViews from "./views/recipeView.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import "core-js/stable";
import "regenerator-runtime/runtime.js";
// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

// Initial hot module
// if (module.hot) {
//   module.hot.accept();
// }
if (module.hot) module.hot.accept();
const controlRecipe = async function () {
  const id = location.hash.slice(1);
  try {
    if (!id) return;
    recipeViews.renderSpinner();
    // 1)"" Loading recipe
    await model.loadRecipe(id);
    // 2 Rendering recipe
    recipeViews.render(model.state.recipe);
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
    // 1 Get serach   query
    if (!query) return "";
    // 2 load serach results
    await model.loadSearchResults(query);

    // 3 Render Results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(4));
    // 4 Initial Pagination Button
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error, "ERRO NO CONTROLLER");
  }
};

// Pagination HandlerClick
function controllerPagination(gotoPage) {
  resultsView.render(model.getSearchResultsPage(gotoPage));
  console.log(gotoPage);
}

const init = function () {
  // iniciando o app com a funcao init logo no inicio  TODO
  recipeViews.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClik(controllerPagination);
};

init();
