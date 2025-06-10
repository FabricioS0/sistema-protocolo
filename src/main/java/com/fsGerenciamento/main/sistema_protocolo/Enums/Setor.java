package com.fsGerenciamento.main.sistema_protocolo.Enums;

public enum Setor {
    LICITACAO("Licitação"),
    CONTABILIDADE("Contabilidade"),
    FINANCEIRO("Financeiro"),
    PROCURADORIA("Procuradoria"),
    CONTROLE_INTERNO("Controle Interno");

    private final String descricao;

    Setor(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
