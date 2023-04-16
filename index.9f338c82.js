const e=new MoviesApi,t=getRefs();t.form.addEventListener("submit",(function(a){a.preventDefault();const{elements:{searchQuery:n}}=a.currentTarget;t.gallery.innerHTML="",e.query=n.value,e.getSearchMovies().then((e=>{console.log(e.data),moviesMarkUp(e.data.results),createPagination(e.data.total_results,n)})),n.value=""})),onLoadPage();
//# sourceMappingURL=index.9f338c82.js.map
