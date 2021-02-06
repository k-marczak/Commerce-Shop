import React from 'react';
import { Grid } from '@material-ui/core';
import Banner from '../Banner/Banner'
import Product from './Product/Product';
import useStyles from './styles';
import Spinner from '../Spinner/Spinner';


const Products = ({ products, onAddToCart }) => {

    const classes = useStyles();

    if(!products.length) return(
        <>
            <Banner />
            <Spinner />
        </>
        
    );

    return(
       <>
       <Banner />
        <main className={classes.content} id="products">
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </main>
        </>
    )
}

export default Products;