package com._fsGerenciamento.main.sistema_protocolo.Entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "tb_funcionarios")
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    @Column(nullable = false, length = 100)
    private String nome;

    @Getter
    @Setter
    @Column(nullable = false, length = 50)
    private String cargo;

    @Getter
    @Setter
    @Column(nullable = false, length = 50)
    private String setor;

    @Getter
    @Setter
    @Column(nullable = false)
    private String senha;

    @OneToMany(mappedBy = "responsavel")
    private List<Documento> documentos;

    @OneToMany(mappedBy = "funcionario")
    private List<Movimentacao> movimentacoes;
}
