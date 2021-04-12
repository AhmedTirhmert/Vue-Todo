import moment from "moment";
moment.locale("fr");
export default {
  filters: {
    carbonJs(val) {
      return moment(val).fromNow();
    },
  },
};
