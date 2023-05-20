import React, {useContext} from "react";
import CookieH from "../helpers/cookie.h";
import {Menu, MenuItem} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import {IntlContext} from "../utilities/Internationalization"
import {FormattedMessage} from "react-intl";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import ReactCountryFlag from 'react-country-flag'
import {GlobalContext} from "../utilities/Global";
import OAuth2 from "../views/profile/oAuth2";
import Features from "./features";
import CookieC from "../constants/cookie.c";
import CookiesC from "../constants/cookie.c";

const Header = () => {
  const userinfo = CookieH.getUser()
  const context = useContext(GlobalContext)
  const logout = async (context) => {
    let res = CookieH.clearUserData()
    context.setState({MATRICULE: null})
    if (res)
      context.navigate('/login')
  }
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [langDropdown, setLangDropdown] = React.useState(false);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  
  return (
    <div className="header-center-bloc border-bottom shadow-lg bg-white md:flex items-center w-full z-50">
      {!context.state.features ? ((CookieC.VERSION !== CookieH.getVersion() || context.state.openFeature) &&
        <Features/>) : null}
      <div className='text-center flex-1 flex py-2 px-3 py-md-0 '>
        <OAuth2/>
      </div>
      <div className="flex justify-end items-center py-2 px-4">
        <IntlContext.Consumer>
          {context => {
            let langArr = {
              "en": <FormattedMessage id="English"/>,
              "fr": <FormattedMessage id="French"/>,
            }
            return (
              <Dropdown
                className="dropdown-language nav-item"
                isOpen={langDropdown}
                toggle={() => setLangDropdown(!langDropdown)}
                data-tour="language"
              >
                <DropdownToggle
                  tag="a"
                  className="nav-link"
                >
                  <ReactCountryFlag
                    className="country-flag mr-1"
                    countryCode={
                      context.state.locale === "en"
                        ? "us"
                        : context.state.locale
                    }
                    svg
                  />
                  <span
                    className="sm-inline-block text-uppercase hidden align-middle ml-50">{langArr[context.state.locale]}</span>
                </DropdownToggle>
                <DropdownMenu right className='shadow'>
                  <DropdownItem
                    tag="a"
                    onClick={e => context.switchLanguage("en")}
                  >
                    <ReactCountryFlag className="country-flag" countryCode="us" svg/>
                    <span className="ml-1"><FormattedMessage id="English"/></span>
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    onClick={e => context.switchLanguage("fr")}
                  >
                    <ReactCountryFlag className="country-flag" countryCode="fr" svg/>
                    <span className="ml-1"><FormattedMessage id="French"/></span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )
          }}
        </IntlContext.Consumer>
        <h6 className="text-uppercase font-weight-light mr-2 mb-0 text-md-left text-right">
          {userinfo?.LASTNAME} {userinfo?.FIRSTNAME}
        </h6>
        <div className="img-box" onClick={handleClick}>
          <img className="img-profile"
               src={`${CookiesC.MEDIA}/${userinfo?.MATRICULE}`}
               alt="#"/>
        </div>
        <GlobalContext.Consumer>
          {context => {
            return (<Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/*<MenuItem><Settings size={16}/>&nbsp;&nbsp;<FormattedMessage id='Settings'/></MenuItem>*/}
              {/*<Divider/>*/}
              <MenuItem onClick={() => logout(context)}><FormattedMessage id='log-out'/></MenuItem>
            </Menu>)
          }}
        </GlobalContext.Consumer>
      </div>
    </div>
  )
}
export default Header;
