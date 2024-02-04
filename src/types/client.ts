type ClientOptions = {
    baseUrl: string;
    tokens?: Tokens;
};

type Tokens = {
    normal: string;
    comptage?: string;
};

export { Tokens, ClientOptions };