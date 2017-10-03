package com.mikeias.erestaurante.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Imposto.
 */
@Entity
@Table(name = "imposto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Imposto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "iv_tot_trib")
    private Long ivTotTrib;

    @Column(name = "i_icms")
    private Long iICMS;

    @Column(name = "i_ipi")
    private Long iIPI;

    @Column(name = "i_ii")
    private Long iII;

    @Column(name = "i_issqn")
    private Long iISSQN;

    @Column(name = "i_pis")
    private Long iPIS;

    @Column(name = "i_pisst")
    private Long iPISST;

    @Column(name = "i_cofins")
    private Long iCOFINS;

    @Column(name = "i_cofinsst")
    private Long iCOFINSST;

    @Column(name = "i_icmsuf_dest")
    private Long iICMSUFDest;

    @Column(name = "ioutros")
    private String ioutros;

    @Column(name = "configurar")
    private String configurar;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public Imposto descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getIvTotTrib() {
        return ivTotTrib;
    }

    public Imposto ivTotTrib(Long ivTotTrib) {
        this.ivTotTrib = ivTotTrib;
        return this;
    }

    public void setIvTotTrib(Long ivTotTrib) {
        this.ivTotTrib = ivTotTrib;
    }

    public Long getiICMS() {
        return iICMS;
    }

    public Imposto iICMS(Long iICMS) {
        this.iICMS = iICMS;
        return this;
    }

    public void setiICMS(Long iICMS) {
        this.iICMS = iICMS;
    }

    public Long getiIPI() {
        return iIPI;
    }

    public Imposto iIPI(Long iIPI) {
        this.iIPI = iIPI;
        return this;
    }

    public void setiIPI(Long iIPI) {
        this.iIPI = iIPI;
    }

    public Long getiII() {
        return iII;
    }

    public Imposto iII(Long iII) {
        this.iII = iII;
        return this;
    }

    public void setiII(Long iII) {
        this.iII = iII;
    }

    public Long getiISSQN() {
        return iISSQN;
    }

    public Imposto iISSQN(Long iISSQN) {
        this.iISSQN = iISSQN;
        return this;
    }

    public void setiISSQN(Long iISSQN) {
        this.iISSQN = iISSQN;
    }

    public Long getiPIS() {
        return iPIS;
    }

    public Imposto iPIS(Long iPIS) {
        this.iPIS = iPIS;
        return this;
    }

    public void setiPIS(Long iPIS) {
        this.iPIS = iPIS;
    }

    public Long getiPISST() {
        return iPISST;
    }

    public Imposto iPISST(Long iPISST) {
        this.iPISST = iPISST;
        return this;
    }

    public void setiPISST(Long iPISST) {
        this.iPISST = iPISST;
    }

    public Long getiCOFINS() {
        return iCOFINS;
    }

    public Imposto iCOFINS(Long iCOFINS) {
        this.iCOFINS = iCOFINS;
        return this;
    }

    public void setiCOFINS(Long iCOFINS) {
        this.iCOFINS = iCOFINS;
    }

    public Long getiCOFINSST() {
        return iCOFINSST;
    }

    public Imposto iCOFINSST(Long iCOFINSST) {
        this.iCOFINSST = iCOFINSST;
        return this;
    }

    public void setiCOFINSST(Long iCOFINSST) {
        this.iCOFINSST = iCOFINSST;
    }

    public Long getiICMSUFDest() {
        return iICMSUFDest;
    }

    public Imposto iICMSUFDest(Long iICMSUFDest) {
        this.iICMSUFDest = iICMSUFDest;
        return this;
    }

    public void setiICMSUFDest(Long iICMSUFDest) {
        this.iICMSUFDest = iICMSUFDest;
    }

    public String getIoutros() {
        return ioutros;
    }

    public Imposto ioutros(String ioutros) {
        this.ioutros = ioutros;
        return this;
    }

    public void setIoutros(String ioutros) {
        this.ioutros = ioutros;
    }

    public String getConfigurar() {
        return configurar;
    }

    public Imposto configurar(String configurar) {
        this.configurar = configurar;
        return this;
    }

    public void setConfigurar(String configurar) {
        this.configurar = configurar;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Imposto imposto = (Imposto) o;
        if (imposto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), imposto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Imposto{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", ivTotTrib='" + getIvTotTrib() + "'" +
            ", iICMS='" + getiICMS() + "'" +
            ", iIPI='" + getiIPI() + "'" +
            ", iII='" + getiII() + "'" +
            ", iISSQN='" + getiISSQN() + "'" +
            ", iPIS='" + getiPIS() + "'" +
            ", iPISST='" + getiPISST() + "'" +
            ", iCOFINS='" + getiCOFINS() + "'" +
            ", iCOFINSST='" + getiCOFINSST() + "'" +
            ", iICMSUFDest='" + getiICMSUFDest() + "'" +
            ", ioutros='" + getIoutros() + "'" +
            ", configurar='" + getConfigurar() + "'" +
            "}";
    }
}
