import * as basicLightbox from 'basiclightbox'

export default function TrailerRender(data) {

        const btnModalTrailer = document.querySelector('.btn-open-trailer');  
        
         
        
        const modalTrailerWindow = basicLightbox.create(`
                <div class="modal">
                        <iframe width="640" height="480" frameborder="0" allowfullscreen allow='autoplay'
                                src="https://www.youtube.com/embed/${data[0].key}?autoplay=1" >
                        </iframe>
                        <button type="button" class="modal-trailer-close-btn">
                                <svg width="35" height="35" fill="#fff" xmlns="http://www.w3.org/2000/svg" ><path d="m8 8 14 14M8 22 22 8" stroke="#000" stroke-width="2"></path></svg>
                        </button>
                </div>
        `
, {
     onShow: (modalTrailerWindow) => {
        modalTrailerWindow.element().querySelector('.modal-trailer-close-btn').onclick = modalTrailerWindow.close
        
     }
}
);
        btnModalTrailer.addEventListener('click', () => {
                modalTrailerWindow.show()
        });
}

