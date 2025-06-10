package com.fsGerenciamento.main.sistema_protocolo.Repository;

import com.fsGerenciamento.main.sistema_protocolo.Entity.Documento;
import com.fsGerenciamento.main.sistema_protocolo.Enums.Setor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DocumentoRepository extends JpaRepository<Documento, Long> {

    // Verifica se a identificação já existe
    boolean existsByIdentificacao(String identificacao);

    // Busca documentos por setor
    List<Documento> findBySetor(Setor setor);

    // Busca documentos com filtros (para o frontend)
    @Query("SELECT d FROM Documento d WHERE " +
            "(:setor IS NULL OR d.setor = :setor) AND " +
            "(:searchTerm IS NULL OR LOWER(d.nome) LIKE LOWER(concat('%', :searchTerm,'%')) OR " +
            "LOWER(d.identificacao) LIKE LOWER(concat('%', :searchTerm,'%')))")
    List<Documento> findWithFilters(Setor setor, String searchTerm);


    List<Documento> findByResponsavelId(Long responsavelId);
}
