import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../shared/services/skill.service';
import ISkill = Daze.Interfaces.ISkill;

@Component({
    selector: 'adminSkills',
    providers: [SkillService],
    styleUrls: ['app/admin/admin.style.css'],
    templateUrl: 'app/admin/skills/admin.skills.template.html'
})
export class AdminSkillsComponent implements OnInit {
    private _skills = new Array<ISkill>();
    private _selectedSkill: ISkill | null | undefined = null;
    private _isLoading = true;
    constructor(private _skillService: SkillService) { }

    onSkillClick(id: string) {
        this._selectedSkill = this._skills.find(s => s.Id == id);
    }

    onSkillDelete(id: string) {
        this._skillService.deleteSkill(id)
<<<<<<< HEAD
            .subscribe(res => (res.status == 200) ?
                console.log("skill deleted") :
                console.log("error"));
        this._skills = this._skills.filter(s => s.id != id);
=======
            .subscribe(res => (res.status == 200)
                ? console.log("skill deleted")
                : console.log("error"));
        this._skills = this._skills.filter(s => s.Id != id);
>>>>>>> suaveapi
        this._selectedSkill = null;
    }

    ngOnInit() {
        this._skillService.getSkills()
            .subscribe(s => this._skills.push(s),
            _ => _,
            () => this._isLoading = false);
    }
}