import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../../shared/services/skills.service';
import ISkill = Daze.Interfaces.ISkill;

@Component({
    selector: 'adminSkills',
    providers: [SkillsService],
    styleUrls: ['app/admin/admin.style.css'],
    templateUrl: 'app/admin/skills/admin.skills.template.html'
})
export class AdminSkillsComponent implements OnInit {
    private _skills = new Array<ISkill>();
    private _selectedSkill: ISkill = null;
    private _isSkillSelected = false;
    private _isLoading = true;
    constructor(private _skillsService: SkillsService) { }

    onSkillClick(id: string) {
        this._selectedSkill = this._skills.find(s => s.id == id);
        this._isSkillSelected = true;
    }

    ngOnInit() {
        this._skillsService.getSkills()
            .subscribe(s => this._skills.push(s),
            _ => _,
            () => this._isLoading = false);
    }
}