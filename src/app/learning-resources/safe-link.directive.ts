import { Directive, ElementRef, inject, input } from '@angular/core';
import { LogDirective } from '../log.directive';

@Directive({
  selector: '[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
  hostDirectives: [LogDirective],
})
export class SafeLinkDirective {
  queryParam = input('myapp', { alias: 'appSafeLink' });
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
  constructor() {
    console.log('SafeLInkDirective is active!');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm(
      'Are you sure you wish to leave the app?'
    );
    if (wantsToLeave) {
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href =
        address + '?from=' + this.queryParam();
      return;
    } else {
      event.preventDefault();
    }
  }
}
