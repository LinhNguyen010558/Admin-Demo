import React from 'react';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl'; 
import { ThemeProvider } from 'styled-components';
import themes from './setting/themes/index';
import AppLocale from './languageProvider/index';
export default function AppProvider({ children }) { 
 
  
  const defaultLanguage = 'en'
  const currentAppLocale = AppLocale[defaultLanguage];
  return (
    <ConfigProvider locale={currentAppLocale.antd}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <ThemeProvider theme={themes.themedefault}>{children}</ThemeProvider>
      </IntlProvider>
    </ConfigProvider>
  );
}
