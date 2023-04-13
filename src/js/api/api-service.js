import axios from "axios";
import { API_KEY, BASE_URL, TREND_URL, ID_URL, ID_URL } from './api';

export default {
    async getTrendData(page) {
        try {
            const { data } = await axios.get(
                `${TREND_URL}?api_key=${API_KEY}&page=${page}`,
            );
            return data;
        } catch (error) {
            console.error('Smth wrong with api get full trends' + error);
        }
    },
};

async fetchMovieSearcher(text, page) {
    try {
        const { data } = await axios.get (
`${SEARCH_URL}?api_key=${API_KEY}&query=${text}&page=${page}`
        );
        return data;
    }
catch (error) {
    console.error('Smth wrong with api search fetch' + error);
}

};

async getMovieById(id) {
    try {
        const { data } = await axios.get (
`${ID_URL}${id}?api_key=${API_KEY}`
        );
        const result = {
           
        }
    }
catch (error) {
    console.error('Smth wrong with api ID fetch' + error);
}

};