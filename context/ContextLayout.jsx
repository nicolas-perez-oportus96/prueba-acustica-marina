'use client'
import Topbar from "@/components/Topbar";
import { DataContextProvider } from "@/context/data.context";
import theme from "@/theme";
import { Box, Grid } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';

const ContextLayout = ({ children }) => {
    return (
        <DataContextProvider>
            <ThemeProvider theme={theme}>
                <Box>
                    {/* Topbar */}
                    <Topbar />

                    {/* Cuerpo */}
                    <Grid container spacing={2} sx={{ marginTop: 4 }}>
                        {/* Espaciado en la parte superior */}
                        <Grid item xs={12} />

                        {/* Contenido principal */}
                        <Grid item xs={12}>
                            {children}
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        </DataContextProvider>

    );
};

export default ContextLayout;