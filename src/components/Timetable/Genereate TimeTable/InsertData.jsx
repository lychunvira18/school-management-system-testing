import React, {memo} from "react";
import AutoComplete from '../../Picker/AutoComplete'

const InsertData = ({onChange, row, col, facultyData, header, selectedFaculty, weekStr}) => {

  let {course, batch, semester, group} = header
  let temp = null
  if(selectedFaculty){
    try{
      weekStr = weekStr.slice(0,4)
      temp = selectedFaculty[weekStr][course][batch][semester][group][col][row]
    }catch(err){}
  }


  const handleChange = value => {
    onChange(row+col+course+batch+group)(row,col,value,header)
  }
  return <AutoComplete
          onChange ={handleChange}
          suggestions = {facultyData}
          header={header}
          selectedFaculty={selectedFaculty}
          col ={col}
          row={row}
          value={temp}
          weekStr={weekStr}
          // disabled={disabled}
        />
}
const areEqual = (prevProps, nextProps) =>{

  if(nextProps.weekStr !== prevProps.weekStr){
    return false
  }

  let prevHeader = prevProps.header
  let nextHeader = nextProps.header

  if(prevHeader.batch !== nextHeader.batch) return false
  if(prevHeader.course !== nextHeader.course) return false
  if(prevHeader.semester !== nextHeader.semester) return false
  if(prevHeader.group !== nextHeader.group) return false

  let {row, col, weekStr} = nextProps
  let selectedFaculty = nextProps.selectedFaculty
  if(selectedFaculty){
    for(let course in selectedFaculty[weekStr]){
      for(let batch in selectedFaculty[weekStr][course]){
        for(let semester in selectedFaculty[weekStr][course][batch]){
          for(let group in selectedFaculty[weekStr][course][batch][semester]){
            if(col in selectedFaculty[weekStr][course][batch][semester][group]){
              if(row in selectedFaculty[weekStr][course][batch][semester][group][col]){
                return false
              }
            }
          }
        }
      }
    }
  }
  return true
}
export default memo(InsertData, areEqual)
