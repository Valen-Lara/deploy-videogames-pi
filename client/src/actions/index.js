import axios from "axios";
export const APPLY_FILTERS = "APPLY_FILTERS";
export const SET_PAGE = "SET_PAGE";

export function getVideogames() {
  return async function (dispatch) {
    dispatch(loading());
    try {
      var json = await axios.get("http://localhost:3001/videogames");
      return dispatch({
        type: "GET_VIDEOGAMES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: "GET_VIDEOGAMES",
        payload: [],
      });
    }
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/platforms");
      return dispatch({
        type: "GET_PLATFORMS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getVideogameName(name) {
  return async function (dispatch) {
    dispatch(loading());
    try {
      var json = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
        //`http://localhost:3001/videogames/${name}`
      );
      return dispatch({
        type: "GET_VIDEOGAMES_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: "GET_VIDEOGAMES_NAME",
        payload: [],
      });
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      var genre = await axios.get("http://localhost:3001/genres");
      return dispatch({
        type: "GET_GENRES",
        payload: genre.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postVideogame(payload) {
  //sino guardar el await en una constante y retornarlo
  return async function (dispatch) {
    try {
      await axios.post("http://localhost:3001/videogames", payload);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/videogames/${id}`);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function filterByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function filterByCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function clearDetail() {
  return {
    type: "CLEAR_DETAIL",
    payload: [],
  };
}

export function loading() {
  return {
    type: "LOADING",
  };
}

export function applyFilters() {
  return {
    type: APPLY_FILTERS,
  };
}

export function setCurrentPage(page) {
  return {
    type: SET_PAGE,
    payload: page,
  };
}
