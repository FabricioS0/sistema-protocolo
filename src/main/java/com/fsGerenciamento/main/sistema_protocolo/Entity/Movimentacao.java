package com._fsGerenciamento.main.sistema_protocolo.Entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_movimentacao")
public class Movimentacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "documento_id", nullable = false)
    private Documento documento;

    @ManyToOne
    @JoinColumn(name = "funcionario_id", nullable = false)
    private Funcionario funcionario;

    @Column(name = "local_anterior", nullable = false, length = 100)
    private String localAnterior;

    @Column(name = "local_novo", nullable = false, length = 100)
    private String localNovo;

    @Column(name = "data_movimentacao", nullable = false)
    private LocalDateTime dataMovimentacao;

    @Column(columnDefinition = "TEXT")
    private String observacao;

    @PrePersist
    public void prePersist() {
        this.dataMovimentacao = LocalDateTime.now();
    }
}

