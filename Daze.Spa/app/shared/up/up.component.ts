import { Component } from '@angular/core';

@Component({
    selector: 'up',
    template: `
        <button class="up" (click)="onUpClick()" >
            <i>keyboard_arrow_up</i>
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