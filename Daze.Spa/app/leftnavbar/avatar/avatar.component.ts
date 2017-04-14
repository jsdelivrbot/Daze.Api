import { Component, OnInit } from '@angular/core';
import AvatarService from './avatar.service';

@Component({
    selector: 'avatar',
    providers: [AvatarService],
    templateUrl: 'app/leftnavbar/avatar/avatar.template.html',
    styleUrls: ['app/leftnavbar/avatar/avatar.style.css']
})
export class AvatarComponent implements OnInit {
    private _avatar = {};
    constructor(private avatarService: AvatarService) { }

    ngOnInit() {
        this.avatarService.getAvatarInfo()
            .subscribe(res => this._avatar = res);
    }
}

