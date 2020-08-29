import { Login, SignUp, Home } from "../components";

import { urls } from "../config";

const routes = [
  {
    path: urls.home,
    exact: true,
    isProtected: true,
    component: Home,
  },
  {
    path: urls.signIn,
    exact: true,
    isProtected: false,
    component: Login,
  },
  {
    path: urls.signUp,
    exact: true,
    isProtected: false,
    component: SignUp,
  },
];

export default routes;
