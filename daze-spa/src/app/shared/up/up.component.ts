import { Component } from '@angular/core';

@Component({
    selector: 'up',
    template: `
        <a class="up" (click)="onUpClick()" >
            <i class="material-icons">keyboard_arrow_up</i>
        </a>
    `,
    styles: [`
        .up {
            cursor: pointer;
            position: fixed;
            padding: 0.4em 1.4em;
            right: 2%;
            background: white;
            color: #22384e;
            border-radius: 1.4em;
            bottom: 2%;
            transition: all 2s;
            box-shadow: 0 2px 2px rgba(0,0,0,0.24), 0 0 2px rgba(0,0,0,0.12);
            transition: cubic-bezier(0.075, 0.82, 0.165, 1);
            transition-duration: 1200ms;
            transition-delay: 2ms;
        }
        .up:hover {
            background: #22384e;
            color: white;
        }
    `]
})
export class UpComponent {
    onUpClick() {
        window.scroll(undefined, 1);
    }
}