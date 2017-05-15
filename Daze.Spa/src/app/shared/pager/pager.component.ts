import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pager',
    styleUrls: ['./pager.style.css'],
    template: `
<ul class="pagination">
    <li class="pagination-item">
        <a>&laquo;</a>
    </li>
    <li *ngFor="let pageNumber of numberOfPagesArray"
        (click)="changePage(pageNumber)"
        class="pagination-item">
        <a >{{ pageNumber }} </a>
    </li>
    <li class="pagination-item">
        <a>&raquo;</a>
    </li>
</ul>
    `
})
export class PagerComponent implements OnInit {
    public numberOfPagesArray = new Array<number>();
    public numberOfPages = 1;
    public numberOfItemsPerPage = 2;
    public currentPage = 1;

    @Input() items: Array<any> = [];
    @Output('pageChanged') pageChanged = new EventEmitter();

    async changePage(pageNumber: number) {
        this.currentPage = pageNumber;
        const posts = this.items;

        const startingIndex = (this.currentPage - 1) * this.numberOfItemsPerPage;
        const endIndex = Math.min(startingIndex + this.numberOfItemsPerPage, posts.length);
        this.items = new Array();
        for (let i = startingIndex; i < endIndex; i++) {
            this.items.push(posts[i]);
        }
        this.pageChanged.emit(this.currentPage);
    }

    ngOnInit() {
        this.numberOfPages = Math.ceil(this.items.length / this.numberOfItemsPerPage);
        for (let i = 1; i <= this.numberOfPages; i++) {
            this.numberOfPagesArray.push(i);
        }
    }
}

