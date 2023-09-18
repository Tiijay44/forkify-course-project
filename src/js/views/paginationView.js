import { View } from './View.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _currPage;

  addPaginationHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    this._currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // page 1 and other pages
    if (this._currPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next');
    }

    // other page
    //if (this._currPage < numPages) {
    if (this._currPage > 1 && this._currPage < numPages) {
      return ['prev', 'next']
        .map(butt => this._generateMarkupButton(butt))
        .join('');
    }

    // last page
    if (this._currPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev');
    }

    // only one page
    return '';
  }

  _generateMarkupButton(button) {
    if (button === 'next')
      return `
        <button data-goto="${
          this._currPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${this._currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    else
      return `
        <button data-goto="${
          this._currPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._currPage - 1}</span>
        </button>
      `;
  }
}

export default new paginationView();
