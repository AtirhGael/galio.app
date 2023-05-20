import React, {useContext} from "react";
import {Award, DollarSign, FileText} from "react-feather";
import {GlobalContext} from "../../../utilities/Global";
import {FormattedMessage} from "react-intl";
import {IntlContext} from "../../../utilities/Internationalization";

export default function Categories({handleNext}) {
  
  const getIcon = elt => {
    return [{col: "enseignement", icon: <Award size="32"/>}, {
      col: "paiement",
      icon: <DollarSign size="32"/>
    }, {col: "contrat", icon: <FileText size="32"/>}].find(ic => ic.col === elt.toLowerCase())?.icon
  }
  
  const context = useContext(GlobalContext)
  const intlContext = useContext(IntlContext)
  
  
  return (<div className="container pb-3 px-5 pt-0 requests-box flex justify-center items-center flex-col">
    <h2 className="font-light text-xl mb-8 mt-8">
      <FormattedMessage id="Please choose the request category"/>
    </h2>
    <div
      className="grid lg:grid-cols-5 grid-cols-1 max-w-6xl mx-auto gap-8 items-center justify-center mt-5 w-full">
      {context.state.categories.map((e, i) => (<button
        disabled={['04'].includes(e.ID_CAT)}
        key={i}
        onClick={() => context.setState({categorie: e.CATEGORIE}, handleNext)}
        className={`w-full mt-0 rounded-lg md:mt-0 shadow-xl py-8 px-2 hover:bg-blue-300 border border-gray-100 relative bg-white status-item flex flex-col justify-center items-center ${context.state.categorie === e.CATEGORIE ? 'bg-blue-500 text-white' : ''}`}>
        {getIcon(e.CATEGORIE)}
        <h6 className="mt-2 font-semibold mt-3 px-3">{intlContext.state.locale === 'en' ? e.CATEGORIE_EN : e.CATEGORIE}</h6>
        <div className="text-center px-1 text-xs flex-1 mt-1">
          {intlContext.state.locale === 'en' ? e.CAT_DESCRIPTION_EN : e.CAT_DESCRIPTION}
        </div>
      </button>))}
    </div>
  </div>);
}
