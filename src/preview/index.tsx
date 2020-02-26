import React from "react";
import addons, { DecoratorFunction } from "@storybook/addons";
import WithLingui, { WithLinguiConfig } from "./WithLingui";
import { EVENT_SET_CONFIG_ID } from "../shared";

let _config: WithLinguiConfig | null = null;

export const setLinguiConfig = (config: WithLinguiConfig) => {
  const { locales, defaultLocale } = config;
  _config = config;
  const channel = addons.getChannel();
  channel.emit(EVENT_SET_CONFIG_ID, {
    locales,
    defaultLocale
  });
};

export const withLingui: DecoratorFunction<any> = story => {
  const channel = addons.getChannel();

  if (!_config) {
    throw new Error("setLinguiConfig() must be called when using withLingui()");
  }

  return (
    <WithLingui
      linguiConfig={_config}
      locales={_config.locales}
      channel={channel}
    >
      {story()}
    </WithLingui>
  );
};
