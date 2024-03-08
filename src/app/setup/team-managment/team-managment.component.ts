import { Component } from '@angular/core';
import { DepartmentService } from '../service/department.service';
import { Department } from '../model/department';
import { PosteService } from '../service/poste.service';
import { Poste } from '../model/poste';
import { AuthService } from '../../auth/service/auth.service';
import { User } from '../../auth/model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from '../model/team';
import { TeamService } from '../service/team.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-team-managment',

  templateUrl: './team-managment.component.html',
  styleUrl: './team-managment.component.css'
})
export class TeamManagmentComponent {

  departments?: Department[];
  postes?: Poste[];
  show_Users!:boolean;
  users!:User[];
  usersDeleted!:User[];

  form!: FormGroup;
  loading = false;
  team!:Team;
  teams!:Team[];
  managers!:User[];

  constructor(private DepartmentService: DepartmentService,

    private _activatedroute:ActivatedRoute,
    private router: Router,

    private Teamervice: TeamService,
    private formBuilder: FormBuilder,
    private userService: AuthService  ) { }


   
  ngOnInit(): void {

    this.retrieveDepartments();
   
   this.form = this.formBuilder.group({
      id: ['', Validators.required]})
  }

  retrieveTeams(departmentId:any): void {
    this.Teamervice.getAllBydepartment(departmentId)
      .subscribe({
        next: (data) => {
          this.teams = data;
        },
        error: (e) => console.error(e)
      });
  }

  retrieveDepartments(): void {
    this.DepartmentService.getAll()
      .subscribe({
        next: (data) => {
          this.departments = data;
        },
        error: (e) => console.error(e)
      });
  }

  showUsers(department: any,team:any){
    this.show_Users =true;
      this.userService.getAllbyDepartmentByteam(department.id,team.id)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.users = data;

        },
        error: (e) => console.error(e)
      });
    
      }

      onSubmit() {
        console.log(this.form.valid);


      }
      CreateTeam() {
        const data = {
          department: this.team.department,
          consultant:  this.team.consultant,
          teamLead:  this.team.teamlead,
          manager:  this.team.manager,

        };
    
        this.Teamervice.create(data)
          .subscribe({
            next: (res) => {
              console.log(res); 
              //this.submitted = true;
              this.retrieveTeams(this.team.department.id);
    
            },
            error: (e) => console.error(e)
          });

      }

      onNavClick(departmentId:any) {
        this.retrieveTeams(departmentId);
        }
        clickEvent() {

        }
        onBtnClicked() {
          const data = {
            id: null
          };
          this.usersDeleted = this.users.filter(x => x.selected);
            console.log(this.usersDeleted);
            for (let user of this.usersDeleted) {     
              this.userService.updateteamlead(user.id!, data)
              .subscribe({
                next: (res) => {
                }})
              }

              const returnUrl = this._activatedroute.snapshot.queryParams['returnUrl'] || 'setup/teamManagment' ;
              this.router.navigateByUrl(returnUrl);   

        }
        deleteTeam(team: Team) {
          this.Teamervice.delete(team.id)
          .subscribe({
            next: (res) => {
              const returnUrl = this._activatedroute.snapshot.queryParams['returnUrl'] || 'setup/teamManagment' ;
              this.router.navigateByUrl(returnUrl);   
                        },
            error: (e) => console.error(e)
          });
        }
        updateTeam(team: Team) {
    
        const returnUrl = this._activatedroute.snapshot.queryParams['returnUrl'] || 'setup/updateteam/'+ team.id ;
        this.router.navigateByUrl(returnUrl);   

        }



      }
