import React from 'react';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import {Menu, X} from "react-feather";
import {IconButton} from "@material-ui/core";
import CourseChoises from "../destop/courseChoises";

export default function CourseChoicesMobile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  
  return (
    <div>
      <Popper
        open={open}
        // placement="bottom"
        anchorEl={anchorEl} placement={placement} transition
        disablePortal={false}
        modifiers={{
          flip: {
            // enabled: true,
          },
          preventOverflow: {
            enabled: true,
            // boundariesElement: 'viewport',
          }
        }}
      >
        {({TransitionProps}) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className='bg-white shadow rounded px-2 relative w-full m-2' style={{maxWidth: 300}}>
              <IconButton
                style={{top: 0, right: 0, zIndex: 2}}
                onClick={handleClick('bottom-start')}
                className='absolute'>
                <X/>
              </IconButton>
              <CourseChoises/>
            </Paper>
          </Fade>
        )}
      </Popper>
      <div className='mb-3' style={{padding: '0 12px'}}>
        <Button
          className='shadow bg-white'
          onClick={handleClick('bottom-start')}>
          <Menu size={14}/>&nbsp;&nbsp;<span className='small'>My Choices</span>
        </Button>
      </div>
    </div>
  );
}
