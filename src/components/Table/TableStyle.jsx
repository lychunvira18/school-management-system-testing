import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3) * 3,
    overflow: "auto",
    marginBottom: theme.spacing(2)
  },
  subRoot:{
    marginTop: theme.spacing(0)
  },
  format: {
    flexGrow: 1,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 1400
  },
  table: {
    minWidth: 540
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#CFD8DC",
      fontSize: 14,
      paddingRight: 5,
      paddingLeft: 5,
      margin: 0
    }
  },
  generateTimetable: {
    padding: 0,
    marginTop: -60,
    marginBottom: theme.spacing(2)
  },
  container: {
    flexWrap: "wrap",
    marginBottom:10
    // margin:'-150 5 5 0',
  },
  submitButton: {
    display: "flex",
    justifyContent: "flex-end",
    padding: " 10px 0 15px 0"
  }
}));
