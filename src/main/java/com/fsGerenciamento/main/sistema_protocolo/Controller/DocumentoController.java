package com.fsGerenciamento.main.sistema_protocolo.Controller;

import com.fsGerenciamento.main.sistema_protocolo.Entity.Documento;
import com.fsGerenciamento.main.sistema_protocolo.Entity.Funcionario;
import com.fsGerenciamento.main.sistema_protocolo.Dto.DocumentoResponse;
import com.fsGerenciamento.main.sistema_protocolo.Service.DocumentoService;
import com.fsGerenciamento.main.sistema_protocolo.Service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/documentos")
public class DocumentoController {

    private final DocumentoService documentoService;
    private final AuthService authService;

    public DocumentoController(DocumentoService documentoService, AuthService authService) {
        this.documentoService = documentoService;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<DocumentoResponse> criarDocumento(
            @RequestBody Documento documento,
            @RequestHeader("Authorization") String token
    ) {
        Funcionario autor = authService.validarToken(token);
        DocumentoResponse response = documentoService.criarDocumento(documento, autor);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
