import React, {useState, useEffect} from 'react'
import { Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { commerce } from '../../lib/commerce';


import FormInput from './CustomTextField';



const AddressForm = ({ checkoutToken, next }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();




    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
      };

      const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
    
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
      };

      const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
    
        setShippingOptions(options);
        setShippingOption(options[0].id);
      };

    
 

      useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
      }, []);
    
      useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
      }, [shippingCountry]);
    
      useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
      }, [shippingSubdivision]);

    return (
        <>
            <Typography variant="h6" gutterBottom>Adres dostawy</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
                
                    <Grid container spacing={3} style={{marginBottom: '15px'}}>
                        <FormInput name='firstName' label="Imie" />
                        <FormInput name='lastName' label="Nazwisko" />
                        <FormInput name='address1' label="Adres" />
                        <FormInput name='email' label="Email" />
                        <FormInput name='city' label="Miasto" />
                        <FormInput name='zip' label="Kod pocztowy" />
            
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to="/cart" variant='outlined'>Wróć</Button>
                        <Button type="submit" variant='contained' color="primary">Dalej</Button>
                    </div>
                </form>
            </FormProvider>        
        </>
    )
}

export default AddressForm
