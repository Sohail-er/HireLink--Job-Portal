
import './App.css';
import {createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import Store from './Store';
import AppRoutes from './Pages/AppRoutes';
// @ts-ignore
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
function App() {
  useEffect(()=>{
    AOS.init({
      offset: 0,
      duration:800,
      easing:'ease-out'
    });
    AOS.refresh();
  }, []);

  const theme = createTheme({
    focusRing: "never",
    fontFamily: 'Poppins, sans-serif',
    primaryColor: 'purple',
    primaryShade: 6,
    colors: {
      'purple': ['#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#3b0764'],
      'pink': ['#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#be185d', '#9d174d', '#831843', '#500724']
    }
  })
  return (
    <Provider store={Store}>
    <MantineProvider defaultColorScheme="light" theme={theme} >
       <Notifications  position="top-center" zIndex={2001} />
      <AppRoutes/>
    </MantineProvider>
    </Provider>
  );
}

export default App;
