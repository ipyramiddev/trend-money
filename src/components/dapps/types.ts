// create a type for the dapp object

// export type Tag = {
//     value: string;

export type Dapp = {
    name: string;
    description: string;
    url: string;
    image: string | undefined;
    tags: string[] | undefined;
    github: string | undefined;

}
