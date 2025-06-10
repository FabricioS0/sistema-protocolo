package com.fsGerenciamento.main.sistema_protocolo;

import com.fsGerenciamento.main.sistema_protocolo.Entity.Funcionario;
import com.fsGerenciamento.main.sistema_protocolo.Repository.FuncionarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

public class DataInitializer implements CommandLineRunner {

    private final FuncionarioRepository funcionarioRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(FuncionarioRepository funcionarioRepository,
                           PasswordEncoder passwordEncoder) {
        this.funcionarioRepository = funcionarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (funcionarioRepository.count() == 0) {
            Funcionario admin = new Funcionario();
            admin.setNome("Admin Licitação");
            admin.setCargo("Chefe de Setor");
            admin.setSetor(Funcionario.Setor.LICITACAO);
            admin.setSenha(passwordEncoder.encode("admin123"));
            admin.setChefeSetor(true);

            funcionarioRepository.save(admin);
        }
    }
}
