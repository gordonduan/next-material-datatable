import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Link from "next/link";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Menu from '../../config/menu'

// interface MenuList<T> {
//   title: string;
//   icon: React.Component;
//   key: string;
//   level: number;
//   items?: Array<T>;
// }
// interface MenuItem {
//   title: string;
//   icon: React.Component;
//   key: string;
//   level: number;
// }

// interface Props {
//   item: MenuItem;
//   itemList: MenuList<MenuItem>;
// }

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

export default function SideMenu() {
  return Menu.map((item, key) => <MenuItem key={key} item={item} />);
}

function Car() {
  return <h2>Hi, I am also a Car!</h2>;
}
const MenuItem = ({ item }) => {
  const hasChildren = (item) => {
    const { items: children } = item;
    if (children === undefined || children.constructor !== Array || children.length === 0) {
        return false;
    }
    return true;
  }
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item}/>;
};
// const MenuItem = ({ item }) => {
//   const hasChildren = (item) => {
//     const { items: children } = item;
//     if (children === undefined || children.constructor !== Array || children.length === 0) {
//         return false;
//     }
//     return true;
//   }
//   const Component = hasChildren(item) ? MultiLevel : SingleLevel;
//   return <Component item={item}/>;
// };

const SingleLevel = ({ item }) => {
  return (
    <ListItem button>
      <ListItemIcon>{item.icon} </ListItemIcon>
        <Link href={item.key}>
          <ListItemText primary={item.title} />
        </Link>
      </ListItem>
  )
};

const MultiLevel = ({ item }) => {
  const classes = useStyles();
  const { items: children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit className={classes.nested}>
        <List component="div" disablePadding>
        {children.map((child, key) => (
            <MenuItem key={key} item={child} />
        ))}
        </List>
      </Collapse>
    </React.Fragment>
    );
  };
