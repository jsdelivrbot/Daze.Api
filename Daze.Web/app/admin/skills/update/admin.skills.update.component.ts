import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SkillService } from '../../../shared/services/skill.service';
import { Skill } from '../../../shared/models/skill.model';

const tee = (msg: any) => { console.log; return msg; };
@Component({
    selector: 'adminSkillsUpdate',
    providers: [SkillService, FormBuilder],
    templateUrl: 'app/admin/skills/update/admin.skills.update.template.html'
})
export class AdminSkillsUpdateComponent implements OnInit {
    private _skill: Skill = null;
    private _skillId: string;
    private _updateForm: FormGroup;
    constructor(private _skillService: SkillService,
        private _formBuilder: FormBuilder,
        private _router: ActivatedRoute) { }


    onFormSubmit(event: MouseEvent) {
        if (this._skill) {
            this._skill.id = this._skillId;
            this._skillService.updateProject(this._skill)
                .subscribe(s => console.log('project was updated ', s),
                err => console.log(err),
                () => { });
        }
    }

    onValueChanged(data?: Skill) {
        this._skill = !!data ? data : new Skill(null, null)
    }

    populateForm(skill?: Skill) {
        if (skill) {
            this._updateForm = this._formBuilder.group({
                name: [skill.name, Validators.required],
                level: [skill.level, Validators.required],
                focusArea: [skill.focusArea, Validators.required]
            });
            this._updateForm.valueChanges.subscribe(data => this.onValueChanged(data));
            this.onValueChanged();
        } else {
            this._updateForm = this._formBuilder.group({
                name: new FormControl(),
                level: new FormControl(),
                focusArea: new FormControl()
                // courses: []
            });
        }
    }

    ngOnInit() {
        this.populateForm();
        this._router.params.subscribe(par => {
            const skillId = par['id'];
            this._skillId = skillId;
            this._skillService.findSkillById(skillId)
                .subscribe(s => {
                    this._skill = s;
                    this.populateForm(s);
                });
        });
    }
}

