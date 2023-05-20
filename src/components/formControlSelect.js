import React from 'react'
import {FormControl, FormHelperText, MenuItem, Select} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";

export default function FormControlSelect(props) {
    return (
        <FormControl required fullWidth error={(!props.value) && props.submitted} disabled={props.disabled}>
            {props.label ? <InputLabel shrink={props.shrink}>{props.label}</InputLabel> : null}
            <Select value={props.value} onChange={e => props.setValue(e.target.value)}>
                {props.array?.map(elt => <MenuItem value={elt.key}>{elt.value}</MenuItem>)}
            </Select>
            {(!props.value) && props.submitted ? <FormHelperText>Error</FormHelperText> : null}
        </FormControl>
    )
}
