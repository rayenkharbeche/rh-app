package com.csi.rh_project.RequestLeave.message;

public class ResponseMessage {
  private String message;

  public String getFile_id() {
    return file_id;
  }

  public void setFile_id(String file_id) {
    this.file_id = file_id;
  }

  private String file_id;

  public ResponseMessage(String message,String file_id) {

    this.message = message;
    this.file_id = file_id;

  }
  public ResponseMessage(String message) {

    this.message = message;

  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

}
