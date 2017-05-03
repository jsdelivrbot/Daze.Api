import { Component, OnInit } from '@angular/core';
import { AvatarService } from './avatar.service';

@Component({
    selector: 'avatar',
    providers: [AvatarService],
    templateUrl: 'app/leftnavbar/avatar/avatar.template.html',
    styleUrls: ['app/leftnavbar/avatar/avatar.style.css']
})
export class AvatarComponent implements OnInit {
    private _avatar = {};
    constructor(private readonly _avatarService: AvatarService) { }

    ngOnInit() {
        this._avatarService.getAvatarInfo()
            .subscribe(r => this._avatar = r);
    }
}

