import { Component, OnInit } from '@angular/core';
import { SkillsService } from './skills.service';
import { FocusArea } from '../../shared/enums/focus_area';
import { Skill } from '../../shared/pocos/skill';
import ISkill = Daze.Interfaces.ISkill;

@Component({
    selector: 'skills',
    providers: [SkillsService],
    templateUrl: 'app/dashboard/skills/skills.template.html',
    styleUrls: ['app/dashboard/skills/skills.style.css']
})
export class SkillsComponent implements OnInit {
    private _languages = new Array<ISkill>();
    private _frameworks = new Array<ISkill>();
    private _databases = new Array<ISkill>();
    constructor(private _skillsService: SkillsService) { }

    ngOnInit() {
        this._skillsService.getData(FocusArea.languages)
            .subscribe(l => {
                this._languages.push(new Skill(l.name, l.courses.length));
            });

        this._skillsService.getData(FocusArea.databases)
            .subscribe(d => {
                this._databases.push(new Skill(d.name, d.courses.length));
            });

        this._skillsService.getData(FocusArea.frameworks)
            .subscribe(f => {
                this._frameworks.push(new Skill(f.name, f.courses.length));
            });;
    }
}