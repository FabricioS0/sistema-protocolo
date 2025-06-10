package com.fsGerenciamento.main.sistema_protocolo.Dto;

import com.fsGerenciamento.main.sistema_protocolo.Enums.Setor;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;

@Getter @Setter
public class DocumentoRequest {@NotBlank(message = "Identificação é obrigatória")
    @NotBlank
private String identificacao;
    @NotBlank
    private String nome;
    @NotBlank
    private String descricao;
    @NotBlank
    private String localAtual;
    @NotNull
    private Setor setor;
}
