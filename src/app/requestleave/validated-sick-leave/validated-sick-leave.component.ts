import { Component } from '@angular/core';
import { Requestleave } from '../model/requestleave';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestleaveService } from '../service/requestleave.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-validated-sick-leave',
  templateUrl: './validated-sick-leave.component.html',
  styleUrl: './validated-sick-leave.component.css'
})

export class ValidatedSickLeaveComponent {


  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  status!: string;
  requests!: Requestleave[];
  request!: Requestleave;
  requestSelected!: Requestleave;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestleaveservice: RequestleaveService,
    private http: HttpClient

  ) { }
  

  selectedId: any ;

  
    
  get f(){
    return this.myForm.controls;
  }
  
    ngOnInit(): void {
      this.retrievRequest();

    }
  requestUpdateStatus(requestId:any,status:any) {
    this.requestleaveservice.updateStatus(requestId,status)
    .subscribe({
      next: (data) => {
        if (data.status == "Validated"){
          this.requestleaveservice.updateCredit(data)
          .subscribe({
            next: (data) => {
            }})
        }
      },
      error: (e) => console.error(e)
    });
  }
    retrievRequest(){

      var currentUser  = JSON.parse(localStorage.getItem('user')!);

      this.requestleaveservice.getAllSickLeavebyuser(currentUser.id)
      .subscribe({
        next: (data) => {
          this.requests = data;
          console.log(this.requests);
          
        },
        error: (e) => console.error(e)
      });
    }
    onFileChange(event:any,request:any) {
  
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.myForm.patchValue({
          fileSource: file
        });
      }
      this.requestSelected = request;
      this.onSubmit();
    } 
    onSubmit() {
      const formData = new FormData();
      formData.append('file', this.myForm.value.fileSource!);
       
      this.http.post('http://localhost:8080/api/upload', formData)
        .subscribe(res => {
          this.addFileRequestLeave(res);
          console.log( res)

          //alert('Uploaded Successfully.');
        })

  

      }
      addFileRequestLeave(file:any){
      console.log( file.file_id)

      this.requestleaveservice.getFileDB(file.file_id)
      .subscribe({
        next: (data) => {
          this.requestSelected.fileDB =  data;
          console.log( this.requestSelected.fileDB)
    
          this.requestleaveservice.update(this.requestSelected.id!, this.requestSelected)
          .subscribe({
            next: (res) => {
              console.log(res);
                      },
            error: (e) => console.error(e)
          });          
        },
        error: (e) => console.error(e)
      });
      

      }
  

    
  }
  
