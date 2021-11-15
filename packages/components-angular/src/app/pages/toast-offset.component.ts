import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastManager } from '@porsche-design-system/components-angular';

@Component({
  selector: 'toast-offset',
  styles: [
    `
      p-toast {
        --p-toast-position: static;
        --p-toast-skip-timeout: true;
        display: block;
        margin-left: -0.5rem;
        margin-right: 0.5rem;
      }
    `,
  ],
  template: `
    <div class="playground light" title="should render toast neutral on light background with offset {bottom: 0}">
      <p-toast [offset]="{ bottom: 0 }"></p-toast>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastOffsetComponent implements OnInit {
  constructor(private toastManager: ToastManager) {}

  ngOnInit() {
    this.toastManager.addMessage({ message: 'Some message' });
  }
}
