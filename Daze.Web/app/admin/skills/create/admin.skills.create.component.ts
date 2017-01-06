import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../../../shared/services/skills.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill } from '../../../shared/models/skill.model';

@Component({
    selector: 'adminSkillsCreate',
    providers: [FormBuilder, SkillsService],
    templateUrl: 'app/admin/skills/create/admin.skills.create.template.html'
})
export class AdminSkillsCreateComponent implements OnInit {
    public skillForm: FormGroup;
    public skill = new Skill(undefined, undefined);
    constructor(private _formBuilder: FormBuilder,
        private _skillsService: SkillsService) { }

    onFormSubmit(ev: MouseEvent) {
        console.log(this.skill);
        if (this.skill) {
            this._skillsService.addSkill(this.skill)
                .subscribe(r => console.log("skill was inserted"),
                err => console.log(err),
                () => { });
        }
    }

    onValueChanged(data?: Skill) {
        this.skill = data;
    }

    ngOnInit() {
        this.skillForm = this._formBuilder.group({
            name: [this.skill, Validators.required]
        });
        this.skillForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
    }
}