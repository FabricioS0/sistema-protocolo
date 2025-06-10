package com._fsGerenciamento.main.sistema_protocolo.Entity;

import com._fsGerenciamento.main.sistema_protocolo.Entity.Funcionario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "tb_documentos")
public class Documento {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Getter
    @Column(length = 100, nullable = false, updatable = false)
    private String identificacao;

    @Getter
    @Column(length = 100, nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Setter @Getter
    @Column(name = "local_atual", nullable = false, length = 100)
    private String localAtual;

    @Getter
    @Column(name = "data_entrada", nullable = false, updatable = false)
    private LocalDate dataEntrada;

    @Setter @Getter
    @Column(name = "data_saida")
    private LocalDate dataSaida;

    @Getter
    @Column(name = "data_ultima_modificacao", nullable = false)
    private LocalDateTime dataUltimaModificacao; // Tipo corrigido

    @Setter @Getter
    @ManyToOne
    @JoinColumn(name = "funcionario_id", nullable = false)
    private Funcionario responsavel;

    @OneToMany(mappedBy = "documento", cascade = CascadeType.ALL)
    private List<Movimentacao> movimentacoes = new ArrayList<>();

    @OneToMany(mappedBy = "documento", cascade = CascadeType.ALL)
    private List<Anexo> anexos = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        this.dataEntrada = LocalDate.now();
        this.dataUltimaModificacao = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.dataUltimaModificacao = LocalDateTime.now();
    }

    public void setIdentificacao(String identificacao) {
        if (this.identificacao == null) {
            this.identificacao = identificacao;
        }
    }

    @Override
    public boolean equals (Object o) {
        if (o == null || getClass () != o.getClass ()) return false;

        Documento documento = (Documento) o;
        return id == documento.id;
    }

    @Override
    public int hashCode () {
        return Long.hashCode (id);
    }
}
