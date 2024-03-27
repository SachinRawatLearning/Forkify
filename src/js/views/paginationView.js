import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1, there are other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateMarkupNextButton(currPage);
    }

    //Last Page
    if (currPage === numPages && numPages > 1) {
      return this._generateMarkupPrevButton(currPage);
    }

    //Other Page
    if (currPage < numPages) {
      return `${this._generateMarkupPrevButton(
        currPage
      )} ${this._generateMarkupNextButton(currPage)}`;
    }

    //Page 1, there are no other pages
    if (currPage === numPages) {
      return '';
    }
  }

  _generateMarkupPrevButton(currPage) {
    return `
        <button data-goto = ${
          currPage - 1
        } class="btn--inline pagination__btn--prev">
            <span>Page ${currPage - 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
        </button>
  `;
  }

  _generateMarkupNextButton(currPage) {
    return `
        <button data-goto = ${
          currPage + 1
        } class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
  }
}

export default new PaginationView();
