import { lazy } from "react";
import { Navigate } from "react-router-dom";

import Get_permission from "../pages/permissions/Get_permission.jsx";
import Sign_in from "../pages/auth/Sign_in.jsx";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.jsx"));
/****End Layouts*****/

/*****Pages******/
import Dashboard1 from "../views/dashboards/Dashboard1.jsx";
import Err_404 from "../pages/error/Error_404.jsx";
import Get_country from "../pages/country/Get_country.jsx";
import Get_state from "../pages/state/Get_state.jsx";
import Get_city from "../pages/city/Get_city.jsx";
import Get_branch from "../pages/branch/Get_branch.jsx";
import Get_zone from "../pages/zone/Get_zone.jsx";
import Get_site from "../pages/site/Get_site.jsx";
import Get_user from "../pages/users/Get_user.jsx";

import Country_post from "../pages/country/Country_post.jsx";
import State_post from "../pages/state/State_post.jsx";
import City_post from "../pages/city/City_post.jsx";
import Branch_post from "../pages/branch/Branch_post.jsx";
import Zone_post from "../pages/zone/Zone_post.jsx";
import Site_post from "../pages/site/Site_post.jsx";
import User_post from "../pages/users/User_post.jsx";

import Edit_state from "../pages/state/Edit_state.jsx";
import Edit_city from "../pages/city/Edit_city.jsx";
import Edit_branch from "../pages/branch/Edit_branch.jsx";
import Edit_country from "../pages/country/Edit_country.jsx";
import Edit_zone from "../pages/zone/Edit_zone.jsx";
import Edit_site from "../pages/site/Edit_site.jsx";
import Edit_user from "../pages/users/Edit_user.jsx";
import Logout from "../pages/auth/Logout.jsx";
import View_country from "../pages/country/View_country.jsx";
import View_city from "../pages/city/View_city.jsx";
import View_state from "../pages/state/View_state.jsx";
import View_branch from "../pages/branch/View_branch.jsx";
import View_zone from "../pages/zone/View_zone.jsx";
import View_site from "../pages/site/View_site.jsx";
import View_user from "../pages/users/View_user.jsx";


/*****Routes*****/
const ThemeRoutes = [
  // Independent Sign-in route
  {
    path: "/sign_in",
    element: <Sign_in />,
  },
  // 404 if you go to wrong path 
  { path: "*", element: <Err_404 /> },

  // Routes under FullLayout
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="dashboard" /> },
      { path: "dashboard", element: <Dashboard1 /> },
      { path: "permission", element: <Get_permission /> },
      { path: "country", element: <Get_country /> },
      { path: "state", element: <Get_state /> },
      { path: "city", element: <Get_city /> },
      { path: "branch", element: <Get_branch /> },
      { path: "zone", element: <Get_zone /> },
      { path: "site", element: <Get_site /> },
      { path: "user", element: <Get_user /> },

      { path: "country_post", element: <Country_post /> },
      { path: "state_post", element: <State_post /> },
      { path: "city_post", element: <City_post /> },
      { path: "branch_post", element: <Branch_post /> },
      { path: "zone_post", element: <Zone_post /> },
      { path: "site_post", element: <Site_post /> },
      { path: "user_post", element: <User_post /> },

      { path: "edit_country/:countryId", element: <Edit_country /> },
      { path: "edit_state/:stateId", element: <Edit_state /> },
      { path: "edit_city/:cityId", element: <Edit_city /> },
      { path: "edit_branch/:branchId", element: <Edit_branch /> },
      { path: "edit_zone/:zoneId", element: <Edit_zone /> },
      { path: "edit_site/:siteId", element: <Edit_site /> },
      { path: "edit_user/:userId", element: <Edit_user /> },

      { path: "view_country/:countryId", element: <View_country /> },
      { path: "view_city/:cityId", element: <View_city /> },
      { path: "view_state/:stateId", element: <View_state /> },
      { path: "view_branch/:branchId", element: <View_branch /> },
      { path: "view_zone/:zoneId", element: <View_zone /> },
      { path: "view_site/:siteId", element: <View_site /> },
      { path: "view_user/:userId", element: <View_user /> },

      { path: "signout", element: <Logout /> },
    ],
  },
];

export default ThemeRoutes;
