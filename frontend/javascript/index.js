import "index.css";
import "@shoelace-style/shoelace/dist/themes/light.css";
import "@shoelace-style/shoelace/dist/themes/dark.css";
import "@shoelace-style/shoelace/dist/components/image-comparer/image-comparer.js";
import "@shoelace-style/shoelace/dist/components/responsive-media/responsive-media.js";
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
import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";
import Turbo from "@hotwired/turbo";

// Set the base path to the folder you copied Shoelace's assets to
setBasePath("/shoelace/");

// Import all javascript files from src/_components
const componentsContext = require.context("bridgetownComponents", true, /.js$/);
componentsContext.keys().forEach(componentsContext);

console.info("Bridgetown is loaded!");
const application = Application.start();
const context = require.context("./controllers", true, /.js$/);
application.load(definitionsFromContext(context));
