import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.css',
})
export class ModalWindowComponent {
  readonly closeWindow = output<void>();
}
