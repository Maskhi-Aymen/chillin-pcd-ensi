import React from 'react';
import '../../assets/styles/profile.css';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import av1 from '../../assets/images/avatar/avatar1.png';
import av2 from '../../assets/images/avatar/avatar2.png';
import av3 from '../../assets/images/avatar/avatar3.png';
import av4 from '../../assets/images/avatar/avatar4.png';
import av0 from '../../assets/images/avatar/avatar0.jpg';
import av5 from '../../assets/images/avatar/avatar5.png';
import av6 from '../../assets/images/avatar/avatar6.png';
import av7 from '../../assets/images/avatar/avatar7.png';
import av8 from '../../assets/images/avatar/avatar8.png';
import av9 from '../../assets/images/avatar/avatar9.png';
import av10 from '../../assets/images/avatar/avatar10.png';
import av11 from '../../assets/images/avatar/avatar11.png';
import av12 from '../../assets/images/avatar/avatar12.png';

export default function PhotoProfile({ name, Lname, photo }) {

	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState (photo);
	const [ischanged, setischanged] = React.useState(false);
	const [issaved, setissaved] = React.useState(false);
  
	const handleClickOpen = () => {
	  setOpen(true);
	};
  
	const handleClose = (value: File) => {
	  setOpen(false);
	  setSelectedValue(value);
	  setischanged(true)
	  setissaved(true)
	};
  
	const postdata= async ()=>{
		const user=localStorage.getItem('user');
	  const res = await axios.put('http://localhost:8000/user', {"user_id":user,
	  "user_avatar":selectedValue, });
	  
		  setissaved(false)
		  window.location.reload(true)
	
   
	}


	return (
		<section >
			<div className="PagePhotoProfile">
				<div className="ContainerPhotoProfile">
					<div >
						<Typography variant="subtitle1" component="div">
							{(ischanged==true)? <img src={selectedValue} className="registration-image"></img>:<img src={photo} className="registration-image"></img>}
						</Typography>
						<br />
						<button  className='button-profile' onClick={handleClickOpen}>
							Change 
						</button>
						{(issaved == true) ? <button className='button-profile'  onClick={postdata}>
							Save
						</button> : <></>}
						<SimpleDialog
							selectedValue={selectedValue}
							open={open}
							onClose={handleClose}
						/>
					</div>
				</div>
			</div>
			<div className='label_profile'>{name}{" "}{Lname}</div>
		</section>
	);

}

const emails = [av0,av1,av2,av3,av4,av5,av6,av7,av8,av10,av9,av11,av12]; 

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>choose one</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <img src={email} width="200" height="200" ></img>
            </ListItemAvatar>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
