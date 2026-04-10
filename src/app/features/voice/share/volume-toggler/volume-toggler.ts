import { Component, input, output } from "@angular/core";
import { NgIcon } from "@ng-icons/core";

@Component({
  selector: "app-volume-toggler",
  templateUrl: "./volume-toggler.html",
  imports: [NgIcon],
})
export class VolumeToggler {
  isVolumeOn = input.required<boolean>();
  toggle = output();

  protected toggleVolume() {
    this.toggle.emit();
  }
}
