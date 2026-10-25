import { endpoint } from "./config.js";
import { getJSON } from "./helpers.js";
export const state = {
  recipe: {},
};

// setTimeout(() => console.log(state.recipe), 3000);

export const loadRecipe = async function (id) {
  const url = `${endpoint}/${id}`;
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
    console.error(`${error} 🔥🔥🔥🔥🔥🔥 getjson`);
  }
};
