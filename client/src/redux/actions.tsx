export const SET_SIGNUP_USERNAME = "SET_SIGNUP_USERNAME";
export const SET_SIGNUP_PASSWORD = "SET_SIGNUP_PASSWORD";
export const SET_SIGNUP_PROGRESS= "SET_SIGNUP_PROGRESS";

export const set_signup_username = (signup_username: string) => {
  return {
    type: SET_SIGNUP_USERNAME,
    payload: signup_username,
  };
};

export const set_signup_password = (signup_password: string) => {
  return {
    type: SET_SIGNUP_PASSWORD,
    payload: signup_password,
  };
};

export const set_signup_progress= (signup_progress: number) => {
  return {
    type: SET_SIGNUP_PROGRESS,
    payload: signup_progress,
  };
};