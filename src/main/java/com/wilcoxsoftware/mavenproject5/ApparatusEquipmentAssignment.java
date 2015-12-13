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
@Table(name = "apparatus_equipment_assignment")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ApparatusEquipmentAssignment.findAll", query = "SELECT a FROM ApparatusEquipmentAssignment a"),
    @NamedQuery(name = "ApparatusEquipmentAssignment.findByBarcode", query = "SELECT a FROM ApparatusEquipmentAssignment a WHERE a.barcode = :barcode"),
    @NamedQuery(name = "ApparatusEquipmentAssignment.findByApparatusId", query = "SELECT a FROM ApparatusEquipmentAssignment a WHERE a.apparatusId = :apparatusId"),
    @NamedQuery(name = "ApparatusEquipmentAssignment.findByEquipmentId", query = "SELECT a FROM ApparatusEquipmentAssignment a WHERE a.equipmentId = :equipmentId"),
    @NamedQuery(name = "ApparatusEquipmentAssignment.findByIssueDate", query = "SELECT a FROM ApparatusEquipmentAssignment a WHERE a.issueDate = :issueDate"),
    @NamedQuery(name = "ApparatusEquipmentAssignment.findByReturnData", query = "SELECT a FROM ApparatusEquipmentAssignment a WHERE a.returnData = :returnData")})
public class ApparatusEquipmentAssignment implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "barcode")
    private Integer barcode;
    @Size(max = 45)
    @Column(name = "apparatus_id")
    private String apparatusId;
    @Size(max = 45)
    @Column(name = "equipment_id")
    private String equipmentId;
    @Size(max = 45)
    @Column(name = "issue_date")
    private String issueDate;
    @Size(max = 45)
    @Column(name = "return_data")
    private String returnData;

    public ApparatusEquipmentAssignment() {
    }

    public ApparatusEquipmentAssignment(Integer barcode) {
        this.barcode = barcode;
    }

    public Integer getBarcode() {
        return barcode;
    }

    public void setBarcode(Integer barcode) {
        this.barcode = barcode;
    }

    public String getApparatusId() {
        return apparatusId;
    }

    public void setApparatusId(String apparatusId) {
        this.apparatusId = apparatusId;
    }

    public String getEquipmentId() {
        return equipmentId;
    }

    public void setEquipmentId(String equipmentId) {
        this.equipmentId = equipmentId;
    }

    public String getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(String issueDate) {
        this.issueDate = issueDate;
    }

    public String getReturnData() {
        return returnData;
    }

    public void setReturnData(String returnData) {
        this.returnData = returnData;
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
        if (!(object instanceof ApparatusEquipmentAssignment)) {
            return false;
        }
        ApparatusEquipmentAssignment other = (ApparatusEquipmentAssignment) object;
        if ((this.barcode == null && other.barcode != null) || (this.barcode != null && !this.barcode.equals(other.barcode))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.wilcoxsoftware.mavenproject5.ApparatusEquipmentAssignment[ barcode=" + barcode + " ]";
    }
    
}
