import { Component } from '@angular/core';

@Component({
    selector: 'up',
    template: `
        <button md-fab class="up" (click)="onUpClick()" >
            <md-icon>keyboard_arrow_up</md-icon>
        </button>
    `,
    styles: [`
        .up { 
            position: fixed;
            right: 2%;
            bottom: 4%;
            transition: all 2s;
        }
    `]
})
export class UpComponent {
    onUpClick() {
        window.scroll(undefined, 1);
    }
}