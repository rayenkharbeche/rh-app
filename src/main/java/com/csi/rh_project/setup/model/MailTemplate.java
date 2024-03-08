package com.csi.rh_project.setup.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@jakarta.persistence.Entity
@Table(name = "mail_template")
public class MailTemplate {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Setter
	@Column(name = "mail_reference",unique = true)
	private String reference;

	@Setter
	@Column(name = "subject")
	private String subject;

	@Setter
	@Column(name = "template")
	private String template;

	@Setter
	@Column(name = "status")
	private String status;

	public MailTemplate() {

	}

	public MailTemplate(String reference, String subject, String template) {
		this.reference = reference;
		this.subject = subject;
		this.template = template;
	}
	public MailTemplate(String reference, String subject, String template,String status) {
		this.reference = reference;
		this.subject = subject;
		this.template = template;
		this.status = status;

	}

	@Override
	public String toString() {
		return "MailTemplate [id=" + id + ", name=" + reference + ", country code=" + subject + "]";
	}


}
