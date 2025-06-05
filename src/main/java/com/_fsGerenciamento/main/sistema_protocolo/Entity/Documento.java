package com._fsGerenciamento.main.sistema_protocolo.Entity;

import jakarta.persistence.*;


@Entity
@Table(name = "tb_documentos")
public class Documento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(columnDefinition = "VARCHAR")
    private String identificacao;
    @Column(columnDefinition = "VARCHAR")
    private String name;
    @Column(columnDefinition = "TEXT")
    private String descricao;
}
