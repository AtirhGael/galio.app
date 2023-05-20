import React from 'react';
import {Grid} from "@material-ui/core";
import ChoicesList from "./choicesList";
import {GlobalContext} from "../../../utilities/Global";

const RecentApplications = () => (
    <div>
        <GlobalContext.Consumer>
            {context => {
                return (
                    <div className='relative py-5'>
                        <Grid container spacing={3}>
                            {context.state.applications?.map((item, index) => {
                                return <ChoicesList key={index} item={item}/>
                            })}
                        </Grid>
                    </div>
                )
            }}
        </GlobalContext.Consumer>
    </div>
);
export default RecentApplications
