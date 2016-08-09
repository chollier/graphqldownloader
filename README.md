# Install Guide

```
npm install -g graphqldownloader
```

# Usage

```
  Usage: graphqldownloader [options] <endpoint>

  Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -H, --headers [headers]  Custom headers encoded as a JSON string, default: "{}"
    -o, --output [output]    Output schema name, default: schema

```

# Example

```
$ graphqldownloader \
-H "{ \"Accept\": \"application/json\", \"Content-Type\": \"application/json\", \"Authorization\": \"Bearer YourFancyAuthToken\" }" \
http://localhost:3000/graphql/queries
Schema dumped in schema.json and schema.json.
```
