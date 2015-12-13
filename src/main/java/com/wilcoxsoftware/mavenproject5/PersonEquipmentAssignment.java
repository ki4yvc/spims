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
@Table(name = "person_equipment_assignment")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "PersonEquipmentAssignment.findAll", query = "SELECT p FROM PersonEquipmentAssignment p"),
    @NamedQuery(name = "PersonEquipmentAssignment.findByBarcode", query = "SELECT p FROM PersonEquipmentAssignment p WHERE p.barcode = :barcode"),
    @NamedQuery(name = "PersonEquipmentAssignment.findByRadioId", query = "SELECT p FROM PersonEquipmentAssignment p WHERE p.radioId = :radioId"),
    @NamedQuery(name = "PersonEquipmentAssignment.findByEquipmentId", query = "SELECT p FROM PersonEquipmentAssignment p WHERE p.equipmentId = :equipmentId"),
    @NamedQuery(name = "PersonEquipmentAssignment.findByDateIssued", query = "SELECT p FROM PersonEquipmentAssignment p WHERE p.dateIssued = :dateIssued"),
    @NamedQuery(name = "PersonEquipmentAssignment.findByDateReturned", query = "SELECT p FROM PersonEquipmentAssignment p WHERE p.dateReturned = :dateReturned")})
public class PersonEquipmentAssignment implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "barcode")
    private Integer barcode;
    @Size(max = 45)
    @Column(name = "radio_id")
    private String radioId;
    @Size(max = 45)
    @Column(name = "equipment_id")
    private String equipmentId;
    @Size(max = 45)
    @Column(name = "date_issued")
    private String dateIssued;
    @Size(max = 45)
    @Column(name = "date_returned")
    private String dateReturned;

    public PersonEquipmentAssignment() {
    }

    public PersonEquipmentAssignment(Integer barcode) {
        this.barcode = barcode;
    }

    public Integer getBarcode() {
        return barcode;
    }

    public void setBarcode(Integer barcode) {
        this.barcode = barcode;
    }

    public String getRadioId() {
        return radioId;
    }

    public void setRadioId(String radioId) {
        this.radioId = radioId;
    }

    public String getEquipmentId() {
        return equipmentId;
    }

    public void setEquipmentId(String equipmentId) {
        this.equipmentId = equipmentId;
    }

    public String getDateIssued() {
        return dateIssued;
    }

    public void setDateIssued(String dateIssued) {
        this.dateIssued = dateIssued;
    }

    public String getDateReturned() {
        return dateReturned;
    }

    public void setDateReturned(String dateReturned) {
        this.dateReturned = dateReturned;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (barcode != null ? barcode.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PersonEquipmentAssignment)) {
            return false;
        }
        PersonEquipmentAssignment other = (PersonEquipmentAssignment) object;
        if ((this.barcode == null && other.barcode != null) || (this.barcode != null && !this.barcode.equals(other.barcode))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.wilcoxsoftware.mavenproject5.PersonEquipmentAssignment[ barcode=" + barcode + " ]";
    }
    
}
