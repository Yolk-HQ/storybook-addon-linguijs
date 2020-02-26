import React from "react";
import { addons, types } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, PANEL_ID, PARAM_KEY } from "../shared";
import LocalePanel from "./LocalePanel";

export function register() {
  addons.register(ADDON_ID, api => {
    addons.add(PANEL_ID, {
      type: types.PANEL,
      title: "LinguiJS",
      render: ({ active, key }) => (
        <AddonPanel active={active} key={key}>
          <LocalePanel channel={addons.getChannel()} />
        </AddonPanel>
      ),
      paramKey: PARAM_KEY
    });
  });
}
