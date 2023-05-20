import React from 'react'
import {FormControl, FormHelperText, Input, InputLabel} from "@material-ui/core";

export default function FormControlInput(props) {
  return (
    <FormControl
      {...props}
      min
      className={props.className}
      aria-valuemin={0}
      required
      fullWidth
      error={(!props.value && props.submitted)}
      disabled={props.disabled}>
      {props.label ? (
        <InputLabel shrink={props.shrink}>{props.label}</InputLabel>
      ) : null}
      <Input
        min={0}
        endAdornment={props.endAdornment}
        value={props.value}
        type={props.type}
        onChange={(e) => props.setValue(e.target.value)}
      />
      {(!props.value && props.submitted) || props.error ? (
        <FormHelperText
          className={props.error ? 'text-danger' : ''}>{props.error ? props.helperText : 'Error'}</FormHelperText>
      ) : null}
      {props.helper ? <FormHelperText>{props.helper}</FormHelperText> : null}
    </FormControl>
  );
}
