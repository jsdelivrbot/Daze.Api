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
            margin: 10em 0 0 0;
        }
        md-spinner {
            height: 4em;
            width: 4em;
        }
        .centerit md-spinner path {
            stroke: #22384e;
        }
    `]
})
export class SpinnerComponent { }