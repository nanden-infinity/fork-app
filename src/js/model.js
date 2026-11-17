import { endpoint, KEY, RES_PER_PAGE, START_PAGE } from './config.js';
import { getJSON, setJSON } from './helpers.js';
import bookmarkView from './views/bookmark_View.js';
// import recipeView from './views/recipeView.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: START_PAGE,
    resultPerPage: RES_PER_PAGE,
  },
  bookmarks: JSON.parse(localStorage.getItem('bookmark')) || [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  const url = `${endpoint}${id}`;
  try {
    const data = await getJSON(url);

    state.recipe = createRecipeObject(data);
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    throw `${error} 🔥🔥🔥🔥🔥🔥`;
  }
};

// LoadSearchResult

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const datarecipe = await getJSON(`${endpoint}?search=${query}`);
    const {
      data: { recipes },
    } = datarecipe;
    state.search.results = recipes.map(recipe => {
      return (recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      });
    });
    state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients?.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
  // building
  // newQt = oldQt *newServings / oldServings // 2 * 8 / 4 = 4
};

// bookmarkFunction
// Fuction persiset bookmark
const persistBookmark = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
  const items = localStorage.getItem('bookmark');
  if (JSON.parse(items).length === 0) {
    localStorage.removeItem('bookmark');
  }
};
export const addBookmark = function (recipe) {
  // Add Bookmark
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmark();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id == id);
  if (state.recipe.id === id) state.recipe.bookmarked = false;
  state.bookmarks.splice(index, 1);
  persistBookmark();
};

export const init = () => {
  persistBookmark();
  const storage = localStorage.getItem('bookmark');
  if (storage) state.bookmarks = JSON.parse(storage);
  bookmarkView.render(JSON.parse(storage));
};
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(([name, value]) => name.startsWith('ingredient') && value.trim())
      .map(([, value]) => {
        const parts = value.split(',').map(part => part.trim());
        if (parts.length !== 3 || !parts[2]) {
          throw new Error(
            'Wrong ingredient format. Use "Quantity,Unit,Description".',
          );
        }

        const [quantity, unit, description] = parts;
        const parsedQuantity = quantity ? Number(quantity) : null;
        if (parsedQuantity !== null && !Number.isFinite(parsedQuantity)) {
          throw new Error(`Invalid ingredient quantity: ${quantity}`);
        }

        return {
          quantity: parsedQuantity,
          unit: unit || null,
          description,
        };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: Number(newRecipe.cookingTime),
      servings: Number(newRecipe.servings),
      ingredients,
    };
    const data = await setJSON(`${endpoint}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// init();
// ['load', 'DOMContentLoaded'].forEach(e => window.addEventListener(e, init));
