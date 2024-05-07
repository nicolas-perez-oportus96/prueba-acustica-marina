'use client'
import { useData } from '@/hooks/useData';
import { useState, useRef } from 'react';
import { useCSVReader, lightenDarkenColor, formatFileSize } from 'react-papaparse';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
    DEFAULT_REMOVE_HOVER_COLOR,
    40
);
const GREY_DIM = '#686868';
const styles = {
    zone: {
        alignItems: 'center',
        border: `2px dashed ${GREY}`,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        height: '180px',
        justifyContent: 'center',
    },
    file: {
        background: 'linear-gradient(to bottom, #EEE, #DDD)',
        borderRadius: 20,
        display: 'flex',
        height: 120,
        width: 120,
        position: 'relative',
        zIndex: 10,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    info: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
    },
    size: {
        backgroundColor: GREY_LIGHT,
        borderRadius: 3,
        marginBottom: '0.5em',
        justifyContent: 'center',
        display: 'flex',
    },
    name: {
        backgroundColor: GREY_LIGHT,
        borderRadius: 3,
        fontSize: 12,
        marginBottom: '0.5em',
    },
    progressBar: {
        bottom: 14,
        position: 'absolute',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    zoneHover: {
        borderColor: GREY_DIM,
    },
    default: {
        borderColor: GREY,
    },
    remove: {
        height: 23,
        position: 'absolute',
        right: 6,
        top: 6,
        width: 23,
    },
};

export default function CSVReader() {
    const { CSVReader } = useCSVReader();
    const [zoneHover, setZoneHover] = useState(false);
    const [removeHoverColor, setRemoveHoverColor] = useState(DEFAULT_REMOVE_HOVER_COLOR);

    const { setData, setDispositivos } = useData()
    const readerRef = useRef();

    const onDragOver = (e) => {
        e.preventDefault();
        setZoneHover(true);
    };
    const onDragLeave = (e) => {
        e.preventDefault();
        setZoneHover(false);
    };

    const handleDataUpload = (result) => {
        setZoneHover(false);
        console.log(result)
        let { data } = result

        let keys = Object.keys(data[0]);
        console.log(keys)

        if (keys.includes('nps_global') && keys.includes('fecha_captura') && keys.includes('dispositivo')) {
            // limpiando registros vacios
            let filteredData = data.filter(val => val.id !== '' && val.id !== '\n');

            // formateando registros
            let formattedData = filteredData.map(val => {
                let bandas = val['bandas'];
                return {
                    ...val,
                    id: String(val.id).replace('\n', ''),
                    bandas: JSON.parse(bandas).data
                }
            })
            const dispositivos = [...new Set(formattedData.map(val => val.dispositivo))];

            console.log(formattedData.length)

            setData(formattedData)
            setDispositivos(dispositivos)

        } else {
            alert("El archivo csv no contiene la estructura esperada.")
            window.location.reload()
        }


    };

    return (
        <form ref={readerRef}>
            <CSVReader onUploadAccepted={handleDataUpload} onDragOver={onDragOver} onDragLeave={onDragLeave} config={{ header: true, skipEmptyLines: true }} >
                {({
                    getRootProps,
                    acceptedFile,
                    ProgressBar,
                    getRemoveFileProps,
                    Remove,
                }) => (
                    <div
                        {...getRootProps()}
                        style={Object.assign(
                            {},
                            styles.zone,
                            zoneHover && styles.zoneHover
                        )}
                    >
                        {acceptedFile
                            ? <>
                                <div style={styles.file}>
                                    <div style={styles.info}>
                                        <span style={styles.size}>
                                            {formatFileSize(acceptedFile.size)}
                                        </span>
                                        <span style={styles.name}>{acceptedFile.name}</span>
                                    </div>
                                    <div style={styles.progressBar}>
                                        <ProgressBar />
                                    </div>
                                    <div
                                        {...getRemoveFileProps()}
                                        style={styles.remove}
                                        onMouseOver={(event) => {
                                            event.preventDefault();
                                            setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                                        }}
                                        onMouseOut={(event) => {
                                            event.preventDefault();
                                            setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                                        }}
                                    >
                                        <Remove color={removeHoverColor} />
                                    </div>
                                </div>
                            </>
                            : <span>Haz clic aquí, o arrastra el archivo .csv visualizar sus datos.</span>
                        }
                    </div>
                )}
            </CSVReader>
        </form>
    );


}