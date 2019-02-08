import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { appConstants } from '../../core/constants';

@Directive({
    selector: '[preventMultiTap]'
})
export class BlockMultiTappingDirective {
    constructor(private renderer: Renderer2, private elRef: ElementRef) {}

    @HostListener('click')
    onMouseEnter() {
        this.renderer.addClass(this.elRef.nativeElement, 'none-event');

        setTimeout(() => {
            this.renderer.removeClass(this.elRef.nativeElement, 'none-event');
        }, appConstants.multiTapBlocking);
    }
}
