// store.js
import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            parentId: null
        };
    },
    mutations: {
        setParentId(state, id) {
            state.parentId = id;
        }
    }
});
