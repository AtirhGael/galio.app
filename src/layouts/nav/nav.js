import React, {useContext, useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";
import SideNav, {NavIcon, NavItem, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {Calendar, Clock, GitPullRequest, Home, Phone} from "react-feather";
import CookieH from "../../helpers/cookie.h";
import Icon from "@mdi/react";
import {mdiSchoolOutline} from "@mdi/js";
import Notif from "./notif";
import Header from "../header";
import {FormattedMessage} from "react-intl";
import ClickOutside from "./ClickOutside";
import {GlobalContext} from "../../utilities/Global";

export default function Nav(props) {
  
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);
  const {pathname} = useLocation();
  const context = useContext(GlobalContext)
  
  const [defaultSelected, setDefaultSelected] = React.useState(pathname.split('/')[1] || 'home');
  
  const getRouteSession = () => {
    if ((CookieH.getSession() && !CookieH?.getApplication()) || (CookieH.getSession()?.id !== CookieH?.getApplication()?.SESSION_APPLICATION_ID))
      return "courses/help"
    return "courses"
  }
  
  useEffect(() => {
    if (!pathname.includes('/email-confirmation'))
      if (!CookieH.getUser())
        context.navigate('/login?redirect=true')
    // eslint-disable-next-line
  }, [])
  
  return (
    <div className='w-full h-screen bg-gray-300 flex'>
      {!props.fullLayout &&
        <ClickOutside
          onClickOutside={() => {
            setExpanded(false);
          }}
        >
          <SideNav
            expanded={expanded}
            onToggle={(expanded) => {
              setExpanded(expanded);
            }}
            onSelect={(selected) => {
              const to = '/' + selected;
              if (selected === 'courses/help' && !CookieH.getUser()?.ACTIVED) {
                setOpen(true)
                setMessage('Unavailable. Make sure to close your self-registration process first')
                return false
              } else if (selected !== 'home' && !CookieH.getUser()?.ACCESS_COURSES) {
                setOpen(true)
                setMessage('You may proceed to identification office(s) to register your photo and fingerprint')
                return false
              }
              setDefaultSelected(selected)
              context.navigate(to);
            }}
          >
            <Notif open={open} message={message || "message"} close={() => setOpen(false)}/>
            <SideNav.Toggle/>
            <SideNav.Nav defaultSelected={defaultSelected}>
              <NavItem eventKey="profile">
                <NavIcon><Home style={{fontSize: '1.75em'}}/></NavIcon>
                <NavText><FormattedMessage id="profile"/></NavText>
              </NavItem>
              <NavItem
                eventKey={getRouteSession()}>
                <NavIcon><Icon path={mdiSchoolOutline} size={1}/></NavIcon>
                <NavText><FormattedMessage id="Courses session"/></NavText>
              </NavItem>
              <NavItem eventKey={"archives"}>
                <NavIcon><Clock/></NavIcon>
                <NavText><FormattedMessage id="Recent activities"/></NavText>
              </NavItem>
              <NavItem eventKey="planning">
                <NavIcon><Calendar style={{fontSize: '1.75em'}}/></NavIcon>
                <NavText><FormattedMessage id="Schedule"/></NavText>
              </NavItem>
              <NavItem eventKey="requests">
                <NavIcon><GitPullRequest/></NavIcon>
                <NavText><FormattedMessage id="Requests"/></NavText>
              </NavItem>
              <NavItem eventKey="contact-us">
                <NavIcon><Phone style={{fontSize: '1.75em'}}/></NavIcon>
                <NavText><FormattedMessage id="Contact Us"/></NavText>
              </NavItem>
              {/*<NavItem eventKey="settings">*/}
              {/*  <NavIcon><Settings/></NavIcon>*/}
              {/*  <NavText><FormattedMessage id="Settings"/></NavText>*/}
              {/*</NavItem>*/}
            </SideNav.Nav>
          </SideNav>
        </ClickOutside>}
      <div className={"h-screen main-box " + (props.fullLayout ? 'full-width' : '')}
           style={{overflowY: 'auto', zIndex: 1}}>
        <div className='w-full h-screen table'>
          <Header/>
          <div className='py-16 z-0 overflow-auto' style={{height: 'calc(100vh - 62px)'}}>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}
