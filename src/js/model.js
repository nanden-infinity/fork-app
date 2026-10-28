import { endpoint, RES_PER_PAGE, START_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: START_PAGE,
    resultPerPage: RES_PER_PAGE,
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
    console.log(state.search);
  } catch (error) {
    console.log("Load faild");
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  console.log(page);
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  const indexPage = state.search.results.slice(start, end);
  return indexPage;
};
