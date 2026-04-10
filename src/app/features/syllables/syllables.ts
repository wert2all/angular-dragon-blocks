import { Component, input } from "@angular/core";
import { Syllable } from "./syllable/syllable";

@Component({
  selector: "app-syllables",
  templateUrl: "./syllables.html",
  imports: [Syllable]
})
export class Syllabes {
  word = input.required<string>();
}
