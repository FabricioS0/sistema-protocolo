package com._fsGerenciamento.main.sistema_protocolo.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


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

    @Column(length = 100, nullable = false)
    private String name;

    @Setter
    @Getter
    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Getter
    @Column(name = "data_entrada", nullable = false, updatable = false)
    private LocalDate dataEntrada;

    @Setter
    @Getter
    @Column(name = "data_saida")
    private LocalDate dataSaida;

    @Getter
    @Column(name = "data_ultima")
    private LocalDate dataUltima;

    @Setter
    @Getter
    @Column(name = "status_localizacao", length = 150)
    private String statusLocalizacao;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "responsavel_id", nullable = false)
    private Funcionario responsavel;

    @PrePersist
    public void aoCriar(){
        this.dataEntrada = LocalDate.now();
    }
    @PreUpdate
    public void aoAtualizar() {
        this.dataUltima = LocalDate.now();
    }


    public void setIdentificacao (String identificacao) {
        if (this.identificacao == null){
            this.identificacao = identificacao;
        }
    }

    public String getNome () {
        return name;
    }

    public void setNome (String name) {
        this.name = name;
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
