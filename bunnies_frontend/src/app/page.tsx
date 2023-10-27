'use client'

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from './components/Header';
import { PaletteMode } from '@mui/material';
import Comments from './components/Comments';
import RecommendedList from './components/RecommendedList';
import VideoContainer from './components/VideoContainer';
import VideoInfo from './components/VideoInformation';
import { useEffect, useState } from 'react';
import { amber, grey, pink } from '@mui/material/colors';
import BottomNav from './components/BottomNav';
import { getAll } from './api/users';
import { getLine } from './api/views';
import { Video } from './api/videos';
import { ColorModeContext, getDesignTokens } from './styles/designTokens';


function Home() {

  const [data, setData] = useState<Video[]>([])

  useEffect(() => {
    getLine().then((videoArray) => {
      setData(videoArray)
    })
  }, [])

  const [video, setVideo] = useState<Video>(data[0])
  
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
      }}>
      
      <Header ColorModeContext={ColorModeContext} />
      
      <Box 
        component="main"
        sx={{ 
          bgcolor: 'background.default',
          color: 'text.primary',
          flexGrow: 1, p: 3,
        }}>
        
        
        {/* Main Container */}
        <Box className='md:w-full h-full'>
          {/* Top Section */}
          <Box className='relative w-full h-full max-h-[700px] grid grid-cols-3 gap-2 p-2 sm:w-[107vw] sm:right-[10vw] sm3:w-[108vw] sm3:right-[9vw] lg:right-0 md:right-0 md:w-full sm2:w-full sm2:right-0'>
            
            {/* Video Container */}
            <Box className='sm:col-span-6 md:col-span-2 rounded-lg overflow-hidden items-center justify-center flex'>
              <VideoContainer video={video} />
            </Box>

            {/* Recommended list */} 
            <Box className='sm:col-span-6 md:col-span-1 overflow-y-auto
              scrollbar-thin scrollbar-thumb-gray-800 lg:max-h-[70%] md:max-h-[65%]
             '
              sx={{ 
                bgcolor: 'background.additional',
                color: 'text.primary',
              }}
              id='recommendedList'
            >
        
              <Typography className='text-[18px] font-bold my-2 px-2'>
                Recommended
              </Typography>

              {data.map((video) => (
                <Box 
                  key={video.id}
                  onClick={() => setVideo(video)}
                >
                  <RecommendedList video={video} />
                </Box>
              ))}

            </Box>

          </Box>

          {/* Bottom Section */}
          {/* <Box className='w-full h-[30%]'> */}
          <BottomNav />
          {/* </Box> */}
        </Box>
      </Box>
    </Box>
  );
}


export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme(getDesignTokens(mode)),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}