import { Component, OnInit } from '@angular/core';
import { AvatarService } from './avatar.service';

@Component({
    selector: 'avatar',
    providers: [AvatarService],
    templateUrl: './avatar.template.html',
    styleUrls: ['./avatar.style.css']
})
export class AvatarComponent implements OnInit {
    private _avatar = {};
    constructor(private readonly _avatarService: AvatarService) { }

    ngOnInit() {
        // this._avatarService.getAvatarInfo()
        //     .subscribe(r => this._avatar = r);
    }
}

