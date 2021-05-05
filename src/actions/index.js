import streams from "../apis/streams";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    // console.log(getState().auth);
    const { userId } = getState().auth;

    const response = await streams.post("/streams", { ...formValues, userId });

    dispatch({
      type: CREATE_STREAM,
      payload: response.data,
    });

    // *** do some programmatic navigation to get the user back to the root route (after dispatch)
    // *** note: .push() is how we navigate a user around
    history.push("/");
  };
};

export const fetchStreams = () => {
  return async (dispatch) => {
    const response = await streams.get("/streams");

    dispatch({
      type: FETCH_STREAMS,
      payload: response.data,
    });
  };
};

export const fetchStream = (id) => {
  return async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({
      type: FETCH_STREAM,
      payload: response.data,
    });
  };
};

export const editStream = (id, formValues) => {
  return async (dispatch) => {
    // *** use .patch() request instead of .put() because when we edit a stream we only want to change part of properties in that stream object
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({
      type: EDIT_STREAM,
      payload: response.data,
    });

    // *** do some programmatic navigation to get the user back to the root route (after dispatch)
    // *** note: .push() is how we navigate a user around
    history.push("/");
  };
};

export const deleteStream = (id) => {
  return async (dispatch) => {
    await streams.delete(`/streams/${id}`);

    dispatch({
      type: DELETE_STREAM,
      payload: id,
    });

    // *** do some programmatic navigation to get the user back to the root route (after dispatch)
    // *** note: .push() is how we navigate a user around
    history.push("/");
  };
};
