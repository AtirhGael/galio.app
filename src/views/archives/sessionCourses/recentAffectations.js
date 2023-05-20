import React from 'react';
import {Grid} from "@material-ui/core";
import ChoicesList from "./choicesList";
import {GlobalContext} from "../../../utilities/Global";

const RecentAffectations = () => (
    <GlobalContext.Consumer>
        {context => {
            return (
                <div className='relative py-5'>
                    <Grid container spacing={3}>
                        {context.state.applications?.map(elt => {
                            return {
                                ...elt,
                                ApplicationChoices: elt.ApplicationChoices.filter(aff => aff.AFFECTATION === 1)
                            }
                        }).map((item, index) => (<ChoicesList key={index} item={item}/>))}
                    </Grid>
                </div>
            )
        }}
    </GlobalContext.Consumer>
);
export default RecentAffectations
