import { Component } from '@angular/core';

@Component({
    selector: 'spinner',
    template: `
        <div class="centerit">
            <md-spinner mode="indeterminate"></md-spinner> 
        </div>
    `,
    styles: [`
        .centerit {
            display: flex;
            justify-content: center;
        }
    `]
})
export class SpinnerComponent { } 