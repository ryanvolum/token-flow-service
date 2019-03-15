import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Item, PatternRecognizer, Tokenizer, Token, WORD } from 'token-flow';
import { CreateEntityRecognizer } from './entityRecognizer';

export class TokenFlowService {
    private server: express.Express;
    private port: number;
    private entityRecognizer: PatternRecognizer<Item>;

    constructor(file: string, port: number) {
        this.port = port;
        this.entityRecognizer = CreateEntityRecognizer(file, new Set<string>());
        this.createServer();
        this.createRoute();
    }

    private createServer = () => {
        this.server = express();
        this.server.use(bodyParser.urlencoded({ extended: false }));
    }

    private createRoute = () => {
        this.server.get('/getTokens/:query', (req, res) => {
            res.status(200).send(this.tokenize(req.params.query));
        })
    }

    public tokenize = (query: string): Token[] => {
        const input = query.split(/\s+/).map(term => ({ type: WORD, text: term }));
        const tokens = this.entityRecognizer.apply(input);
        return tokens;
    }

    public listen = () => {
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
            console.log(`Perform queries against tokenflow by issuing GET requests against http://localhost:${this.port}/getTokens/<QUERY>`);
        })
    }

}