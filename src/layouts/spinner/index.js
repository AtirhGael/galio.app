import React from 'react';
import './main.scss'


// export default function Index(props){
//     return(
//         <div className='absolute loader h-full w-full bg-white flex justify-center items-center'>
//             <div className='loader-item'/>
//         </div>
//     )
// }
export default function Index(props) {
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <div className="loader">
        <div className="square"/>
        <div className="square"/>
        <div className="square last"/>
        <div className="square clear"/>
        <div className="square"/>
        <div className="square last"/>
        <div className="square clear"/>
        <div className="square "/>
        <div className="square last"/>
      </div>
    </div>
  )
}
