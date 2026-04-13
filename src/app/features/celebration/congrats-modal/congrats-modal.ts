import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ModalWindowComponent } from '../../../layout/modal-window/modal-window.component';
import { SaluteAnimationComponent } from '../salute-animation/salute-animation';

@Component({
  selector: 'app-congrats-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ModalWindowComponent, SaluteAnimationComponent],
  templateUrl: './congrats-modal.html',
})
export class CongratsModalComponent {
  readonly isOpen = input.required<boolean>();
  readonly closeModal = output<void>();
  readonly continue = output<void>();

  protected onClose(): void {
    this.closeModal.emit();
  }

  protected onContinue(): void {
    this.continue.emit();
  }

  protected onAnimationComplete(): void {
    // Animation completed, could trigger additional effects here if needed
  }
}
