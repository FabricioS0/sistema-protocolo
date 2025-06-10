package com.fsGerenciamento.main.sistema_protocolo.Repository;

import com.fsGerenciamento.main.sistema_protocolo.Entity.Funcionario;
import com.fsGerenciamento.main.sistema_protocolo.Enums.Setor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    boolean existsBySetorAndChefeSetorAndIdNot(
            Setor setor,
            boolean chefeSetor,
            Long id
    );
}
