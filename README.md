# token-flow-service

This projects takes a part of the functionality of the `token-flow` package and exposes it through an `express` server. It exposes a basic command, `tokenflow` which takes the path to a `.yaml` catalog and a `port`. It creates an entity recognizer using the catalog, then routes incoming requests on the specified port to a tokenizer to return the recognized entities. **Note:** This service is exposing a small part of the `token-flow` functionality. 

## Usage
1. Install package: `npm install token-flow-service`
2. Run tokenflow command, pointing to a yaml catalog: `tokenflow --catalog "sample-catalog.yaml" --port 2008`
    If you don't have a catalog, use the sample-catalog.yaml in this repo for reference
3. Perform queries against your token-flow service by issuing GET requests against `http://localhost:[YOUR PORT]/getTokens/[YOUR QUERY]`