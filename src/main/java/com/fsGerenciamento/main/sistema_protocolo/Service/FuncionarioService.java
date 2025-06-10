package com.fsGerenciamento.main.sistema_protocolo.Service;

import com.fsGerenciamento.main.sistema_protocolo.Entity.Funcionario;
import com.fsGerenciamento.main.sistema_protocolo.Repository.FuncionarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FuncionarioService {
    private final FuncionarioRepository funcionarioRepository;
    private final PasswordEncoder passwordEncoder;

    public FuncionarioService(FuncionarioRepository funcionarioRepository,
                              PasswordEncoder passwordEncoder) {
        this.funcionarioRepository = funcionarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Funcionario criarFuncionario(Funcionario funcionario) {
        validarChefiaUnica(funcionario);
        funcionario.setSenha(passwordEncoder.encode(funcionario.getSenha()));
        return funcionarioRepository.save(funcionario);
    }

    @Transactional
    public Funcionario atualizarFuncionario(Funcionario funcionario) {
        validarChefiaUnica(funcionario);
        return funcionarioRepository.save(funcionario);
    }

    private void validarChefiaUnica(Funcionario funcionario) {
        if (funcionario.getChefeSetor()) {
            boolean existeChefe = funcionarioRepository
                    .existsBySetorAndChefeSetorAndIdNot(
                            funcionario.getSetor(),
                            true,
                            funcionario.getId() != null ? funcionario.getId() : 0L
                    );

            if (existeChefe) {
                throw new IllegalStateException(
                        "Já existe um chefe no setor " + funcionario.getSetor().getDescricao()
                );
            }
        }
    }
}
