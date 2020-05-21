export interface GhRepoCommit {
    author: any; // oq conta é oq tem dentro de commit
    comments_url: string; // desconsidera
    commit: {
        author: {
            date: string,
            email: string,
            name: string
        },
        committer: {
            date: string,
            email: string,
            name: string
        },
        message: string,
        tree: any,
        url: string,
        verification: any};
    committer: any; // oq conta é oq tem dentro de commit
    html_url: string;
    node_id: string;
    parents: any;
    sha: string;
    url: string;
}