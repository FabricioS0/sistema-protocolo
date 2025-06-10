package com.fsGerenciamento.main.sistema_protocolo.Entity;

import com.fsGerenciamento.main.sistema_protocolo.Enums.Setor;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_funcionarios")
@Getter @Setter
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 50)
    private String cargo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Setor setor;

    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String senha;

    @Column(nullable = false)
    private Boolean chefeSetor = false;

    @OneToMany(mappedBy = "responsavel", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Documento> documentos = new ArrayList<>();

    @OneToMany(mappedBy = "funcionario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Movimentacao> movimentacoes = new ArrayList<>();

    @Override
    public String toString() {
        return String.format(
                "Funcionario[id=%d, nome='%s', setor=%s, chefe=%b]",
                id, nome, setor.name(), chefeSetor
        );
    }
}