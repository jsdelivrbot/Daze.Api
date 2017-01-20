import { Component } from '@angular/core';

@Component({
    selector: 'up',
    template: `
        <button (click)="onUpClick()" md-button>
            <i class="material-icons">keyboard_arrow_up</i>
        </button>
    `
})
export class UpComponent {
    onUpClick() {
        window.scroll(undefined, 1);
    }
}