import { Directive, ElementRef, Input, OnChanges, OnDestroy, Renderer2 } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { DomController } from '@ionic/angular';

import { TabBarHideShow } from '../../core/services/tab-bar-hide-show';
import { ScrollHideConfig } from '../../core/models/interfaces';
import { appConstants } from '../../core/constants';

@Directive({
    selector: '[appScrollHide]'
})
export class ScrollHideDirective implements OnChanges, OnDestroy {
    @Input('appScrollHide') scrollContent: any;

    private config: ScrollHideConfig = appConstants.scrollConfigs;

    constructor(
        public tabBarService: TabBarHideShow,
        private domCtrl: DomController,
        private element: ElementRef,
        private renderer: Renderer2,
        private keyboard: Keyboard
    ) {}

    ngOnChanges() {
        if (this.scrollContent && this.config) {
            this.scrollContent.ionScroll.subscribe(ev => {
                if (ev) {
                    if (ev.detail.deltaY === 0) {
                        return;
                    }

                    if (ev.detail.scrollTop <= 0) {
                        this.renderer.setStyle(this.element.nativeElement, 'visibility', `visible`);
                        this.tabBarService.isVisibleTabBar$.next(true);
                        return;
                    }

                    if (ev.detail.deltaY < 0) {
                        this.renderer.setStyle(this.element.nativeElement, 'visibility', `visible`);
                        this.tabBarService.isVisibleTabBar$.next(false);
                    } else if (ev.detail.scrollTop >= ev.currentTarget.offsetTop && !this.keyboard.isVisible) {
                        this.renderer.setStyle(this.element.nativeElement, 'visibility', `hidden`);
                        this.tabBarService.isVisibleTabBar$.next(true);
                    }
                }
            });
        }
    }

    ngOnDestroy() {
        this.tabBarService.isVisibleTabBar$.next(true);
    }
}
