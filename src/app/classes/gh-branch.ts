export interface GhRepoBranch {
    name: string;
    commit: {
        sha: string,
        url: string
    };
}
