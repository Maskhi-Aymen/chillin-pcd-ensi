import * as React from 'react';
import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Slider from '@mui/material/Slider';
import {  styled } from '@mui/material/styles';
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import dayjs from "dayjs";

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#F4ACB7',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#F4ACB7',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#F4ACB7',
      },
      '&:hover fieldset': {
        borderColor: '#F4ACB7',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#F4ACB7',
      },
    },
  });

const CssButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#F4ACB7'),
  backgroundColor:'#F4ACB7' ,
  color:'#ffff',
  '&:hover': {
    backgroundColor: '#F4ACB7',
  },
}));

export default function UpdateEvent({isopen,Onclose,removeEvent,event}) {
  const plan =JSON.parse(localStorage.getItem("plan"))
  const [open, setOpen] = React.useState(isopen);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const [reponse, setreponse] = useState('');
  const handleCloseA = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const [openA, setOpenA] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const handleAffiche = () => {
    setOpenA(false)
   setOpenAlert(true)
 };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    Onclose()
  };

  const [currency, setCurrency] = React.useState('kdytjytjd');
  const [duration, setduration] = React.useState(10);
  const [date, setdate] = React.useState();
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const handleDuration = (event) => {
    setduration(event.target.value);
  };
  const [res, setres] = React.useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const start=new Date(data.get('date')+" "+data.get('time'))
    const title=data.get('title');
    const end=dayjs(data.get('date')).format("YYYY-MM-DD");
  axios.post(`http://localhost:8000/activity/${plan['plan_id']}`, JSON.stringify(
        {
          'activity_name':data.get('title'),
          'activity_type': data.get('type'),
          'activity_time': data.get('time'),
          'activity_duration': duration+" min",
          'activity_date': dayjs(data.get('date')).format("YYYY-MM-DD"),
          'label':currency
        }
      ),{
         headers: {
           "Content-Type": "application/json",
           "Authorization": "Bearer "
         }
       })
       .then((json) => {
        alert(json.data)
       })
       .catch((err) => console.log(err));
       event.preventDefault();
   Onclose()
 

};

const handleDelete=(e)=>{
  fetch(`http://localhost:8000/activity/${plan['plan_id']}`,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      activity_name: event['title'],
      activity_date: dayjs(event['start']).subtract(1,'days').format("YYYY-MM-DD") ,
    }),
  }).then((resp)=>resp.json()).then((data) => {
 
  removeEvent(event['id'])
  setreponse(data)
  Onclose()
  handleAffiche()

 })
}

  const formulaire=(
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <CssTextField
                                required
                                defaultValue={event['title']}
                                id="title"
                                name="title"
                                label="Title"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <CssTextField
                                required
                                id="type"
                                name="type"
                                label="Type"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField
                                id="label"
                                select
                                label="Select activity label"
                                fullWidth
                                value={currency}
                                onChange={handleChange}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </CssTextField>
                        </Grid>  
                        <Grid item xs={12} sm={6}>
                        <div>{dayjs(event['start']).format("DD/MM/YYYY")}</div> 
                            <CssTextField
                                required
                                id="date"
                                defaultValue={(new Date())}
                                name="date"
                                label="Date"
                                type="date"
                                InputLabelProps={{shrink: true,}}
                                fullWidth
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <div>{dayjs(event['start']).format("HH:MM:ss")}</div> 
                            <CssTextField
                                required
                                id="time"
                                name="time"
                                label="Hour"
                                type="time"
                                InputLabelProps={{shrink: true,}}
                                fullWidth
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Box sx={{ 
                                width: 300, 
                                margin: 'auto'
                                }}>
                                    <Typography id="input-slider" gutterBottom>
                                        Duration *
                                    </Typography>
                            <Slider
                                aria-label="Time"
                                value={duration}
                                getAriaValueText={valuetext}
                                valueLabelDisplay="auto"
                                sx={{backroundColor:'#F4ACB7',color:'#F4ACB7'}}
                                onChange={handleDuration}
                                step={5}
                                marks={marks}
                                min={0}
                                max={30}
                            />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>  
                            <CssButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                >
                                Update
                            </CssButton>                        
                        </Grid>
                    </Grid>
            </Container>
        </Box>
  )

  return (
    <div>
   
      <Dialog
        fullScreen={fullScreen}
        open={isopen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >        <DialogActions>
        <Button autoFocus onClick={handleDelete}>
            <DeleteForeverIcon sx={{backroundColor:'#F4ACB7',color:'#F4ACB7'}}/>
          </Button>
          <Button autoFocus onClick={handleClose}>
            <CloseIcon sx={{backroundColor:'#F4ACB7',color:'#F4ACB7'}}/>
          </Button>
          
        </DialogActions>
        <DialogTitle id="responsive-dialog-title">
          {"Add new activity"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {formulaire}
          </DialogContentText>
        </DialogContent>

      </Dialog>
      <Snackbar
          open={openAlert}
          autoHideDuration={4000}
          onClose={handleCloseA}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={handleCloseA} style={{ backgroundColor:"#F4ACB7"}}>
            {reponse}
          </Alert>
        </Snackbar>
    </div>
  );
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const currencies = [
  {
    value: 'Early Morning',
    label: 'Early Morning',
},
  {
    value: 'Morning',
    label: 'Morning',
},
{
    value: 'Noonday',
    label: 'Noonday',
},,
{
  value: 'Early Night',
  label: 'Early Night',
},
{
    value: 'Evening',
    label: 'Evening',
},
,
  {
    value: 'Sun Set',
    label: 'Sun Set',
},
];

const marks = [
  {
      value: 0,
      label: '0 min',
  },
  {
      value: 5,
      label: '5 min',
  },
  {
      value: 10,
      label: '10 min',
  },
  {
      value: 15,
      label: '15 min',
  },
  {
      value: 20,
      label: '20 min',
  },
  {
      value: 25,
      label: '25 min',
  },
  {
      value: 30,
      label: '30 min',
  },
];

function valuetext(value) {
  return `${value} min`;
} 
/*
         
       
   
  */