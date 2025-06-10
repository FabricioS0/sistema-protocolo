package com.fsGerenciamento.main.sistema_protocolo.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_anexos")
public class Anexo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;

    @Column(nullable = false)
    @Getter
    private String nomeArquivo;

    @Column(nullable = false)
    @Getter
    private String caminhoFisico; // Caminho completo no servidor

    @Column(nullable = false)
    @Getter
    private String tipo; // PDF, DOCX, JPG, etc.

    @Column(nullable = false)
    @Getter
    private LocalDateTime dataUpload;

    @ManyToOne
    @JoinColumn(name = "documento_id", nullable = false)
    @Getter @Setter
    private Documento documento;

    @PrePersist
    public void prePersist() {
        this.dataUpload = LocalDateTime.now();
    }
}
