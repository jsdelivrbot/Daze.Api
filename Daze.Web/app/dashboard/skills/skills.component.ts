import { Component, OnInit } from '@angular/core';

interface ISkill {
    name: string;
    level: number;
}

@Component({
    selector: 'skills',
    templateUrl: 'app/dashboard/skills/skills.template.html',
    styleUrls: ['app/dashboard/skills/skills.style.css']
})
export class SkillsComponent implements OnInit {
    public languages: ISkill[];
    private frameworks: ISkill[];
    private databases: ISkill[];
    constructor() { }

    ngOnInit() {
        this.languages = [
            { name: 'C#', level: 80 },
            { name: 'F#', level: 50 },
            { name: 'Ts/Js', level: 30 },
            { name: 'TSql/PlpgSql', level: 10 },
            { name: 'Css', level: 100 }
        ];

        this.frameworks = [
            { name: 'Angular2', level: 80 },
            { name: 'AspNet/Core', level: 50 },
            { name: 'EntityFramework/Core', level: 30 },
            { name: 'Marten', level: 10 },
            { name: 'Node/Express', level: 100 }
        ];

        this.databases = [
            { name: 'PostgreSql', level: 50 },
            { name: 'Sql Server', level: 30 },
            { name: 'Redis', level: 10 },
            { name: 'Cassandra', level: 100 }
        ];
    }
}