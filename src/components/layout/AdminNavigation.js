import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  btn: {
    font: theme.font,
    color: theme.palette.primary.contrastText,
    border: theme.spacing(10, 10, 10),
    marginRight: "20px",
  },
  appbar: {},
}));

function AdminNavigation() {
  const classes = useStyles();
  const token = JSON.parse(Cookies.get("token"));
  return (
    <div>
      <AppBar className={classes.appbar} position="sticky">
        <Toolbar>
          <Typography variant="h5"> </Typography>

          <Link to="/doctors/all">
            <Button variant="outlined" className={classes.btn}>
              Doctori
            </Button>
          </Link>

          <Link to="/logout">
            <Button variant="outlined" className={classes.btn}>
              Logout
            </Button>
          </Link>

        </Toolbar>
      </AppBar>
    </div>
  );
}
export default AdminNavigation;
