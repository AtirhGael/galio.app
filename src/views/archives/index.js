import React from 'react';
import {Tab, Tabs, withStyles} from "@material-ui/core";
import RecentRequests from "./requests/recentRequests";
import RecentApplications from "./sessionCourses/recentApplications";
import {FormattedMessage} from "react-intl";
import RecentAffectations from "./sessionCourses/recentAffectations";

function TabPanel(props) {
  const {children, value, index, ...other} = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);
const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} label={<FormattedMessage id={props.label}/>}/>);

export default class Recents extends React.Component {
  
  state = {
    value: 0
  }
  
  render() {
    
    function a11yProps(index) {
      return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
      };
    }
    
    return (
      <div className='max-w-screen-2xl mx-auto px-md-5 px-3 relative'>
        <h1 className='text-opacity-50  text-xl text-black mb-12'><FormattedMessage id="Your activities history"/></h1>
        <div className='mb-3 col-6 pl-0'>
          <FormattedMessage id="Here you can see the list"/>
        </div>
        
        <div>
          <div>
            <AntTabs
              value={this.state.value}
              onChange={(event, value) => {
                this.setState({value});
              }}
              aria-label="simple tabs example">
              <AntTab label="Your requests" {...a11yProps(0)} />
              <AntTab label="Your choice sessions" {...a11yProps(1)} />
              <AntTab label="Your archives affectations" {...a11yProps(2)} />
            </AntTabs>
          </div>
          <TabPanel value={this.state.value} index={0}>
            <RecentRequests/>
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            <RecentApplications/>
          </TabPanel>
          <TabPanel value={this.state.value} index={2}>
            <RecentAffectations/>
          </TabPanel>
        </div>
      </div>
    );
  }
}
