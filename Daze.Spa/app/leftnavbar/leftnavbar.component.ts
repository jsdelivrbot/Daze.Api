import { Component, OnInit } from '@angular/core';
import { VersionService } from '../shared/services/version.service';

@Component({
    selector: 'leftnavbar',
    providers: [VersionService],
    templateUrl: 'app/leftnavbar/leftnavbar.template.html',
    styleUrls: ['app/leftnavbar/leftnavbar.style.css']
})
export class LeftNavbarComponent implements OnInit {
    private _version = '';
    private _currentYear = new Date().getFullYear();
    constructor(private readonly _versionService: VersionService) { }

    ngOnInit() {
        this._versionService.getVersion()
            .subscribe(r => this._version = r);
    }
}

