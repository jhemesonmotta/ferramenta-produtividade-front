export interface ProjectEvaluation {
    nome: string;
    homePage: string;
    qualidade: PageSpeedQualidade;
    frequenciaCommits: number;
    tamanhoComunidade: number;
    qtdContribuintes: number;
    diversidade: number;
    tamanho: number;
}

export interface PageSpeedQualidade {
    total: number;
    accesibilidade: number;
    melhoresPraticas: number;
    performance: number;
    pwa: number;
    seo: number;
}
