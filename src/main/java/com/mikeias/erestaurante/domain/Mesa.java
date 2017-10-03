package com.mikeias.erestaurante.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Mesa.
 */
@Entity
@Table(name = "mesa")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Mesa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "jhi_local")
    private Integer local;

    @Column(name = "descricao")
    private String descricao;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public Mesa codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Integer getLocal() {
        return local;
    }

    public Mesa local(Integer local) {
        this.local = local;
        return this;
    }

    public void setLocal(Integer local) {
        this.local = local;
    }

    public String getDescricao() {
        return descricao;
    }

    public Mesa descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
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
        Mesa mesa = (Mesa) o;
        if (mesa.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mesa.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mesa{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", local='" + getLocal() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
