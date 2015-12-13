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
@Table(name = "apparatus")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Apparatus.findAll", query = "SELECT a FROM Apparatus a"),
    @NamedQuery(name = "Apparatus.findByApparatusId", query = "SELECT a FROM Apparatus a WHERE a.apparatusId = :apparatusId"),
    @NamedQuery(name = "Apparatus.findByApparatusName", query = "SELECT a FROM Apparatus a WHERE a.apparatusName = :apparatusName")})
public class Apparatus implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "apparatus_id")
    private Integer apparatusId;
    @Size(max = 45)
    @Column(name = "apparatus_name")
    private String apparatusName;

    public Apparatus() {
    }

    public Apparatus(Integer apparatusId) {
        this.apparatusId = apparatusId;
    }

    public Integer getApparatusId() {
        return apparatusId;
    }

    public void setApparatusId(Integer apparatusId) {
        this.apparatusId = apparatusId;
    }

    public String getApparatusName() {
        return apparatusName;
    }

    public void setApparatusName(String apparatusName) {
        this.apparatusName = apparatusName;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (apparatusId != null ? apparatusId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Apparatus)) {
            return false;
        }
        Apparatus other = (Apparatus) object;
        if ((this.apparatusId == null && other.apparatusId != null) || (this.apparatusId != null && !this.apparatusId.equals(other.apparatusId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.wilcoxsoftware.mavenproject5.Apparatus[ apparatusId=" + apparatusId + " ]";
    }
    
}
