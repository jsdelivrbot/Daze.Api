import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../shared/services/project.service';
import { Project } from '../../../shared/models/project.model';

@Component({
    selector: 'adminProjectsUpdate',
    providers: [ProjectService, FormBuilder],
    templateUrl: 'app/admin/projects/update/admin.projects.update.template.html'
})
export class AdminProjectsUpdateComponent implements OnInit {
    private _project: Project = null;
    private _projectId: string;
    private _updateForm: FormGroup;
    constructor(private _projectService: ProjectService,
        private _router: ActivatedRoute,
        private _formBuilder: FormBuilder) { }

    onFormSubmit(event: MouseEvent) {
        if (this._project) {
            this._project.id = this._projectId;
            this._projectService.updateProject(this._project)
                .subscribe(p => console.log('project was updated ', p),
                err => console.log(err),
                () => { });
        }
    }

    onValueChanged(data?: Project) {
        this._project = !!data ? data : new Project;
    }

    populateForm(project?: Project) {
        if (project) {
            this._updateForm = this._formBuilder.group({
                name: [project.name, Validators.required],
                description: [project.description, Validators.required],
                url: [project.url, Validators.required]
            });
            this._updateForm.valueChanges.subscribe(p => this.onValueChanged(p));
            this.onValueChanged();

        } else {
            this._updateForm = this._formBuilder.group({
                name: new FormControl(),
                description: new FormControl(),
                url: new FormControl()
            })
        }
    }

    ngOnInit() {
        this.populateForm();
        this._router.params.subscribe(pr => {
            const projectId = pr['id'];
            this._projectId = projectId;
            this._projectService.findProjectById(projectId)
                .subscribe(p => {
                    this._project = p;
                    this.populateForm(p);
                });
        });
    }
}