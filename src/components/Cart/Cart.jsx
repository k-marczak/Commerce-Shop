import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import './style.css'
import useStyles from './styles';
import CartItem from './CartItem/CartItem';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart  }) => {


    const classes = useStyles();
    

    const EmptyCart = () => (
        <Typography style={{color: 'black'}}  variant="subtitle1">Twój koszyk jest pusty, dodaj do koszyka przedmioty naciskając 'Dodaj...'

            <Button className="btn">
               <Link to="/" className={classes.link}>Dodaj...</Link>
            </Button>
            
            <div className="space"></div>
           
        </Typography>
        
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                    <Typography variant="h4" style={{color: 'black', marginTop: '0'}}>
                        Suma: { cart.subtotal.formatted_with_symbol }
                    </Typography>
                    <div style={{marginBottom: '40px'}}> 
                        <Button style={{backgroundColor: '#e41749'}} className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>
                            Usuń wszystkie
                        </Button>
                        <Button style={{backgroundColor: '#482ff7'}}  component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">
                            Zapłać
                        </Button>
                    </div>
            </div>
        </>
    );

    if(!cart.line_items) return 'Loading...'



    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} style={{color: 'black'}} variant="h3" gutterBottom >Twój Koszyk</Typography>
            { !cart.line_items.length ? <EmptyCart /> : <FilledCart/> }
        </Container>
    )
}

export default Cart
