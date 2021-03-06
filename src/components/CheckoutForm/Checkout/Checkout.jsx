import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';

import { Link } from 'react-router-dom'
import { commerce } from '../../../lib/commerce';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import './style.css';


const steps = ['Adres dostawy', 'Płatności'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
          try {
            const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

            setCheckoutToken(token);
          } catch (error) {
            console.log(error)
          }
        }

        generateToken();
    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1 );
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1 );

    const next = (data) => {
      setShippingData(data);

      nextStep();
    }

    let Confirmation = () => (
      <>
        <div>
          <h2>Dziękujemy za zakupy. Życzymy miłego dnia :)</h2>
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Strona główna</Button>
      </>
    );

    


    const Form = () => activeStep === 0
      ? <AddressForm checkoutToken={checkoutToken} next={next} />
      : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} />

 
  
  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper} className="paper">
          <Typography variant="h4" align="center">Podsumowanie</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
        </Paper>
      </main>
    </>
  );
};
export default Checkout;