package com.fsGerenciamento.main.sistema_protocolo.Service;

import com.fsGerenciamento.main.sistema_protocolo.Entity.Funcionario;
import com.fsGerenciamento.main.sistema_protocolo.Repository.FuncionarioRepository;
import com.fsGerenciamento.main.sistema_protocolo.exception.AcessoNegadoException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    private final FuncionarioRepository funcionarioRepository;
    
    public AuthService(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }
    
    public Funcionario validarToken(String token) {
        // Implementação simplificada para fins de demonstração
        // Em um sistema real, você validaria o token JWT e extrairia o ID do usuário
        
        if (token == null || token.isEmpty() || !token.startsWith("Bearer ")) {
            throw new AcessoNegadoException("Token inválido");
        }
        
        // Simulando a extração do ID do usuário do token
        // Em um sistema real, você decodificaria o token JWT
        Long userId = 1L; // ID fixo para demonstração
        
        return funcionarioRepository.findById(userId)
                .orElseThrow(() -> new AcessoNegadoException("Usuário não encontrado"));
    }
}