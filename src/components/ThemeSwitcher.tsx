import { createMuiTheme } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import React from "react";

export const theme2 = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#faeaff',
    },
    secondary: {
      main: '#68b0be',
    },
  },
});

export const theme1 = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#373746',
    },
    secondary: {
      main: '#0f2024',
    },
  },
})

export enum AppTheme {
  theme1,
  theme2
}

const ThemeSwitcher: React.FC<{ setTheme: (theme: AppTheme) => void, currentTheme: AppTheme }> = ({ setTheme, currentTheme }) => {

  return (
    <FormControlLabel
      control={
        <Switch
          checked={currentTheme === AppTheme.theme1}
          onChange={(e) => setTheme(e.target.checked ? AppTheme.theme1 : AppTheme.theme2)}
          color="secondary"
        />
      }
      label="Change theme"
    />
  )
}

export default ThemeSwitcher