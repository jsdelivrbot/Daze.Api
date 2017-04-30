import { Component, OnInit } from '@angular/core';
import { AvatarService } from './avatar.service';
import { VersionService } from '../../shared/services/version.service';

@Component({
    selector: 'avatar',
    providers: [AvatarService, VersionService],
    templateUrl: 'app/leftnavbar/avatar/avatar.template.html',
    styleUrls: ['app/leftnavbar/avatar/avatar.style.css']
})
export class AvatarComponent implements OnInit {
    private _avatar = {};
    private _version = "";
    private _currentYear = new Date().getFullYear();
    constructor(private readonly _avatarService: AvatarService,
        private readonly _versionService: VersionService) { }

    ngOnInit() {
        this._avatarService.getAvatarInfo()
            .subscribe(r => this._avatar = r);

        this._versionService.getVersion()
            .subscribe(r => this._version = r)
    }
}

