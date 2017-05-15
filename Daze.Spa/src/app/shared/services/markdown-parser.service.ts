import { Injectable } from '@angular/core';
import * as marked from 'marked';

@Injectable()
export class MarkdownParserService {
    private md: MarkedStatic;
    constructor() {
        this.md = marked;
        this.md.setOptions({
            gfm: true,
            sanitize: true,
            breaks: true
        });
    }

    convertToHtml(markdown: string) {
        return this.md.parse(markdown);
    }
}