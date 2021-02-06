import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom'

import logo from '../../assets/gym-shoes.svg'
import useStyles from './styles';
import './styles.css'


const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();

    


    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
                        Sklep Legit 
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                    <div className={classes.button}>
                        <IconButton style={{marginTop: '10px'}} component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart className="search"/>
                            </Badge>
                        </IconButton>
                    </div> )}
                </Toolbar>
            </AppBar>   
        </>
    )
}

export default Navbar
