import { Channel } from "@storybook/channels";
import React, { useState, useEffect, CSSProperties } from "react";
import {
  EVENT_SET_CONFIG_ID,
  EVENT_GET_LOCALE_ID,
  EVENT_SET_LOCALE_ID
} from "../shared";

import LocaleButton from "./LocaleButton";

interface Config {
  locales: string[];
  defaultLocale: string;
}

interface LocalePanelProps {
  active?: boolean;
  channel: Channel;
}

const LocalePanel: React.FC<LocalePanelProps> = props => {
  const [locales, setLocales] = useState<string[]>([]);
  const [activeLocale, setActiveLocale] = useState<string | null>(null);

  const setConfig = (config: Config) => {
    const { locales, defaultLocale } = config;
    // If active locale is not in the list of available locales use default locale as new active
    if (!activeLocale || !locales.includes(activeLocale)) {
      setActiveLocale(defaultLocale);
    } else {
      setActiveLocale(activeLocale);
    }
    setLocales(locales);
  };

  const getLocale = () => {
    props.channel.emit(EVENT_SET_LOCALE_ID, activeLocale);
  };

  const handleClickLocaleButton = (locale: string) => {
    setActiveLocale(locale);
    props.channel.emit(EVENT_SET_LOCALE_ID, locale);
  };

  useEffect(() => {
    props.channel.on(EVENT_SET_CONFIG_ID, setConfig);
    props.channel.on(EVENT_GET_LOCALE_ID, getLocale);

    return () => {
      props.channel.removeListener(EVENT_SET_CONFIG_ID, setConfig);
      props.channel.removeListener(EVENT_GET_LOCALE_ID, getLocale);
    };
  }, []);

  const items = locales.map(locale => {
    return (
      <LocaleButton
        key={locale}
        locale={locale}
        active={locale === activeLocale}
        onClick={handleClickLocaleButton}
      />
    );
  });

  return <div>{items}</div>;
};

export default LocalePanel;
