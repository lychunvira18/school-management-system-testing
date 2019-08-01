import React, { useMemo } from "react";
import CoursePicker from "../../Picker/CoursePicker";
import BatchPicker from "../../Picker/BatchPicker";
import GroupPicker from "../../Picker/GroupPicker";
import SemesterPicker from "../../Picker/SemesterPicker";
import WeekPicker from "../../Picker/WeekPicker";
import { Grid, Box } from "@material-ui/core";

const TimeTableSearchBox = ({ value, setWeekNumber }) => {
  const memoValue = useMemo(() => {
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
              <CoursePicker />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <BatchPicker />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <SemesterPicker />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <GroupPicker />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <WeekPicker name="week" value={value} onChange={setWeekNumber} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }, [value, setWeekNumber]);
  return memoValue;
};
export default TimeTableSearchBox;