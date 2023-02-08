import { APPLY_FILTERS, SET_PAGE } from "../actions";

let initialState = {
  videogames: [],
  allVideogames: [],
  detail: [],
  genres: [],
  platforms: [],
  filterGenre: "",
  sortFilter: "",
  filterCreated: "",
  page: 1,
  loading: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
        loading: false,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    case "LOADING":
      return {
        ...state,
        loading: true,
        videogames: [],
        allVideogames: [],
      };

    case "GET_PLATFORMS":
      return {
        ...state,
        platforms: action.payload,
      };

    case "FILTER_BY_GENRE":
      return {
        ...state,
        filterGenre: action.payload,
      };

    case "GET_VIDEOGAMES_NAME":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
        loading: false,
      };

    case "POST_VIDEOGAMES":
      return {
        ...state,
      };

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "ORDER_BY_NAME":
      return {
        ...state,
        sortFilter: action.payload,
      };

    case "FILTER_CREATED":
      return {
        ...state,
        filterCreated: action.payload,
      };

    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    case "CLEAR_DETAIL":
      return {
        ...state,
        detail: {},
      };

    case APPLY_FILTERS:
      const createdFilter = //hace referencia a los juegos creados o api
        state.filterCreated === "db"
          ? state.allVideogames.filter((e) => e.createdInDb)
          : state.filterCreated === "api"
          ? state.allVideogames.filter((e) => !e.createdInDb)
          : [...state.allVideogames];

      const filterByGenre = state.filterGenre
        ? createdFilter.filter((e) => e.genres.includes(state.filterGenre))
        : createdFilter;

      const sorted = //hace referencia al rating y alfabeticamente
        state.sortFilter === "+rating"
          ? filterByGenre.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            })
          : state.sortFilter === "-rating"
          ? filterByGenre.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.sortFilter === "asc"
          ? filterByGenre.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.sortFilter === "desc"
          ? filterByGenre.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            })
          : filterByGenre;

      return { ...state, videogames: [...sorted] };

    default:
      return state;
  }
}
