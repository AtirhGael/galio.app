import React from "react";
import Agenda from "../../steps/details/reactAgenda";
import {GlobalContext} from "../../../../utilities/Global";

export default class Plannings extends React.Component {
  render() {
    return (
      <GlobalContext.Consumer>
        {context => (
          <div className="relative mx-auto py-4 px-0">
            <Agenda data={context.state.planningCoursesRequest}/>
          </div>
        )}
      </GlobalContext.Consumer>)
  }
}

// http://192.168.0.50:8073/api/teacher/v1/LESSONS?ApiKey=iuc3783XX19ezUNRD884296Pc&SchoolID=IUC&TeacherID=20P000825&TeacherEmail=ignacetchoumi@yahoo.com&LessonStatus=0&BeginDate=2021-03-22&EndDate=2021-03-28
