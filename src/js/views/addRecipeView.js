import View from './view.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded 🙂';
  _errorMessage = 'Wrong Ingredient Format. Please use the correct format 😶';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnAddRecipe = document.querySelector('.nav__btn--add-recipe');
  _btnCloseRecipe = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerAddRecipe();
    this._addHandlerCloseRecipe();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerAddRecipe() {
    this._btnAddRecipe.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerCloseRecipe() {
    this._btnCloseRecipe.addEventListener(
      'click',
      this.toggleWindow.bind(this)
    );
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const dataObject = Object.fromEntries(dataArr);
      handler(dataObject);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
