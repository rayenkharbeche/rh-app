import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Requestleave } from '../../requestleave/model/requestleave';
import { RequestleaveService } from '../../requestleave/service/requestleave.service';
import { RequestleaveInterneStatus } from '../../requestleave/model/requestleaveInterneStatus';
import { RequestleaveStatus } from '../../requestleave/model/requestleaveStatus';
@Component({
  selector: 'app-requestsickvalidation',
  templateUrl: './requestsickvalidation.component.html',
  styleUrl: './requestsickvalidation.component.css'
})
export class RequestsickvalidationComponent {

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
      downloadFile(content: string, fileName: string, fileType: string) {
        const blob = new Blob([content], { type: fileType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      }

   
    
    rejectRequest(rqleave: Requestleave){

    
      rqleave.interneStatus = RequestleaveInterneStatus.Rejected;
      rqleave.status = RequestleaveStatus.Rejected;
     
      this.requestUpdateStatus(rqleave.id!, rqleave);          
      this.retrievRequest();

      

    }
      

    
  }
  
