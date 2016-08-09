#!/usr/bin/env node

const program = require("commander");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const {
  buildClientSchema,
  introspectionQuery,
  printSchema,
} = require("graphql/utilities");

program
  .version("0.0.1")
  .arguments("<endpoint>")
  .option("-H, --headers [headers]", "Custom headers encoded as a JSON string, default: \"{}\"", "{}")
  .option("-o, --output [output]", "Output schema name, default: schema", "schema")
  .action(function(endpoint, options) {
      const schemaPath = path.join(__dirname, options.output);

      fetch(endpoint, {
        method: "POST",
        headers: JSON.parse(options.headers),
        body: JSON.stringify({"query": introspectionQuery}),
      })
      .then(res => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(schemaJSON => {
        fs.writeFileSync(
          `${schemaPath}.json`,
          JSON.stringify(schemaJSON, null, 2)
        );

        // Save user readable type system shorthand of schema
        const graphQLSchema = buildClientSchema(schemaJSON.data);
        fs.writeFileSync(
          `${schemaPath}.graphql`,
          printSchema(graphQLSchema)
        );
      }).then(() => {
        console.log(`Schema dumped in ${options.output}.json and ${options.output}.json.`);
      }).catch((res) => {
        return res.text();
      }
      ).then((err) => {
        if (err) {
          console.error("Received an error from the server:");
          console.error(err)
        }
      });
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
