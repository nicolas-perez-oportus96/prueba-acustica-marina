# Prueba Técnica Acústica Marina: Visualizador de CSV

**URL:** https://prueba-acustica-marina.vercel.app/

## Descripción
Aplicación web que permite cargar un archivo csv con muestras de niveles de presencia sonora para visualizar sus valores en un gráfico.

## Dependencias
- **Next JS:** Framework Javascript basado en React
- **Material UI:** Librería de componentes y estilos
- **normalize.css:** Normalización de estilos css para navegadores web.
- **react-papaparse:** Wrapper de la librería papaparse para permitir y gestionar la carga del archivo .csv
- **react-chartjs-2:** Librería de gráficos basado en ChartJS.

## Instrucciones de ejecución en ambiente local
1. Descarga el repositorio
2. Navega hacia el desde una consola de comandos
3. Ejecuta el comando `npm install` para instalar sus dependencias
4. Ejecuta el comando `npm run dev` ejecutar la aplicación en modo desarrollo

* NOTA: Debes tener instalado Node.js en tu equipo para ejecutar comandos NPM.

## Instrucciones de uso
1. Cargar el archivo csv con las medicines de NPS. 
    * NOTA: solo permitirá la carga de un archivo que contenga las cabeceras: *fecha_captura*, *dispositivo* y *nps_global*
2. Visualizar el gráfico en pantalla
    * Haz zoom con la rueda del mouse
    * Haz hover sobre un punto para ver sus datos 
    * Haz clic sobre un dispositivo para filtrar sus datos
3. Puedes quitar el archivo cargado haciendo clic en el botón ubicado al lado derecho de la barra superior.