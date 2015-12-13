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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
@Table(name = "person_certification")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PersonCertification.findAll", query = "SELECT p FROM PersonCertification p"),
    @NamedQuery(name = "PersonCertification.findById", query = "SELECT p FROM PersonCertification p WHERE p.id = :id"),
    @NamedQuery(name = "PersonCertification.findByRadioId", query = "SELECT p FROM PersonCertification p WHERE p.radioId = :radioId"),
    @NamedQuery(name = "PersonCertification.findByName", query = "SELECT p FROM PersonCertification p WHERE p.name = :name"),
    @NamedQuery(name = "PersonCertification.findByDescription", query = "SELECT p FROM PersonCertification p WHERE p.description = :description"),
    @NamedQuery(name = "PersonCertification.findByExpirationDate", query = "SELECT p FROM PersonCertification p WHERE p.expirationDate = :expirationDate")})
public class PersonCertification implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Column(name = "radio_id")
    private int radioId;
    @Size(max = 45)
    @Column(name = "name")
    private String name;
    @Size(max = 45)
    @Column(name = "description")
    private String description;
    @Size(max = 45)
    @Column(name = "expiration_date")
    private String expirationDate;

    public PersonCertification() {
    }

    public PersonCertification(Integer id) {
        this.id = id;
    }

    public PersonCertification(Integer id, int radioId) {
        this.id = id;
        this.radioId = radioId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getRadioId() {
        return radioId;
    }

    public void setRadioId(int radioId) {
        this.radioId = radioId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PersonCertification)) {
            return false;
        }
        PersonCertification other = (PersonCertification) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.wilcoxsoftware.mavenproject5.PersonCertification[ id=" + id + " ]";
    }
    
}
