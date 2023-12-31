
package com.csi.rh_project.auth.models;

import com.csi.rh_project.setup.model.Department;
import com.csi.rh_project.setup.model.Position;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    @Column(name = "token")
    private String token;
    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime tokenCreationDate;

    //@ManyToOne(fetch = FetchType.LAZY)
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "role_id")
    private Role role;

    /*birthdayDate?: string;
    entity?: Entity;
    cotractStartDate?: string;
    poste?: string;
    department?: string;*/

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "entity_id")
    private Entity entity;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "poste_id")
    private Position poste;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "department_id")
    private Department department;

    /*@JoinColumn(name = "image_id")
    private String image;*/
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "image_id")
    private Image image;


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
    public User(String firstname,String lastname, String password,String email,Role role,Image image){
        super();
        this.firstname=firstname;
        this.lastname=lastname;
        this.password=password;
        this.email=email;
        this.role=role;
        this.image=image;

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

    public Position getPoste() {
        return poste;
    }

    public void setPoste(Position poste) {
        this.poste = poste;
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

    /*public void setImage(Optional<Image> byId) {
    }*/

    /*public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }*/
}

