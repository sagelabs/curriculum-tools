let ContentReader = require('./contentReader');
let yaml = require("js-yaml");

module.exports = class Workout extends ContentReader {
  constructor(text){
    super(text)
    this.insights = [];
    this.section = null;
    this.course = null;
    this.topic = null;
    this.practiceQuestions = [];
    this.revisionQuestions = [];
    this.parent = null;
    this.slug = null;
    this.parse(text);
  }

  parse() {
    yaml.safeLoadAll(this.rawText.split("---")[0], (doc)=>{
      for (var prop in doc) {
        this[prop] = doc[prop];
      }
    })
  }

  addInsight() {

  }

  render() {
    //this should produce the readme.md file that defines the workout
  }
}