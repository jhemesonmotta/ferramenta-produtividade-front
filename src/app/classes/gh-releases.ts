export interface GhRepoRelease {
    assets: Array<any>;
    assets_url: string;
    author: any;
    body: string;
    created_at: string;
    draft: boolean;
    html_url: string;
    id: number;
    name: string;
    node_id: string;
    prerelease: boolean;
    published_at: string;
    tag_name: string;
    tarball_url: string;
    target_commitish: string;
    upload_url: string;
    url: string;
    zipball_url: string;
}