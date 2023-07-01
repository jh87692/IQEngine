import moment from 'moment';
import { DateQuery } from "./DateQuery";
import { StringQuery } from "./StringQuery";
import { FreqQuery } from "./FreqQuery";

export const queries = {
  date: {
    component: DateQuery,
    selected: true,
    description: "The date the document was created",
    validator: ({from, to}) => {
      let parsedTo = moment(to);
      let parsedFrom = moment(from);
      if ((parsedTo.isValid() && parsedFrom.isValid()) && parsedTo.isAfter(parsedFrom)) {
        return "this will be the date"
      }
      return false;
    },
    queryString: ""
  },
  author: {
    component: StringQuery,
    selected: false,
    description: "The author of the document",
    validator: (author: string) => {  
      if (!author) {
        return false;
      }
      return author;
    },
    queryString: ""
  },
  comment: {
    component: StringQuery,
    selected: false,
    description: "Comments contained in the annotation",
    validator: (comment: string) => {
      if (!comment) {
        false;
      }
      return comment;
    },
    queryString: ""
  },
  frequency: {
    component: FreqQuery,
    selected: false,
    description: "The frequency range to search over (MHz)",
    validator: ({from, to}) => {
      const parsedFrom: number = parseInt(from);
      const parsedTo: number = parseInt(to);
      if (parsedFrom && parsedTo  && parsedFrom < parsedTo) {
        return "this will be the frequency";
      }
      return false;
    },
    queryString: ""
  },
  container: {
    component: StringQuery,
    selected: false,
    description: "The container the document is in",
    validator: (container: string) => {
      if (!container) {
        return false;
      }
      return container;
    },
    queryString: ""
  },
  label: {
    component: StringQuery,
    selected: false,
    description: "The label of the document",
    validator: (label: string) => {
      if (!label) {
        return false;
      }
      return label;
    },
    queryString: ""
  },
  text: {
    component: StringQuery,
    selected: false,
    description: "Full text search across valid fields",
    validator: (text: string) => {
      if (!text) {
        return false;
      }
      return text;
    },
    queryString: ""
  }
}