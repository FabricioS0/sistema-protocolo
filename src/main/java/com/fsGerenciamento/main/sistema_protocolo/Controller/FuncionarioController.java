package com.fsGerenciamento.main.sistema_protocolo.Controller;

import com.fsGerenciamento.main.sistema_protocolo.Entity.Funcionario;
import com.fsGerenciamento.main.sistema_protocolo.Service.FuncionarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/funcionarios")
public class FuncionarioController {
    private final FuncionarioService funcionarioService;

    public FuncionarioController(FuncionarioService funcionarioService) {
        this.funcionarioService = funcionarioService;
    }

    @PostMapping
    public ResponseEntity<Funcionario> criar(@RequestBody Funcionario funcionario) {
        Funcionario salvo = funcionarioService.criarFuncionario(funcionario);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> atualizar(
            @PathVariable Long id,
            @RequestBody Funcionario funcionario) {
        funcionario.setId(id);
        Funcionario atualizado = funcionarioService.atualizarFuncionario(funcionario);
        return ResponseEntity.ok(atualizado);
    }
}
