import { Component } from '@angular/core';

@Component({
    selector: 'up',
    template: `
        <button (click)="onUpClick()" >up</button>
    `
})
export class UpComponent {
    onUpClick() {
        window.scroll(undefined, 1);
    }
}