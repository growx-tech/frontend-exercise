import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import growy_logo from '../../public/growy_logo.svg'


const Navbar=()=> {
  return (
    <Box sx={{ flexGrow: 1 }} className="!mb-8">
      <AppBar position="static" className="!bg-gray-100">
        <Toolbar>
          <img src={growy_logo} alt='Growy Logo' className='h-10 w-10 object-contain' />
          <Typography variant="h6" className='!text-green-800' component="div" sx={{ flexGrow: 1 }}>
            Memory Game
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar