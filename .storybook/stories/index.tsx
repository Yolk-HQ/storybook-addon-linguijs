import React from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { Button } from "@storybook/react/demo";
import { Trans } from "@lingui/macro";

export default { title: "Button", decorators: [withKnobs] };

export const withText = () => (
  <Button>
    {boolean("hi", false)}
    <Trans>Hello Button</Trans>
  </Button>
);
