import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PublicIcon from '@mui/icons-material/Public';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PersonIcon from '@mui/icons-material/Person';
import { ForkRight } from "@mui/icons-material";
import { LocationOn } from "@mui/icons-material";
import { Language } from "@mui/icons-material";




const Menuitems = [
  {
    title: "Dashboard",
    icon: DashboardOutlinedIcon,
    href: "/dashboard",
  },
  // {
  //   title: "Permission",
  //   icon: AdminPanelSettingsIcon,
  //   href: "/permission",
  // },
  {
    title: "Country",
    icon: PublicIcon,
    href: "/country",
    post_path: "/country_post",
    view_path: '/view_country',
    edit_path: '/edit_country'
  },
  {
    title: "State",
    icon: StoreMallDirectoryIcon,
    href: "/state",
    post_path: "/state_post",
    view_path: '/view_state',
    edit_path: '/edit_state'
  },
  {
    title: "City",
    icon: LocationCityIcon,
    href: "/city",
    post_path: "/city_post",
    view_path: '/view_city',
    edit_path: '/edit_city'

  },
  {
    title: "Branch",
    icon: ForkRight,
    href: "/branch",
    post_path: "/branch_post",
    view_path: '/view_branch',
    edit_path: '/edit_branch'
  },
  {
    title: "Zone",
    icon: LocationOn,
    href: "/zone",
    post_path: "/zone_post",
    view_path: '/view_zone',
    edit_path: '/edit_zone'
  },
  {
    title: "Site",
    icon: Language,
    href: "/site",
    post_path: "/site_post",
    view_path: '/view_site',
    edit_path: '/edit_site'
  },
  {
    title: "User",
    icon: PersonIcon,
    href: "/user",
    post_path: "/user_post",
    view_path: '/view_user',
    edit_path: '/edit_user'
  },
];

export default Menuitems;
