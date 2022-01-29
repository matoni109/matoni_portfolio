import "index.css";
import "@shoelace-style/shoelace/dist/themes/light.css";
import "@shoelace-style/shoelace/dist/themes/dark.css";
import "@shoelace-style/shoelace/dist/components/image-comparer/image-comparer.js";
import "@shoelace-style/shoelace/dist/components/responsive-media/responsive-media.js";
import "@shoelace-style/shoelace/dist/components/avatar/avatar.js";
// import "@shoelace-style/shoelace/dist/components/alert/alert.js";
// import "@shoelace-style/shoelace/dist/components/checkbox/checkbox.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/format-date/format-date.js";
import "@shoelace-style/shoelace/dist/components/divider/divider.js";
// import "@shoelace-style/shoelace/dist/components/input/input.js";
// import "@shoelace-style/shoelace/dist/components/rating/rating.js";
// import "@shoelace-style/shoelace/dist/components/animation/animation.js";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";

import { Application } from "@hotwired/stimulus";
import * as Turbo from "@hotwired/turbo";
// Import all javascript files from src/_components
import components from "bridgetownComponents/**/*.{js,jsx,js.rb,css}";

// Set the base path to the folder you copied Shoelace's assets to
setBasePath("/shoelace");

window.Stimulus = Application.start();

import controllers from "./controllers/**/*.{js,js.rb}";
Object.entries(controllers).forEach(([filename, controller]) => {
  if (filename.includes("_controller.")) {
    const identifier = filename
      .replace("./controllers/", "")
      .replace(/_controller..*$/, "")
      .replace("/", "--");

    Stimulus.register(identifier, controller.default);
  }
});

console.info("Bridgetown is loaded!");
