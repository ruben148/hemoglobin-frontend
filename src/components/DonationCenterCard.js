import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";

import useStyles from "../styles";

function DonationCenterCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={"https://source.unsplash.com/random/"}
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5">
          {props.donationCenter.name}
        </Typography>
        <Typography>{props.donationCenter.description}</Typography>
      </CardContent>
      <CardActions>
        {props.children}
      </CardActions>
    </Card>
  );
}

export default DonationCenterCard;
