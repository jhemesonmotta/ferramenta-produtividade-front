export interface ProjectEvaluation {
    nome: string;
    homePage: string;
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
