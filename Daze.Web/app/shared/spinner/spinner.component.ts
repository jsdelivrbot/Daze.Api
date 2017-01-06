import { Component } from '@angular/core';

@Component({
    selector: 'spinner',
    template: `
        <div>
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            <span class="sr-only">Loading...</span>
        </div>  
    `
})
export class SpinnerComponent { } 