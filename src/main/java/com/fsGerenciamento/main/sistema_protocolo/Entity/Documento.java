package com.fsGerenciamento.main.sistema_protocolo.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

import com.fsGerenciamento.main.sistema_protocolo.Enums.Setor;

@Entity
@Table(name = "tb_documentos")
@Getter @Setter
public class Documento {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @Column(length = 100, nullable = false, updatable = false)
    private String identificacao;


    @Column(length = 100, nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;


    @Column(name = "local_atual", nullable = false, length = 100)
    private String localAtual;

    @Column(name = "setor", nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private Setor setor;



    @Column(name = "data_entrada", nullable = false, updatable = false)
    private LocalDate dataEntrada;


    @Column(name = "data_saida")
    private LocalDate dataSaida;


    @Column(name = "data_ultima_modificacao", nullable = false)
    private LocalDateTime dataUltimaModificacao; // Tipo corrigido


    @ManyToOne
    @JoinColumn(name = "autor_id", nullable = false, updatable = false)
    private Funcionario autor;

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
