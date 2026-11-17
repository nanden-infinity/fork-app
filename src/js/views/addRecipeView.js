import icons from 'url:../../img/icons.svg';
import View from './view.js';
import { TIMEOUT_OUT } from '../config.js';
class AddRecipeView extends View {
  // constructor() {
  //   super(this);
  //   this._addHandlerShowWindow();
  // }
  _parentElement = document.querySelector('.upload');
  _successMessage = 'Recipe was successfuly uploaded :)';

  _windowElement = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _buttonOpenModal = document.querySelector('.nav__btn--add-recipe');
  _buttonCloseModal = document.querySelector('.btn--close-modal');
  _generateMarkUp() {}
  _toggleShowWindow() {
    this._windowElement.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    // prettier-ignore
    this._buttonOpenModal.addEventListener('click',this._toggleShowWindow.bind(this));
  }
  _addHandlerHiddenWindow() {
    // prettier-ignore
    this._buttonCloseModal.addEventListener('click',this._toggleShowWindow.bind(this));
    this._overlay.addEventListener('click', this._toggleShowWindow.bind(this));
  }
}

export default new AddRecipeView();
class InitAddRecipe {
  constructor() {
    this.addrecipe = new AddRecipeView();
    this.addrecipe._addHandlerShowWindow();
    this.addrecipe._addHandlerHiddenWindow();
  }
  addHandlerUpload(handler) {
    this.addrecipe._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  closeMogal() {
    setTimeout(() => {
      this.addrecipe._toggleShowWindow();
    }, TIMEOUT_OUT * 1000);
  }
}

export const addRecipeView = new InitAddRecipe();
