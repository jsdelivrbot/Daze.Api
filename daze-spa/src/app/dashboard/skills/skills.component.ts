import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../shared/services/skill.service';
import { Skill } from '../../shared/models/skill.model';

@Component({
    selector: 'skills',
    providers: [SkillService],
    templateUrl: './skills.template.html',
    styleUrls: ['./skills.style.css']
})
export class SkillsComponent implements OnInit {
    private _languages = new Array<Skill>();
    private _frameworks = new Array<Skill>();
    private _databases = new Array<Skill>();
    private _isLanguagesLoading = true;
    private _isDatabasesLoading = true;
    private _isFrameworksLoading = true;
    constructor(private readonly _skillService: SkillService) { }

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