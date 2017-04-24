import { Pipe, PipeTransform, Inject } from '@angular/core';
import { MarkdownParserService } from '../services/markdown-parser.service';

@Pipe({
    name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {
    constructor( @Inject(MarkdownParserService) private _markdownParserService: MarkdownParserService) { }

    transform(value: any, ...args: any[]) {
        return this._markdownParserService.convertToHtml(value);
    }
}


