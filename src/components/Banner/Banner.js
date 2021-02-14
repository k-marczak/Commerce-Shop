import {useRef, useEffect} from 'react'
import { Container, Typography, Button, Grid } from "@material-ui/core";
import image from '../../assets/image.svg'
import './style.css'
import {TweenMax, Power3} from 'gsap'





const Banner = () => {

  let header1 = useRef();

  useEffect(() => {
    TweenMax.to(
      header1,
      1.4,
      {
        opacity: 1,
        y: 15,
        ease: Power3.easeOut
      }
    )  
  })

  
  return (
    <div className="banner">
      <Container>
        <Grid container className="huj" spacing={4}>
          <Grid className="header" item xs={12} sm={6}>
            <Typography className="title" variant="h4">
              Witamy w naszym sklepie obuwniczym
            </Typography>
            <h4 style={{marginLeft: '23px', color: 'grey'}}>Szeroki zakres asortymentu</h4>
            <Button className="shopping-button" href="#products">
              Produkty
            </Button>
          </Grid>
          <Grid className="brand" item sm={6}>
            <img ref={el => {header1 = el}} src={image} style={{height: '300px', marginTop: '110px', opacity: '0'}} alt="Brand-tv" />
          </Grid>
        </Grid>
        
        
      </Container>
    </div>
  );
};

export default Banner;