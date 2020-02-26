import React, { useEffect, useState } from "react";

import { Catalogs } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import Channel from "@storybook/channels";

import { EVENT_GET_LOCALE_ID, EVENT_SET_LOCALE_ID } from "../shared";

export interface WithLinguiConfig {
  locales: string[];
  catalogs: Catalogs;
  defaultLocale: string;
}

interface WithLinguiProps {
  linguiConfig: WithLinguiConfig;
  locales: string[];
  channel: Channel;
}

const WithLingui: React.FC<WithLinguiProps> = props => {
  const [locale, setLocale] = useState(props.linguiConfig.defaultLocale);
  const handleLocale = (locale: string) => setLocale(locale);

  useEffect(() => {
    const { channel } = props;
    channel.on(EVENT_SET_LOCALE_ID, handleLocale);
    channel.emit(EVENT_GET_LOCALE_ID);
    return () => {
      props.channel.removeListener(EVENT_SET_LOCALE_ID, handleLocale);
    };
  }, []);

  if (!locale) {
    return null;
  }

  const { children, linguiConfig } = props;

  return (
    <I18nProvider
      {...linguiConfig}
      language={locale}
      catalogs={linguiConfig.catalogs}
    >
      {children}
    </I18nProvider>
  );
};

export default WithLingui;
