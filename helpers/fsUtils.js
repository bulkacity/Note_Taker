const fsp = require(`fs/promises`);
// Promise version of fs.readFile


// const readFromFile = () => {
//    return fsp.readFile("Develop/db/db.json","utf-8")
// };
// const readFromFile = (json) => {
//     fs.readFile(`${__dirname}/../db/${json}`,"utf-8").then((result)=>{
//        console.log(result);
//         return(result);
//     }).catch((err) => console.error("There is an error"+ err));
// };


/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fsp.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
    console.log("attempt to read and append");
  fsp.readFile(file, "utf8").then(data => {
    
      const parsedData = JSON.parse(data);
      console.log("this is the parsed data");
      parsedData.push(content);
      writeToFile(file, parsedData);
    });
};


module.exports = { writeToFile, readAndAppend };
