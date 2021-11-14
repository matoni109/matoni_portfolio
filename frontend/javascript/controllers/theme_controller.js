import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["switch"];

  connect() {
    console.log("Hello, Theme Controller is ON!", this.element);
  }

  switch() {
    // const element = this.nameTarget;
    // const name = element.value;
    console.log(`${this.class} is the class`);
    this.class.classList.toggle("sl-theme-dark");
  }

  get class() {
    console.log(this.switchTarget);
    return this.switchTarget;
  }
}
