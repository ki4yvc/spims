/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.wilcoxsoftware.mavenproject5;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author dylanwilcox
 */
@Entity
@Table(name = "person")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Person.findAll", query = "SELECT p FROM Person p"),
    @NamedQuery(name = "Person.findByRadioId", query = "SELECT p FROM Person p WHERE p.radioId = :radioId"),
    @NamedQuery(name = "Person.findByFirstName", query = "SELECT p FROM Person p WHERE p.firstName = :firstName"),
    @NamedQuery(name = "Person.findByLastName", query = "SELECT p FROM Person p WHERE p.lastName = :lastName"),
    @NamedQuery(name = "Person.findByMiddleInitial", query = "SELECT p FROM Person p WHERE p.middleInitial = :middleInitial"),
    @NamedQuery(name = "Person.findByStreetLineOne", query = "SELECT p FROM Person p WHERE p.streetLineOne = :streetLineOne"),
    @NamedQuery(name = "Person.findByStreetLineTwo", query = "SELECT p FROM Person p WHERE p.streetLineTwo = :streetLineTwo"),
    @NamedQuery(name = "Person.findByCity", query = "SELECT p FROM Person p WHERE p.city = :city"),
    @NamedQuery(name = "Person.findByState", query = "SELECT p FROM Person p WHERE p.state = :state"),
    @NamedQuery(name = "Person.findByZip", query = "SELECT p FROM Person p WHERE p.zip = :zip"),
    @NamedQuery(name = "Person.findByPhone", query = "SELECT p FROM Person p WHERE p.phone = :phone"),
    @NamedQuery(name = "Person.findByEmail", query = "SELECT p FROM Person p WHERE p.email = :email"),
    @NamedQuery(name = "Person.findByRole", query = "SELECT p FROM Person p WHERE p.role = :role")})
public class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "radio_id")
    private Integer radioId;
    @Size(max = 45)
    @Column(name = "first_name")
    private String firstName;
    @Size(max = 45)
    @Column(name = "last_name")
    private String lastName;
    @Size(max = 45)
    @Column(name = "middle_initial")
    private String middleInitial;
    @Size(max = 45)
    @Column(name = "street_line_one")
    private String streetLineOne;
    @Size(max = 45)
    @Column(name = "street_line_two")
    private String streetLineTwo;
    @Size(max = 45)
    @Column(name = "city")
    private String city;
    @Size(max = 2)
    @Column(name = "state")
    private String state;
    @Column(name = "zip")
    private Integer zip;
    // @Pattern(regexp="^\\(?(\\d{3})\\)?[- ]?(\\d{3})[- ]?(\\d{4})$", message="Invalid phone/fax format, should be as xxx-xxx-xxxx")//if the field contains phone or fax number consider using this annotation to enforce field validation
    @Size(max = 45)
    @Column(name = "phone")
    private String phone;
    // @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="Invalid email")//if the field contains email address consider using this annotation to enforce field validation
    @Size(max = 45)
    @Column(name = "email")
    private String email;
    @Size(max = 45)
    @Column(name = "role")
    private String role;

    public Person() {
    }

    public Person(Integer radioId) {
        this.radioId = radioId;
    }

    public Integer getRadioId() {
        return radioId;
    }

    public void setRadioId(Integer radioId) {
        this.radioId = radioId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleInitial() {
        return middleInitial;
    }

    public void setMiddleInitial(String middleInitial) {
        this.middleInitial = middleInitial;
    }

    public String getStreetLineOne() {
        return streetLineOne;
    }

    public void setStreetLineOne(String streetLineOne) {
        this.streetLineOne = streetLineOne;
    }

    public String getStreetLineTwo() {
        return streetLineTwo;
    }

    public void setStreetLineTwo(String streetLineTwo) {
        this.streetLineTwo = streetLineTwo;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getZip() {
        return zip;
    }

    public void setZip(Integer zip) {
        this.zip = zip;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (radioId != null ? radioId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Person)) {
            return false;
        }
        Person other = (Person) object;
        if ((this.radioId == null && other.radioId != null) || (this.radioId != null && !this.radioId.equals(other.radioId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.wilcoxsoftware.mavenproject5.Person[ radioId=" + radioId + " ]";
    }
    
}
