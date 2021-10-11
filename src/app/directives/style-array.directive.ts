import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appStyleArray]'
})
export class StyleArrayDirective {

  constructor(private el: ElementRef) { }

  private parse(): void {

  }

}
