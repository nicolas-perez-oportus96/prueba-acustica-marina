'use client'
import { useData } from '@/hooks/useData'
import React from 'react'
import CSVReader from '@/components/DropCSVComponent'
import { Box, Grid, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
const HistogramComponent = dynamic(() => import('@/components/HistogramComponent'), {
    ssr: false, // Disable server-side rendering
});


export default function Panel() {
    const { data } = useData()

    return (
        <Box>
            <Grid container spacing={8}>
                {
                    data.length !== 0
                        ? <Grid item xs={12}>
                            <HistogramComponent />
                        </Grid>
                        : <Grid item xs={12} display='flex' justifyContent='center' alignItems='center' >
                            <Box paddingTop='300px' >
                                <Typography textAlign='center' fontSize='3rem' paddingBottom='60px'>
                                    Importar archivo de datos
                                </Typography>
                                <CSVReader />
                            </Box>
                        </Grid>
                }
            </Grid>
        </Box>
    )
};