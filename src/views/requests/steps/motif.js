import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {GlobalContext} from "../../../utilities/Global";
import {FormattedMessage} from "react-intl";
import {IntlContext} from "../../../utilities/Internationalization";

export default class Motif extends React.Component {
  render() {
    return (
      <IntlContext.Consumer>
        {intlContext => (
          <GlobalContext.Consumer>
            {context => {
              return (
                <div className="text-left container px-5">
                  <h5 className="mt-3 mb-3 flex items-center">
                    <span className="mr-2"><FormattedMessage id="Category"/></span>
                    <span className="mr-2">{context.state.categorie}</span>
                  </h5>
                  <div>
                    <FormControl component="fieldset" className="mt-3 col-12">
                      <FormLabel component="legend"><FormattedMessage id="Sub categories"/></FormLabel>
                      <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        value={context.state.REQUEST_CATEGORY_ID}
                        style={{display: 'grid', gridTemplateColumns:'1fr 1fr'}}
                        className="col-12 px-0"
                        onChange={(event) => {
                          context.setState({
                            REQUEST_CATEGORY_ID: event.target.value,
                            RESQUEST_DISPCONFIG: context.state.categories.find((e) => e.CATEGORIE === context.state.categorie)?.sousCategories.find(elt => elt.ID_SCAT === event.target.value)?.REQUEST_DISPCONFIG
                          });
                        }}>
                        {context.state.categories
                          .find((e) => e.CATEGORIE === context.state.categorie)
                          ?.sousCategories.map((e, i) => (
                            <div className='p-2 h-full flex-grow-1 block' style={{boxSizing: 'border-box'}}>
                              <div className="mt-2 p-3 rounded text-left shadow bg-white h-full" key={i}>
                                <FormControlLabel
                                  value={e.ID_SCAT}
                                  control={<Radio/>}
                                  label={<span
                                    style={{fontSize: '12px'}}>{intlContext.state.locale === 'en' ? e.S_CATEGORIE_EN : e.S_CATEGORIE}</span>}
                                />
                                <div
                                  className='small border-top pt-3'>{intlContext.state.locale === 'en' ? e.SCAT_DESCRIPTION_EN : e.SCAT_DESCRIPTION}</div>
                              </div>
                            </div>
                          ))}
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              )
            }}
          </GlobalContext.Consumer>
        )}
      </IntlContext.Consumer>
    );
  }
}
