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
@Table(name = "item")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Item.findAll", query = "SELECT i FROM Item i"),
    @NamedQuery(name = "Item.findByItemId", query = "SELECT i FROM Item i WHERE i.itemId = :itemId"),
    @NamedQuery(name = "Item.findByName", query = "SELECT i FROM Item i WHERE i.name = :name"),
    @NamedQuery(name = "Item.findByDescription", query = "SELECT i FROM Item i WHERE i.description = :description"),
    @NamedQuery(name = "Item.findByWarehouseMinuteRequested", query = "SELECT i FROM Item i WHERE i.warehouseMinuteRequested = :warehouseMinuteRequested"),
    @NamedQuery(name = "Item.findByAppatatusMinumumRequested", query = "SELECT i FROM Item i WHERE i.appatatusMinumumRequested = :appatatusMinumumRequested"),
    @NamedQuery(name = "Item.findByOrderPrice", query = "SELECT i FROM Item i WHERE i.orderPrice = :orderPrice")})
public class Item implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "item_id")
    private Integer itemId;
    @Size(max = 45)
    @Column(name = "name")
    private String name;
    @Size(max = 45)
    @Column(name = "description")
    private String description;
    @Size(max = 45)
    @Column(name = "warehouse_minute_requested")
    private String warehouseMinuteRequested;
    @Size(max = 45)
    @Column(name = "appatatus_minumum_requested")
    private String appatatusMinumumRequested;
    @Size(max = 45)
    @Column(name = "order_price")
    private String orderPrice;

    public Item() {
    }

    public Item(Integer itemId) {
        this.itemId = itemId;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
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

    public String getWarehouseMinuteRequested() {
        return warehouseMinuteRequested;
    }

    public void setWarehouseMinuteRequested(String warehouseMinuteRequested) {
        this.warehouseMinuteRequested = warehouseMinuteRequested;
    }

    public String getAppatatusMinumumRequested() {
        return appatatusMinumumRequested;
    }

    public void setAppatatusMinumumRequested(String appatatusMinumumRequested) {
        this.appatatusMinumumRequested = appatatusMinumumRequested;
    }

    public String getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(String orderPrice) {
        this.orderPrice = orderPrice;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (itemId != null ? itemId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Item)) {
            return false;
        }
        Item other = (Item) object;
        if ((this.itemId == null && other.itemId != null) || (this.itemId != null && !this.itemId.equals(other.itemId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.wilcoxsoftware.mavenproject5.Item[ itemId=" + itemId + " ]";
    }
    
}
