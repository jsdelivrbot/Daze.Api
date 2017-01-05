import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../../shared/skills.service/skills.service';
import { FocusArea } from '../../shared/types/focusArea';
import { Skill } from '../../shared/models/skill.model';
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
    private _isLoading = true;
    constructor(private _skillsService: SkillsService) { }

    ngOnInit() {
        this._skillsService.getSkillsByFocusArea("languages")
            .subscribe(l =>
                this._languages.push(new Skill(l.name, l.courses.length)),
            _ => _,
            () => this._isLoading = false);

        this._skillsService.getSkillsByFocusArea("databases")
            .subscribe(d =>
                this._databases.push(new Skill(d.name, d.courses.length)),
            _ => _,
            () => this._isLoading = false);


        this._skillsService.getSkillsByFocusArea("frameworks")
            .subscribe(f =>
                this._frameworks.push(new Skill(f.name, f.courses.length)),
            _ => _,
            () => this._isLoading = false);
    }
}