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
@Table(name = "person_history")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PersonHistory.findAll", query = "SELECT p FROM PersonHistory p"),
    @NamedQuery(name = "PersonHistory.findById", query = "SELECT p FROM PersonHistory p WHERE p.id = :id"),
    @NamedQuery(name = "PersonHistory.findByRadioId", query = "SELECT p FROM PersonHistory p WHERE p.radioId = :radioId"),
    @NamedQuery(name = "PersonHistory.findByDate", query = "SELECT p FROM PersonHistory p WHERE p.date = :date"),
    @NamedQuery(name = "PersonHistory.findByNote", query = "SELECT p FROM PersonHistory p WHERE p.note = :note")})
public class PersonHistory implements Serializable {
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
    @Column(name = "date")
    private String date;
    @Size(max = 45)
    @Column(name = "note")
    private String note;

    public PersonHistory() {
    }

    public PersonHistory(Integer id) {
        this.id = id;
    }

    public PersonHistory(Integer id, int radioId) {
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
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
        if (!(object instanceof PersonHistory)) {
            return false;
        }
        PersonHistory other = (PersonHistory) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.wilcoxsoftware.mavenproject5.PersonHistory[ id=" + id + " ]";
    }
    
}
