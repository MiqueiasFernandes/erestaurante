package com.mikeias.erestaurante.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Cargo.
 */
@Entity
@Table(name = "cargo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cargo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "salario")
    private Long salario;

    @Column(name = "comissao")
    private Long comissao;

    @Lob
    @Column(name = "permissao")
    private String permissao;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Cargo nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getSalario() {
        return salario;
    }

    public Cargo salario(Long salario) {
        this.salario = salario;
        return this;
    }

    public void setSalario(Long salario) {
        this.salario = salario;
    }

    public Long getComissao() {
        return comissao;
    }

    public Cargo comissao(Long comissao) {
        this.comissao = comissao;
        return this;
    }

    public void setComissao(Long comissao) {
        this.comissao = comissao;
    }

    public String getPermissao() {
        return permissao;
    }

    public Cargo permissao(String permissao) {
        this.permissao = permissao;
        return this;
    }

    public void setPermissao(String permissao) {
        this.permissao = permissao;
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
        Cargo cargo = (Cargo) o;
        if (cargo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cargo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cargo{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", salario='" + getSalario() + "'" +
            ", comissao='" + getComissao() + "'" +
            ", permissao='" + getPermissao() + "'" +
            "}";
    }
}
