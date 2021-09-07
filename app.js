const yargs = require("yargs");
const json = require("./1-json.json");
const fs = require("fs");
let notes = [];

function storeData(data) {
  return fs.writeFileSync("1-json.json", JSON.stringify(data), {
    encoding: "utf-8",
  });
}

function readData() {
  const dataBuffer = fs.readFileSync("1-json.json");
  const dataJSON = dataBuffer.toString();
  const data = JSON.parse(dataJSON);
  return data;
}
//add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "note title",
      type: "string",
    },
    body: {
      describe: "note body",
      type: "string",
    },
  },
  handler: (argv) => {
    let data = readData();
    notes = data;
    notes.push({
      title: argv.title,
      body: argv.body,
    });
    storeData(notes);
    readData();
  },
});
//remove Command
yargs.command({
  command: "remove",
  describe: "Remove a Note",
  builder: {
    title: {
      describe: "note title to be removed",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    notes = readData();
    console.log(notes);
    console.log(argv.title);

    notes = notes.filter((item) => item.title != argv.title);
    storeData(notes);
    console.log(readData());
  },
});
//list Command
yargs.command({
  command: "list",
  describe: "Lists all Notes",
  handler: () => {
    console.log(readData());
  },
});
//Read Command
yargs.command({
  command: "read",
  describe: "Read a Note",
  builder: {
    title: {
      describe: "Title you wamt to read",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argsv) => {
    notes = readData();
    notes.map(item=>{
        if(item.title === argsv.title){
            console.log(item.body)
        }
    })
  },
});
yargs.parse();
