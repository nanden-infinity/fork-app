import { endpoint, RES_PER_PAGE, START_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";
import recipeView from "./views/recipeView.js";
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: START_PAGE,
    resultPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
  update: (recipe) => {
    const localItems = localStorage.setItem(
      "bookmark",
      JSON.stringify(["Mikl", "Jonas"]),
    );
    const listItem = localStorage.getItem("bookmark");
    console.log(localItems);
    return recipe;
  },
};

// setTimeout(() => console.log(state.recipe), 3000);

export const loadRecipe = async function (id) {
  const url = `${endpoint}${id}`;
  try {
    const { data } = await getJSON(url);

    const { recipe } = data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    console.error(`${error} 🔥🔥🔥🔥🔥🔥`);
    throw error;
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
    state.search.results = recipes.map((recipe) => {
      return (recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      });
    });
    state.search.page = 1;
  } catch (error) {
    console.log("Load faild");
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients?.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
  // building
  // newQt = oldQt *newServings / oldServings // 2 * 8 / 4 = 4
};

// bookmarkFunction
// const helderBookmark = (value)=> value
export const addBookmarkd = function (recipe) {
  console.log(recipe);
  // Add Bookmark
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = function (id) {
  // console.log(id);
  const index = state.bookmarks.findIndex((el) => el.id == id);
  if (state.recipe.id === id) state.recipe.bookmarked = false;
  state.bookmarks.splice(index, 1);
  console.log("index :", index, id, state.recipe);
};
