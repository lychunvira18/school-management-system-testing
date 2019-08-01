import React from "react";
import CoursePicker from "../../Picker/CoursePicker";
import SemesterPicker from "../../Picker/SemesterPicker";
import BatchPicker from "../../Picker/BatchPicker";
import GroupPicker from "../../Picker/GroupPicker";
import StartDatePicker from "../../Picker/StartDatePicker";
import EndDatePicker from "../../Picker/EndDatePicker";
import { Box, Grid } from "@material-ui/core";

export default function GenerateReportHeadPicker(props) {
  return (
    <Box boxShadow={2} display={"flex"} data-test="GRHPWrapper">
      <Grid
        container
        justify="center"
        style={{ marginLeft: 20, marginRight: 20 }}
        data-test="GridContainer"
      >
        <Grid
          item
          container
          spacing={10}
          style={{ marginBottom: 2, marginTop: 8 }}
          justify="flex-start"
          alignItems="center"
          data-test="GridItemContainer"
        >
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} data-test="Grid">
            <CoursePicker />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} data-test="Grid">
            <BatchPicker />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} data-test="Grid">
            <SemesterPicker />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} data-test="Grid">
            <GroupPicker />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} data-test="Grid">
            <StartDatePicker {...props} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} data-test="Grid">
            <EndDatePicker {...props} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
