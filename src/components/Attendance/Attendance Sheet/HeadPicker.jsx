import React from "react";
import DatePicker from "../../Picker/DatePicker";
import SessionPicker from "../../Picker/SessionPicker";
import CoursePicker from "../../Picker/CoursePicker";
import SemesterPicker from "../../Picker/SemesterPicker";
import BatchPicker from "../../Picker/BatchPicker";
import GroupPicker from "../../Picker/GroupPicker";
import SubjectPicker from "../../Picker/SubjectPicker";
import FacultyPicker from "../../Picker/FacultyPicker";
import { Grid, Box, CircularProgress } from "@material-ui/core";

export default function HeadPicker({ sessionNumber, userTT }) {
  return (
    <Box boxShadow={2} display={"flex"}>
      <Grid
        container
        justify="center"
        style={{ marginLeft: 20, marginRight: 20 }}
      >
        {userTT.length !== 0 ? (
          <Grid
            item
            container
            spacing={10}
            style={{ marginBottom: 2, marginTop: 8}}
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <DatePicker />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <FacultyPicker userTT={userTT} />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <CoursePicker userTT={userTT} />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <BatchPicker userTT={userTT} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <SessionPicker
                sessionNumber={sessionNumber}
                userTT={userTT}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <SubjectPicker userTT={userTT} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <SemesterPicker userTT={userTT} disable />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <GroupPicker userTT={userTT} />
            </Grid>
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Box>
  );
}
