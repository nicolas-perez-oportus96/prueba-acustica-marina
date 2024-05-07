'use client'
import { AppBar, Box, Toolbar, Typography, Button, Chip, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useData } from '@/hooks/useData';
import { Close, CloudDone } from '@mui/icons-material';
export default function Topbar() {

    const { data, setData, dispositivos, selectedDispositivo, handleSelectDispositivo } = useData()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
                <Toolbar >

                    <Box display='flex' justifyContent='space-between' alignItems='center' width={'100%'}>
                        {/* LEFT */}
                        <img src="/images/logo.png" alt='AM logo' width={'100px'} style={{ marginRight: '20px' }} />

                        {/* right */}
                        {data.length !== 0 &&
                            <Chip
                                icon={<CloudDone sx={{ fontSize: '25px' }} />}
                                deleteIcon={<Close />}
                                onDelete={() => setData([])}
                                color='success'
                                label="Archivo de datos"
                            />
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}