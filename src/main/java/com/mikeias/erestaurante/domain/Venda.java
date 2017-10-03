package com.mikeias.erestaurante.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Venda.
 */
@Entity
@Table(name = "venda")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Venda implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "data", nullable = false)
    private ZonedDateTime data;

    @Column(name = "quantidade")
    private Long quantidade;

    @Column(name = "desconto")
    private Long desconto;

    @ManyToOne(optional = false)
    @NotNull
    private Produto produto;

    @ManyToOne(optional = false)
    @NotNull
    private Comanda comanda;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getData() {
        return data;
    }

    public Venda data(ZonedDateTime data) {
        this.data = data;
        return this;
    }

    public void setData(ZonedDateTime data) {
        this.data = data;
    }

    public Long getQuantidade() {
        return quantidade;
    }

    public Venda quantidade(Long quantidade) {
        this.quantidade = quantidade;
        return this;
    }

    public void setQuantidade(Long quantidade) {
        this.quantidade = quantidade;
    }

    public Long getDesconto() {
        return desconto;
    }

    public Venda desconto(Long desconto) {
        this.desconto = desconto;
        return this;
    }

    public void setDesconto(Long desconto) {
        this.desconto = desconto;
    }

    public Produto getProduto() {
        return produto;
    }

    public Venda produto(Produto produto) {
        this.produto = produto;
        return this;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Comanda getComanda() {
        return comanda;
    }

    public Venda comanda(Comanda comanda) {
        this.comanda = comanda;
        return this;
    }

    public void setComanda(Comanda comanda) {
        this.comanda = comanda;
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
        Venda venda = (Venda) o;
        if (venda.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), venda.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Venda{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            ", quantidade='" + getQuantidade() + "'" +
            ", desconto='" + getDesconto() + "'" +
            "}";
    }
}
