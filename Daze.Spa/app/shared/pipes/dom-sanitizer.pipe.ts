import { Pipe, PipeTransform, Inject } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
    name: 'sanitize'
})
export class DomSanitizerPipe implements PipeTransform {
    constructor( @Inject(DomSanitizer) private readonly _domSanitizer: DomSanitizer) { }

    transform(value: any, ...args: any[]) {
        return this._domSanitizer.bypassSecurityTrustHtml(value);
    }
}
