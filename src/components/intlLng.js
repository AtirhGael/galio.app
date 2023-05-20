import React from "react";
import {IntlContext} from "../utilities/Internationalization";
import {FormattedMessage} from "react-intl";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import ReactCountryFlag from "react-country-flag";

export function IntlLng() {
  const [langDropdown, setLangDropdown] = React.useState(false);

  return (
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
  )
}