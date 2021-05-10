import * as c from './constants';

let initialState = {
    finance: {articles:[]},
    advertisement: {articles:[]},
    general: {articles:[]},
    fitness: {articles:[]},
    science: {articles:[]},
    sports: {articles:[]},
    industrialscience: {articles:[]}
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case c.HEADLINES_AVAILABLE: {
            let { finance, advertisement, general, fitness, science, sports, industrialscience } = action.headlines;

            return {...state, finance, advertisement, general, fitness, science, sports, industrialscience};
        }

        case c.CATEGORY_HEADLINES_AVAILABLE: {
            let { category, headlines, page } = action;
            const { articles } = headlines;

            if (page > 1){
                //clone the current state
                let data = state[category.toLowerCase()];
                let clone = JSON.parse(JSON.stringify(data));
                let articles_ = clone['articles'];

                clone['articles'] = [...articles_, ...articles];

                return {...state, [category.toLowerCase()]:clone};
            }else{
                return {...state, [category.toLowerCase()]:headlines};
            }
        }

        default:
            return state;
    }
};

export default newsReducer;