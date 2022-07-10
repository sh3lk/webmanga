import { styled, TextField, TextFieldProps } from "@mui/material";
import React from "react";

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "8px",
    border: "2px solid",
    borderColor: theme.palette.divider,
  },
  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.divider,
  },
}));

const LightTextField = (props: TextFieldProps) => {
  return <StyledTextField {...props} />;
};

export default LightTextField;
