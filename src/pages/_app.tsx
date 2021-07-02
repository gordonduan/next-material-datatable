import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../theme';
import GlobalStyles from '../components/GlobalStyles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import MainLayout from '../components/Layout/MainLayout'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}));

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout >
    </ThemeProvider>
  )
}

export default App
