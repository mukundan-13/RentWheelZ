import React, { useState } from 'react';
import { Container, Typography, Button, Grid, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Background = styled('div')({
  background: 'linear-gradient(135deg, #2a2a72, #009ffd)',
  width: '100%',
  height: 'auto',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'column',
  color: 'black',
  textAlign: 'center',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: '20px',
  backgroundColor: 'black',
  color: '#009ffd',
  padding: '12px 30px',
  borderRadius: '25px',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#00b0ff',
  },
}));

const CarGridCard = styled('div')({
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  },
});

const FaqSection = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ mt: 6, padding: '40px 0', backgroundColor: '#eeeeee', borderRadius: '8px' }}>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            1. How do I make a reservation?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            To make a reservation, simply choose a car model, select your pickup and drop-off dates, and follow the booking process. You will receive an email confirmation once your reservation is confirmed.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            2. Can I rent a car without a credit card?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            At RentWheelz, a valid credit card is required to make a reservation. However, we accept debit cards in certain cases. Please contact our customer support for more information.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            3. What is your cancellation policy?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Cancellations made up to 48 hours before your rental period will receive a full refund. Cancellations within 24–48 hours will incur a 20% fee. Cancellations within 24 hours are non-refundable.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            4. What happens if I lose the keys or damage the car?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            In case you lose the keys or damage the car, you will be charged for the replacement or repair costs. Please report any damages immediately upon return of the vehicle.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            5. How can I contact customer support?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            You can contact our customer support by phone at (123) 456-7890, via email at support@rentwheelz.com, or by using the live chat feature on our website.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

const Dashboard = () => {
  return (
    <Background>
      <Container maxWidth="md" style={{ zIndex: 10 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to RentWheelz!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Explore the best cars around you
        </Typography>
        <StyledButton variant="contained">
          Browse Cars
        </StyledButton>
      
        {/* Car Grid Section */}
        <Grid container spacing={3} style={{ marginTop: '40px' }}>
          <Grid item xs={12} sm={6} md={4}>
            <CarGridCard>
              <img 
                src="https://imgd.aeplcdn.com/600x337/n/cw/ec/134287/city-exterior-right-front-three-quarter-77.jpeg?isig=0&q=80" 
                alt="Car 1" 
                style={{ width: '100%', borderRadius: '10px', marginBottom: '15px' }}
              />
              <Typography variant="h6">Luxury Sedan</Typography>
              <Typography variant="body2" color="textSecondary">Explore the finest luxury sedan with all the comfort you need.</Typography>
              <StyledButton variant="outlined">Book Now</StyledButton>
            </CarGridCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CarGridCard>
              <img 
                src="https://5.imimg.com/data5/SELLER/Default/2023/6/313621842/TP/EA/EF/190859789/sports-car-500x500.jpg" 
                alt="Car 2" 
                style={{ width: '100%', borderRadius: '10px', marginBottom: '15px' }}
              />
              <Typography variant="h6">Sports Coupe</Typography>
              <Typography variant="body2" color="textSecondary">Experience the thrill of speed with this stunning sports coupe.</Typography>
              <StyledButton variant="outlined">Book Now</StyledButton>
            </CarGridCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CarGridCard>
              <img 
                src="https://media.drive.com.au/obj/tx_q:50,rs:auto:1920:1080:1/driveau/upload/cms/uploads/eifawg9c5l7igi5lxctw" 
                alt="Car 3" 
                style={{ width: '100%', borderRadius: '10px', marginBottom: '15px' }}
              />
              <Typography variant="h6">Family SUV</Typography>
              <Typography variant="body2" color="textSecondary">The perfect choice for a family trip with plenty of space and style.</Typography>
              <StyledButton variant="outlined">Book Now</StyledButton>
            </CarGridCard>
          </Grid>
        </Grid>

        <FaqSection />
      </Container>
    </Background>
  );
};

export default Dashboard;
