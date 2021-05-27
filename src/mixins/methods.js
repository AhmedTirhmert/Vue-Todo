import moment from 'moment'
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
    pictureUploadTimestamp(val) {
      return moment(val).format('MM_DD_YYYY_h_mm_ss_a');
    }
  },
};
