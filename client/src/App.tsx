import React from 'react';
import logo from './logo.svg';
import './App.css';
import TournamentsList from './components/TournamentsList/TournamentsList';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Players from './components/Players/Players';



function App() {
  return (
    <Box sx={{ 
      position: 'absolute', 
      top: 0, 
      bottom: 0, 
      left: 0, 
      right: 0, 
      display: 'flex',
      flexDirection: 'column'
    }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant='h6' component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>TMS</Typography>
          <Button color="inherit" component={Link} to="/">Tournaments</Button>
          <Button color="inherit" component={Link} to="/players">Players</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 1, flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
