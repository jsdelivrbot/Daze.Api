import { Component, OnInit } from '@angular/core';
import { SkillsService } from './skills.service';
import { Skill } from '../../shared/pocos/skill';
import { FocusArea } from '../../shared/enums/focus_area';

@Component({
    selector: 'skills',
    providers: [SkillsService],
    templateUrl: 'app/dashboard/skills/skills.template.html',
    styleUrls: ['app/dashboard/skills/skills.style.css']
})
export class SkillsComponent implements OnInit {
    private _languages: Array<Skill>;
    private _frameworks: Array<Skill>;
    private _databases: Array<Skill>;
    constructor(private _skillsService: SkillsService) { }

    ngOnInit() {
        this._languages = this._skillsService.getData(FocusArea.languages);
        this._databases = this._skillsService.getData(FocusArea.databases);
        this._frameworks = this._skillsService.getData(FocusArea.frameworks);
    }
}