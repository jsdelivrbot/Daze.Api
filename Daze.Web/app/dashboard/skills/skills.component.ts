import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../shared/services/skill.service';
import { Skill } from '../../shared/models/skill.model';
import ISkill = Daze.Interfaces.ISkill;

@Component({
    selector: 'skills',
    providers: [SkillService],
    templateUrl: 'app/dashboard/skills/skills.template.html',
    styleUrls: ['app/dashboard/skills/skills.style.css']
})
export class SkillsComponent implements OnInit {
    private _languages = new Array<ISkill>();
    private _frameworks = new Array<ISkill>();
    private _databases = new Array<ISkill>();
    private _isLanguagesLoading = true;
    private _isDatabasesLoading = true;
    private _isFrameworksLoading = true;
    constructor(private _skillService: SkillService) { }

    ngOnInit() {
        this._skillService.getSkillsByFocusArea("languages")
            .subscribe(l => this._languages.push(
                new Skill(l.Name, !!l.Courses ? l.Courses.length : 0)),
            _ => _,
            () => this._isLanguagesLoading = false);

        this._skillService.getSkillsByFocusArea("databases")
            .subscribe(d => this._databases.push(
                new Skill(d.Name, !!d.Courses ? d.Courses.length : 0)),
            _ => _,
            () => this._isDatabasesLoading = false);

        this._skillService.getSkillsByFocusArea("frameworks")
            .subscribe(f => this._frameworks.push(
                new Skill(f.Name, !!f.Courses ? f.Courses.length : 0)),
            _ => _,
            () => this._isFrameworksLoading = false);
    }
}