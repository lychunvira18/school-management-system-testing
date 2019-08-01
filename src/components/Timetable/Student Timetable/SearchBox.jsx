import React from "react";
import SemesterPicker from "../../Picker/SemesterPicker";
import WeekPicker from "../../Picker/WeekPicker";
import { Grid, Box } from "@material-ui/core";

const TimeTableSearchBox = ({value, onChange }) => {
    return (
      <Box boxShadow={2} display={"flex"}>
        <Grid
          container
          justify="center"
          style={{ marginLeft: 20, marginRight: 20 }}
        >
          <Grid
            item
            container
            spacing={10}
            style={{ marginBottom: 2, marginTop: 8 }}
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <SemesterPicker />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <WeekPicker name="week" value={value} onChange={onChange} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
};
export default TimeTableSearchBox;