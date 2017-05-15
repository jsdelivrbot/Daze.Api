import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../../shared/services/skill.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill } from '../../../shared/models/skill.model';

@Component({
    selector: 'adminSkillsCreate',
    providers: [FormBuilder, SkillService],
    templateUrl: './admin.skills.create.template.html'
})
export class AdminSkillsCreateComponent implements OnInit {
    public skillForm: FormGroup;
    public skill = new Skill(null, null);
    constructor(private readonly _skillService: SkillService,
        private readonly _formBuilder: FormBuilder) { }

    onFormSubmit(ev: MouseEvent) {
        console.log(this.skill);
        if (this.skill) {
            this._skillService.createSkill(this.skill)
                .subscribe(r => console.log("skill was inserted"),
                err => console.log(err),
                () => { });
        }
    }

    onValueChanged(data?: Skill) {
        this.skill = !!data ? data : new Skill(null, null);
    }

    ngOnInit() {
        this.skillForm = this._formBuilder.group({
            name: [this.skill, Validators.required]
        });
        this.skillForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
    }
}