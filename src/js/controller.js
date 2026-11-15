import * as model from './model.js';
import searchView from './views/searchView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
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
    recipeView.renderSpinner();
    //  0 Results view update to 0 search results View to current

    resultsView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);
    // 1)"" Loading recipe
    await model.loadRecipe(id);
    // 2 Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    // calling the error methodo
    recipeView.renderError();
    console.log(`O seu erro ${error}`);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getInput();
    // 1 Get serach   query
    if (!query) return '';
    // 2 load serach results
    await model.loadSearchResults(query);

    // 3 Render Results
    resultsView.render(model.getSearchResultsPage());
    // 4 Initial Pagination Button
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error, 'ERRO NO CONTROLLER');
  }
};

// Pagination HandlerClick
function controllerPagination(gotoPage) {
  // 1) Render new Results
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // 2) Render new Pagination Buttons
  paginationView.render(model.state.search);
}

// Update Servings
const controllerServings = function (newServings) {
  console.log(newServings);
  // Update the servings recipe (in state)
  model.updateServings(newServings);

  // Update the  recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

// Add Bookmark
const controlAddBookmark = function () {
  // 1 Add/Remove Bookmark
  // prettier-ignore
  if (!model.state.recipe.bookmarked) model.addBookmarkd(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2 Update Recipe View
  recipeView.update(model.state.recipe);
  // 3 Render
  bookmarkView.render(model.state.bookmarks);
};
const init = function () {
  // controllerServings(4);
  // iniciando o app com a funcao init logo no inicio  TODO
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controllerServings);
  recipeView.haddHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controllerPagination);
};

init();
