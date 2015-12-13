/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.wilcoxsoftware.mavenproject5;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author dylanwilcox
 */
@Stateless
public class WarehouseItemsFacade extends AbstractFacade<WarehouseItems> {
    @PersistenceContext(unitName = "com.wilcoxsoftware_mavenproject5_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public WarehouseItemsFacade() {
        super(WarehouseItems.class);
    }
    
}
