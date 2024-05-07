import { useData } from '@/hooks/useData';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, LinearScale, PointElement, LineElement, Tooltip, Legend, Title, TimeScale, SubTitle } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns'
import { Box, Typography } from '@mui/material';

Chart.register(CategoryScale, PointElement, LinearScale, TimeScale, LineElement, Tooltip, Legend, Title, SubTitle, zoomPlugin);

const HistogramComponent = () => {

    const { data } = useData();
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    const COLORS = {
        10: '#81AE9D',
        11: '#6969b3'
    }

    const OPTIONS = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'NPS por Dispositivo',
                font: {
                    size: 20,
                    weight: 'bold'
                }
            },
            subtitle: {
                display: true,
                text: 'Haz clic en un dispositivo para filtrar sus datos',
                font: {
                    size: 15,
                    weight: '300'
                },
                padding: {
                    bottom: 25
                }
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x'
                },
                zoom: {
                    pinch: {
                        enabled: true
                    },
                    wheel: {
                        enabled: true
                    },
                    mode: 'x',
                }
            }
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    parser: 'dd/MM/yyyy HH:mm:ss',
                    unit: 'minute',
                    displayFormats: {
                        'minute': 'dd/MM/yyyy HH:mm:ss',
                        'hour': 'dd/MM/yyyy HH:mm:ss'
                    }
                },
                title: {
                    display: true,
                    text: 'Fecha y hora',
                    font: {
                        size: 15,
                        weight: 'bold'
                    },
                },
                subtitle: {
                    display: true,
                    text: 'Desplaza la rueda del mouse para hacer zoom',
                    font: {
                        size: 15,
                        weight: 'bold'
                    },
                },
                ticks: {
                    source: 'data'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Nivel de presencia sonora',
                    font: {
                        size: 15,
                        weight: 'bold'
                    },
                },
            },

        },
        transitions: {
            zoom: {
                animation: {
                    duration: 1000,
                    easing: 'easeOutCubic'
                }
            }
        }
    };

    useEffect(() => {
        if (!data || data.length === 0) {
            return;
        };
        const sortedData = [...data].sort((a, b) => new Date(a.fecha_captura) - new Date(b.fecha_captura));
        const medicionesPorDispositivo = {};
        sortedData.forEach((medicion) => {
            const { dispositivo, fecha_captura, nps_global } = medicion;
            if (!medicionesPorDispositivo[dispositivo]) {
                medicionesPorDispositivo[dispositivo] = { fechas: [], mediciones: [] };
            }
            medicionesPorDispositivo[dispositivo].fechas.push(new Date(fecha_captura));
            medicionesPorDispositivo[dispositivo].mediciones.push(nps_global);
        });
        const datasets = Object.keys(medicionesPorDispositivo).map((dispositivo) => {
            return {
                label: `Dispositivo ${dispositivo}`,
                data: medicionesPorDispositivo[dispositivo].mediciones,
                fill: false,
                borderColor: COLORS[dispositivo],
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: COLORS[dispositivo],
                pointRadius: 6,
                pointHoverRadius: 10
            };
        });
        const allDates = Object.values(medicionesPorDispositivo).flatMap((datosDispositivo) => datosDispositivo.fechas);
        const chartData = {
            labels: allDates,
            datasets: datasets,
        };

        console.log(chartData)
        setChartData(chartData);
        setLoading(false)
    }, [data]);

    if (loading) return <h1>Cargando gráfico</h1>

    return (
        <Box style={{ height: '100%', width: '100%', overflowX: 'auto' }}>
            <Box style={{ width: '100%', minHeight: '800px', }}>
                <Line
                    data={chartData}
                    redraw={true}
                    options={OPTIONS}
                />
            </Box>

            <Typography textAlign='center' fontSize={15} fontWeight={200} color={'#666666'}>
                Usa la rueda del mouse en el gráfico para hacer zoom a sus datos 
            </Typography>
        </Box>
    );
};

export default HistogramComponent;