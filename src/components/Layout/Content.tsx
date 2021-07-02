import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // color: rgb
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Content = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.content}>
      <div className={classes.toolbar} />
      {props.children}
    </Box>
  );
}

export default Content;
