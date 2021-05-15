export default {
  methods: {
    titleCase(str) {
      return str
        .trim()
        .toLowerCase()
        .split(" ")
        .map(function (word) {
          return word.replace(word[0], word[0].toUpperCase());
        })
        .join(" ");
    },
  },
};
