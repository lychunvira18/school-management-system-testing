import React from 'react'
import classNames from "classnames"
import { Button, Grid } from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"

const DownloadButton = ({classes, handleClick}) => {
return <Grid container justify="flex-end" alignItems="flex-end">
    <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClick}
    >
        <SaveIcon
            className={classNames(classes.leftIcon, classes.iconSmall)}/>
        Print PDF
    </Button>
</Grid> 
}
export default DownloadButton