import { configure, addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withLingui, setLinguiConfig } from "../dist";

function loadStories() {
  require("./stories/index.tsx");
}

setLinguiConfig({
  locales: ["en", "fr"],
  defaultLocale: "en",
  catalogs: {
    fr: {
      messages: { "Hello Button": "Bonjour Bouton" }
    }
  }
});

// Register decorator
addDecorator(withLingui);
addDecorator(withKnobs);

configure(loadStories, module);
