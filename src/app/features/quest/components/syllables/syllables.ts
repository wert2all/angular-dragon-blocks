import { Component, input } from "@angular/core";
import { ViewSyllable } from "../../store/quest.types";

@Component({
  selector: "app-quest-syllables",
  templateUrl: "./syllables.html",
})
export class QuestSyllablesComponent {
  syllables = input.required<ViewSyllable[]>();
}
