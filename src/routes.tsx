/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav unless you add a display to false property.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
  10. The `protect` key is used for protected routes.
*/

//layouts
import Home from "layouts/analytics/home";
import SchoolList from "layouts/features/schools/school-list";
import SchoolDetails from "layouts/features/schools/school-details";
import ProfileOverview from "layouts/pages/profile/profile-overview";
import Settings from "layouts/pages/account/settings";
import SignInBasic from "layouts/authentication/sign-in";
import ResetCover from "layouts/authentication/reset-password/cover";
import useAuth from "./hooks/useAuth";

//TS components
import MDAvatar from "components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = () => {
  const { auth } = useAuth();

  return [
    {
      type: "collapse",
      name: `${auth?.user?.firstName} ${auth?.user?.lastName}`,
      key: `${auth?.user?.firstName}-${auth?.user?.lastName}`,
      icon: (
        <MDAvatar
          src={`${auth?.user?.profileImage} `}
          alt={`${auth?.user?.firstName} ${auth?.user?.lastName}`}
          size="sm"
        />
      ),
      collapse: [
        {
          protect: true,
          name: "My Profile",
          key: "my-profile",
          route: "/profile/profile-overview",
          component: <ProfileOverview />,
        },
        {
          protect: true,
          name: "Settings",
          key: "profile-settings",
          route: "/account/settings",
          component: <Settings />,
        },
      ],
    },
    { type: "divider", key: "divider-0" },
    {
      type: "collapse",
      name: "Analytics",
      key: "Analytics",
      icon: <Icon fontSize="medium">analytics</Icon>,
      collapse: [
        {
          protect: true,
          name: "Home",
          key: "home",
          route: "/analytics/home",
          component: <Home />,
        },
      ],
    },
    { type: "title", title: "Features", key: "title-features" },
    {
      type: "collapse",
      name: "SIS",
      key: "sis",
      icon: <Icon fontSize="medium">analytics</Icon>,
      collapse: [
        {
          protect: true,
          name: "Schools",
          key: "schools",
          route: "/sis/schools",
          component: <SchoolList />,
        },
      ],
    },
    { type: "divider", key: "divider-1" },
    // TODO:all routes that doesn't need to be displayed on the sidenav bar must go below this comment
    {
      type: "collapse",
      name: "invisibles",
      display: false,
      key: "invisibles",
      icon: <Icon fontSize="medium">content_paste</Icon>,
      collapse: [
        {
          name: "Sign In",
          key: "sign-in",
          collapse: [
            {
              name: "Basic",
              key: "basic",
              route: "/authentication/sign-in",
              component: <SignInBasic />,
            },
          ],
        },
        {
          name: "Reset Password",
          key: "reset-password",
          collapse: [
            {
              name: "Cover",
              key: "cover",
              route: "/authentication/reset-password",
              component: <ResetCover />,
            },
          ],
        },
        {
          protect: true,
          name: "School details",
          key: "schools-details",
          route: "/sis/schools/school-details",
          component: <SchoolDetails />,
        },
      ],
    },
  ];
};
export default routes;
