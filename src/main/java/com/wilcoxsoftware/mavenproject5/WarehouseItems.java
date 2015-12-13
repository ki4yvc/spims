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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author dylanwilcox
 */
@Entity
@Table(name = "warehouse_items")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "WarehouseItems.findAll", query = "SELECT w FROM WarehouseItems w"),
    @NamedQuery(name = "WarehouseItems.findById", query = "SELECT w FROM WarehouseItems w WHERE w.id = :id"),
    @NamedQuery(name = "WarehouseItems.findByItemId", query = "SELECT w FROM WarehouseItems w WHERE w.itemId = :itemId"),
    @NamedQuery(name = "WarehouseItems.findByQuantity", query = "SELECT w FROM WarehouseItems w WHERE w.quantity = :quantity")})
public class WarehouseItems implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Size(max = 45)
    @Column(name = "item_id")
    private String itemId;
    @Size(max = 45)
    @Column(name = "quantity")
    private String quantity;

    public WarehouseItems() {
    }

    public WarehouseItems(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
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
        if (!(object instanceof WarehouseItems)) {
            return false;
        }
        WarehouseItems other = (WarehouseItems) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.wilcoxsoftware.mavenproject5.WarehouseItems[ id=" + id + " ]";
    }
    
}
