
package com.csi.rh_project.auth.models;

import com.csi.rh_project.setup.model.Department;

import com.csi.rh_project.setup.model.Poste;
import com.csi.rh_project.setup.model.Team;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.csi.rh_project.setup.model.Entity;

import java.time.LocalDateTime;
import java.util.*;

@Table(name = "users")
@jakarta.persistence.Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer id;


    @Column(nullable = true)
    private String firstname;
    @Column(nullable = true)
    private String lastname;


    @Column(unique = true, length = 100, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;



    @Column(name = "token")
    private String token;
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime tokenCreationDate;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "role_id")
    private Role role;




    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "entity_id")
    private Entity entity;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "department_id")
    private Department department;



    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "poste_id")
    private Poste poste;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "image_id")
    private Image image;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "team_id")
    private Team team;


    @Column(name = "is_actif")
    private Boolean actif;

    @Column(name = "assurance")
    private Boolean assurance;


    @Column(name = "contract_type")
    private String contractType;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "address")
    private String address;

    @Column(name = "matricule",unique = true)
    private String matricule;

    @Column(name = "family_situation")
    private String familySituation;


    @Column(name = "child_number")
    private Integer childNumber;

    @Column(name = "remote_day")
    private double remoteNbr;


    @OneToOne
    @JoinColumn(name="superiorId")
    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    private User superior;

    public User getSuperior() {
        return superior;
    }

    public void setSuperior(User superior) {
        this.superior = superior;
    }

    public double getRemoteNbr() {
        return remoteNbr;
    }

    public void setRemoteNbr(double remoteNbr) {
        this.remoteNbr = remoteNbr;
    }


    public Integer getChildNumber() {
        return childNumber;
    }

    public void setChildNumber(Integer childNumber) {
        this.childNumber = childNumber;
    }

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    @Column(name = "birth_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date birthdayDate;
    @Column(name = "contract_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date contractStartDate;

    @Column(name = "contractEnd_date")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date contactEndDate;


    @Column(name = "leave_credit")
    private double leaveCredit;


    @Column(name = "rtt_credit")
    private double rttCredit;

    public Date getContactEndDate() {
        return contactEndDate;
    }

    public void setContactEndDate(Date contactEndDate) {
        this.contactEndDate = contactEndDate;
    }

    public Boolean getAssurance() {
        return assurance;
    }

    public void setAssurance(Boolean assurance) {
        this.assurance = assurance;
    }

    public String getContractType() {
        return contractType;
    }

    public void setContractType(String contractType) {
        this.contractType = contractType;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getFamilySituation() {
        return familySituation;
    }

    public void setFamilySituation(String familySituation) {
        this.familySituation = familySituation;
    }




    public Boolean getActif() {
        return actif;
    }

    public void setActif(Boolean actif) {
        this.actif = actif;
    }



    public double getRttCredit() {
        return rttCredit;
    }

    public void setRttCredit(double rttCredit) {
        this.rttCredit = rttCredit;
    }

    public double getLeaveCredit() {
        return leaveCredit;
    }

    public void setLeaveCredit(double leaveCredit) {
        this.leaveCredit = leaveCredit;
    }

    public Date getBirthdayDate() {
        return birthdayDate;
    }

    public void setBirthdayDate(Date birthdayDate) {
        this.birthdayDate = birthdayDate;
    }


    public Poste getPoste() {
        return poste;
    }

    public void setPoste(Poste poste) {
        this.poste = poste;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public User(){
        super();
    }
    public User(String email){
        super();
        this.email=email;
    }
    public User(String firstname,String lastname, String password,String email,Role role,Image image,Date birthdayDate, Date contractStartDate,Boolean actif,double remoteNbr){
        super();
        this.firstname=firstname;
        this.lastname=lastname;
        this.password=password;
        this.email=email;
        this.role=role;
        this.image=image;
        this.birthdayDate=birthdayDate;
        this.contractStartDate=contractStartDate;
        this.actif=actif;
        this.remoteNbr = remoteNbr;

    }
    public User(String token,LocalDateTime tokenCreationDate){
        super();
        this.token=token;
        this.tokenCreationDate=tokenCreationDate;

    }


    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Integer getId() {
        return id;
    }

    public User setId(Integer id) {
        this.id = id;
        return this;
    }

    public String getFirstname() {
        return firstname;
    }
    public String getLastName() {
        return lastname;
    }


    public User setFirstName(String firstname) {
        this.firstname = firstname;
        return this;
    } public User setLastName(String lastname) {
        this.lastname = lastname;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public User setEmail(String email) {
        this.email = email;
        return this;
    }

    public User setPassword(String password) {
        this.password = password;
        return this;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public User setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public User setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", role=" + role +
                ", image=" + image +
                ", actif=" + actif +
                ", remoteNbr=" + remoteNbr +

                '}';
    }



    public Role getRole() {
        return role;
    }

    public User setRole(Role role) {
        this.role = role;
        return this;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getTokenCreationDate() {
        return tokenCreationDate;
    }

    public void setTokenCreationDate(LocalDateTime tokenCreationDate) {
        this.tokenCreationDate = tokenCreationDate;
    }

    public Entity getEntity() {
        return entity;
    }

    public void setEntity(Entity entity) {
        this.entity = entity;
    }


    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }




    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }


    public Date getContractStartDate() {
        return contractStartDate;
    }

    public void setContractStartDate(Date contractStartDate) {
        this.contractStartDate = contractStartDate;
    }
}

