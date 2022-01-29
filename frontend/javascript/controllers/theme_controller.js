import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["switch", "iconName"];

  connect() {
    console.log("Hello, Theme Controller is ON!", this.element);
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    if (prefersDarkScheme.matches) {
      this.class.classList.add("sl-theme-dark");
    } else {
      this.class.classList.remove("sl-theme-dark");
    }

    const currentTheme = localStorage.getItem("theme");
    if (currentTheme == "dark") {
      let theme = "dark";
      this.class.classList.toggle("sl-theme-dark");
      this.iconName.setAttribute("name", "moon");
      // localStorage.setItem("theme", theme);
      // console.log(localStorage.getItem("theme"));
    }
  }

  switch() {
    const currentTheme = localStorage.getItem("theme");
    // console.log(currentTheme);
    if (currentTheme == "dark") {
      let theme = "light";
      this.class.classList.toggle("sl-theme-dark");
      this.iconName.setAttribute("name", "brightness-high");
      localStorage.setItem("theme", theme);
      // console.log(localStorage.getItem("theme")) ;
    } else {
      let theme = "dark";
      this.class.classList.toggle("sl-theme-dark");
      this.iconName.setAttribute("name", "moon");
      localStorage.setItem("theme", theme);
    }
  }

  get class() {
    // console.log(this.switchTarget);
    return this.switchTarget;
  }

  get iconName() {
    // console.log(this.switchTarget);
    return this.iconNameTarget;
  }
}
