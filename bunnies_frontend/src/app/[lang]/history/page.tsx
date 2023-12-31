'use client'

import Link from 'next/link'
import { useParams, notFound } from 'next/navigation';

import React, { useCallback, useEffect, useState } from "react";

import { Box, ThemeProvider, Typography, createTheme } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';

import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { ColorModeContext, getDesignTokens } from "../../styles/designTokens";
import { search, searchInHistory } from "../../api/search";
import { Video, getOne } from "../../api/videos";
import RecommendedList from "../../components/RecommendedList";
import { getMe } from "../../api/users";

import translation from '@/app/locales/translation';

export function History() {

  const params  = useParams();
  const lang: string = (params.lang).toString()

  const langDictionary = translation[lang]
  if (langDictionary === undefined)
    notFound()

  const [data, setData] = useState<Video[]>([])

  const [searchText, setSearchText] = useState<string|undefined>(undefined);
  const searchHandler = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  }, [])
    
  useEffect(() => {
    if (searchText === undefined || searchText === '') {
      getMe().then((user) => 
        user.history.map((history) => history.video) 
      ).then((videoIdArray) => {
        for (const videoId of videoIdArray) {
          getOne(videoId).then((video) => {
            setData((prev)=>[...prev, video])
          })
        }
      })
    } else {
      searchInHistory(searchText).then((videoArray) => {
        setData(videoArray)
      })
    }

  }, [searchText])


  return(
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      
      <Header
        searchHandler={searchHandler}
        ColorModeContext={ColorModeContext}
        text={{searchText: searchText, setSearchText: setSearchText}}
        language={{langDictionary: langDictionary, lang: lang}}
      />
            
      <Box 
        component="main"
        sx={{ 
          bgcolor: 'background.default',
          color: 'text.primary',
          flexGrow: 1, p: 3,
        }}
        className='overflow-scroll scrollbar-thin scrollbar-thumb-gray-800'
      >

            <Box className="flex items-center">
                <Typography className='text-[18px] font-bold my-2 px-2'>
                  {langDictionary['history']}
                </Typography>
                <HistoryIcon />
            </Box>

            {data.length !== 0
              ? data.map((video) => (
                <Link
                  href={`/${lang}/video/${video.id}`}
                >
                  <RecommendedList video={video} langDictionary={langDictionary} />
                </Link>
              ))
              : <Typography className="my-2 px-2">{langDictionary['history_list']}</Typography>
            }
        </Box>

      <BottomNav language={{langDictionary: langDictionary, lang: lang}} />

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
        <History />
      </ThemeProvider>
    </ColorModeContext.Provider>
    );
}
