import { Component } from '@angular/core';

@Component({
    selector: 'spinner',
    template: `
        <div class="centerit">
            <div >loading... spinner</div>
        </div>
    `,
    styles: [`
        .centerit {
            display: flex;
            justify-content: center;
            margin: 10em 0 0 0;
        }
    `]
})
export class SpinnerComponent { }