import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const menuList = [
  {
    title: "Home",
    icon: <HomeIcon />,
    key: "/home",
    level: 0
  },
  {
    title: "Group",
    icon: <GroupAddIcon />,
    key: "/group",
    level: 0,
    items: [
      {
        title: "User",
        icon: <AccountBoxIcon />,
        key: "/group/user",
        level: 1
      },
    ]
  },
  {
    title: "Options",
    icon: <SettingsIcon />,
    key: "/options",
    level: 0
  }
];

export default menuList;
