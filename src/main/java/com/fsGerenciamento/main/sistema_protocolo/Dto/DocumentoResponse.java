package com.fsGerenciamento.main.sistema_protocolo.Dto;

import com.fsGerenciamento.main.sistema_protocolo.Entity.*;
import com.fsGerenciamento.main.sistema_protocolo.Enums.Setor;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter @Setter
public class DocumentoResponse {

        private Long id;
        private String identificacao;
        private String nome;
        private String descricao;
        private String localAtual;
        private Setor setor;
        private LocalDate dataEntrada;
        private LocalDateTime dataUltimaModificacao;
        private String autorNome;
        private String responsavelNome;
        private String setorDescricao; // Descrição formatada (ex: "Licitação")

        public static DocumentoResponse fromEntity(Documento documento) {
            DocumentoResponse response = new DocumentoResponse();
            response.setId(documento.getId());
            response.setIdentificacao(documento.getIdentificacao());
            response.setNome(documento.getNome());
            response.setDescricao(documento.getDescricao());
            response.setLocalAtual(documento.getLocalAtual());
            response.setSetor(documento.getSetor());
            response.setSetorDescricao(documento.getSetor().getDescricao());
            response.setDataEntrada(documento.getDataEntrada());
            response.setDataUltimaModificacao(documento.getDataUltimaModificacao());
            response.setAutorNome(documento.getAutor().getNome());
            response.setResponsavelNome(documento.getResponsavel().getNome());
            return response;
        }
}
