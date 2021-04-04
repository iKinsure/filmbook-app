import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { withStyles } from '@material-ui/core/styles';
import Copyright from "./Copyright";
import {VideoLibrary} from "@material-ui/icons";

const useStyles = theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%',
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
});

class Album extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }
    async componentDidMount() {
        await fetch('/api/films')
            .then(res => res.json())
            .then(json => this.setState({data: json}));
    }
    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <VideoLibrary className={classes.icon} />
                        <Typography variant="h6" color="inherit" noWrap>Filmbook</Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Grid container spacing={4}>

                            {this.state.data.map((film, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={film.image}
                                            title={film.title}
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">{film.title}</Typography>
                                            <Typography>{film.description}</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary">View</Button>
                                            <Button size="small" color="primary">Rate</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}

                        </Grid>
                    </Container>
                </main>
                <footer className={classes.footer}><Copyright /></footer>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles) (Album);
