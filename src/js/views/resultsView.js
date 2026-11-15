import View from './view.js';
import previewView from './previewView.js';

class ResultsViews extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for your query! plesase try again :)';
  _generateMarkUp() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsViews();
