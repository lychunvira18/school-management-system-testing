import {TableCell, withStyles} from '@material-ui/core'

export default  withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.primary.light,
      color: "#fff",
      fontSize: 14
    },
    body: {
      fontSize: 14,
      paddingRight: 5,
      paddingLeft: 5,
      textAlign: "center",
      margin: 0,
      width: 100
    }
}))(TableCell);