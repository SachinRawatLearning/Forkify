import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODEL_CLOSE_SEC } from './config';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //1:Update Results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    //2: Updating Bookmarks View
    bookmarksView.update(model.state.bookmarks);

    //3: Loading Recipe
    await model.loadRecipe(id);

    //4: Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();

    //Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    //Load Search
    await model.loadSearchResults(query);

    //Render Results
    resultsView.render(model.getSearchResultsPage());

    //Render Pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    resultsView.renderError();
  }
};

const controlPagination = goToPage => {
  //Render New Results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //Render New Pagination
  paginationView.render(model.state.search);
};

const controlServings = newServings => {
  //Updated Recipe Servings (In State)
  model.updateServings(newServings);

  //Update Recipe View
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = () => {
  // Add or Remove Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else model.removeBookmarks(model.state.recipe.id);

  //Update Recpie View
  recipeView.update(model.state.recipe);

  //Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async newRecipe => {
  try {
    //Show Loading Spinner
    addRecipeView.renderSpinner();

    //Upload new Recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render Recipe
    recipeView.render(model.state.recipe);

    //Render Bookmarks
    bookmarksView.render(model.state.bookmarks);

    //Change Id in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Success Message
    addRecipeView.renderMessage();

    //Close window
    // setTimeout(() => addRecipeView.toggleWindow, MODEL_CLOSE_SEC * 100);
    setTimeout(() => location.reload(), MODEL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log(err);
    addRecipeView.renderError();
  }
};

const newFeature = () => {
  console.log('Welcome to Forkify.');
};

const init = () => {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeature();
};

init();
