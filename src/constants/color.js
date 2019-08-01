import { grey, purple, red } from "@material-ui/core/colors/";
import { createMuiTheme } from '@material-ui/core/styles';



export const navColor = grey[900];
export const bodyColor = grey[200]
export const odoo = purple[200];
export const primary = red[500];


export const theme = createMuiTheme({
    palette: {
        primary: {
          light: '#375f88',
          main: '#05386B',
          dark: '#03274a',
          contrastText: '#fff',
        },
        secondary: {
          light: '#eb5260',
          main: '#e62739',
          dark: '#a11b27',
          contrastText: '#fff',
        },
        error: {
          light: '#eb5260',
          main: '#e62739',
          dark: '#a11b27',
          contrastText: '#000',
        },
        
    },
});
