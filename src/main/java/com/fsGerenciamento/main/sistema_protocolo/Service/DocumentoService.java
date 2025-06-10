package com.fsGerenciamento.main.sistema_protocolo.Service;

import com.fsGerenciamento.main.sistema_protocolo.Entity.Documento;
import com.fsGerenciamento.main.sistema_protocolo.Entity.Funcionario;
import com.fsGerenciamento.main.sistema_protocolo.Enums.Setor;
import com.fsGerenciamento.main.sistema_protocolo.Dto.DocumentoResponse;
import com.fsGerenciamento.main.sistema_protocolo.exception.AcessoNegadoException;
import com.fsGerenciamento.main.sistema_protocolo.Repository.DocumentoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DocumentoService {

    private final DocumentoRepository documentoRepository;

    public DocumentoService(DocumentoRepository documentoRepository) {
        this.documentoRepository = documentoRepository;
    }

    @Transactional
    public DocumentoResponse criarDocumento(Documento documento, Funcionario autor) {
        // Validações
        if (autor.getSetor() != Setor.LICITACAO) {
            throw new AcessoNegadoException("Apenas o setor de Licitação pode criar documentos.");
        }

        if (documentoRepository.existsByIdentificacao(documento.getIdentificacao())) {
            throw new IllegalArgumentException("Identificação já está em uso.");
        }

        // Configura automaticamente
        documento.setAutor(autor);
        documento.setResponsavel(autor);
        documento.setSetor(autor.getSetor()); // Assume o setor do autor

        // Se localAtual não foi definido, usa um valor padrão
        if (documento.getLocalAtual() == null || documento.getLocalAtual().isEmpty()) {
            documento.setLocalAtual("Recepção Principal");
        }

        Documento saved = documentoRepository.save(documento);
        return convertToResponse(saved);
    }

    private DocumentoResponse convertToResponse(Documento documento) {
        return DocumentoResponse.fromEntity(documento);
    }


}
