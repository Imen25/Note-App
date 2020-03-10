const fs = require("fs");
const file = JSON.parse(fs.readFileSync("note.json"));

if (process.argv[2] === "list")
  file.length ? console.log(file) : console.log("Printing 0 note(s)");
else if (process.argv[2] === "add") {
  if (process.argv.length === 3)
    console.log(
      "apps.js add \n\n options: \n --help          Show help             [boolean]\n --title, -t     Title of note         [required] \n --body, -b      Body of note          [required]\n Missing required arguments : title, body"
    );
  else {
    console.log("Note created \n ---");
    fs.writeFileSync(
      "note.json",
      JSON.stringify([
        ...file,
        {
          title: process.argv[4],
          body: process.argv[6]
        }
      ])
    );
    console.log("Title: " + process.argv[4] + "\nBody: " + process.argv[6]);
  }
} else if (process.argv[2] === "read") {
  if (process.argv.length === 3)
    console.log(
      "app.js read\n\noptions: \n --help          Show help             [boolean]\n --title, -t     Title of note         [required]\n\n Missing required arguments : title"
    );
  else {
    const note = file.find(note => note.title == process.argv[4]);
    if (!note) console.log("Note not found");
    else {
      console.log("Note found\n ---\n ");
      console.log(note);
    }
  }
} else if (process.argv[2] === "remove") {
  if (process.argv.length === 3)
    console.log(
      "app.js remove\n\nOptions: \n --help          Show help                [boolean]\n --title, -t     Title of note            [required] \n\nMissing required arguments : title"
    );
  else {
    console.log("Note was removed");
    fs.writeFileSync(
      "note.json",
      JSON.stringify(file.filter(note => note.title != process.argv[4]))
    );
  }
}
