!function(){var e=new MoviesApi,a=getRefs();a.form.addEventListener("submit",(function(t){t.preventDefault();var n=t.currentTarget.elements.searchQuery;a.gallery.innerHTML="",e.query=n.value,e.getSearchMovies().then((function(e){console.log(e.data),moviesMarkUp(e.data.results),createPagination(e.data.total_results,n)})),n.value=""})),onLoadPage()}();
//# sourceMappingURL=index.0b94f7e7.js.map
