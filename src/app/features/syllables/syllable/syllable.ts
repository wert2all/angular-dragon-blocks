import { Component, input } from "@angular/core";

@Component({
  selector: 'app-syllable',
  templateUrl: './syllable.html',
  styleUrl: './syllable.css'
})
export class Syllable {
  value = input.required<string>()
}
