export interface ProjectEvaluation {
    id: number;
    nome: string;
    homePage: string;
    linguagemProgramacao: string;
    qualidade: PageSpeedQualidade;
    diversidade: number;
    frequenciaCommits: number;
    tamanhoComunidade: number;
    qtdContribuintes: number;
    qtdCommits: number;
    correlacaoTamanho: number;
}

export interface PageSpeedQualidade {
    total: number;
    accesibilidade: number;
    melhoresPraticas: number;
    performance: number;
    pwa: number;
    seo: number;
}

export interface ProjectEvaluationCsv {
    id: number;
    nome: string;
    homePage: string;
    linguagemProgramacao: string;
    diversidade: string;
    frequenciaCommits: string;
    tamanhoComunidade: string;
    qtdContribuintes: string;
    qtdCommits: string;
    correlacaoTamanho: string;
    qualidade_total: string;
    qualidade_accesibilidade: string;
    qualidade_melhoresPraticas: string;
    qualidade_performance: string;
    qualidade_pwa: string;
    qualidade_seo: string;
}
