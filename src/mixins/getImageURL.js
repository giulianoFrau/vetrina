export default {
    methods: {
        getImageURL: function (name) {
            return new URL(`../assets/images/${name}.webp`, import.meta.url).href;
        },
    },
};