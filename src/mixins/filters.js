import moment from "moment";
moment.locale("en");
export default {
  filters: {
    fromNow(val) {
      return moment(val).fromNow();
    },
  },
};
