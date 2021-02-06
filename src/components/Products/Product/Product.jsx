import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import './style.css';
import useStyles from './styles';


const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();

    

    return (
        <Card className={classes.root} className="all-card">
            <CardMedia className={classes.media} image={product.media.source} title={product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" />
                   
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
            <Typography style={{marginLeft: '15px'}} variant="h5" gutterBottom>
                        {product.price.formatted_with_symbol}
                    </Typography>
                <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                  <ShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default Product
