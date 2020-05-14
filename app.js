const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath=path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team =[]
const generate=()=>{
    fs.writeFile(outputPath, render(team), err=>{
        if (err) throw err;
        console.log('Team successfully created!!')
    })
}

const makeEngineer =()=>{
    inquirer.prompt([
        {
            type: "input",
            name: "eName",
            message: "What is the Engineers name?"
        },
        {
            type: "input",
            name: "eId",
            message: "What is the Engineers ID?"
        },
        {
            type: "input",
            name: "eEmail",
            message: "What is the Engineers email?"
        },
        {
            type: "input",
            name: "eGit",
            message: "What is the Engineers github username?"
        }
    ]).then( answers=>{
        const newEngineer = new Engineer(answers.eName, answers.eId, answers.eEmail, answers.eGit)
        team.push(newEngineer)
        whatNext()
    })
}
const makeIntern = ()=>{
inquirer.prompt([
    {
        type: "input",
        name: "iName",
        message: "What is the interns name?"
    },
    {
        type: "input",
        name: "iId",
        message: "What is the interns ID?"
    },
    {
        type: "input",
        name: "iEmail",
        message: "What is the interns email?"
    },
    {
        type: "input",
        name: "iSchool",
        message: "What is the interns school name?"
    }
]).then( answers=>{
    const newIntern = new Intern(answers.iName, answers.iId, answers.iEmail, answers.iSchool)
    team.push(newIntern)
    whatNext()
})}
const whatNext=()=>{
    inquirer.prompt([{
        type: "list",
        name: "whatToDo",
        message: "What would you like to do next?",
        choices:[
            "Engineer",
            "Intern",
            "Generate Organization Chart"
        ]
    }]).then(answers=>{
        switch (answers.whatToDo) {
            case "Engineer":
                makeEngineer()
                break;
            case "Intern":
                makeIntern()
                break;
            default:
                generate()
                break;
        }
    })
}

const start=()=>{
    inquirer.prompt([
        {
            type: "input",
            name: "mName",
            message: "What is the managers name?"
        },
        {
            type: "input",
            name: "mId",
            message: "What is the managers ID?"
        },
        {
            type: "input",
            name: "mEmail",
            message: "What is the managers email?"
        },
        {
            type: "input",
            name: "mPhone",
            message: "What is the managers phone number?"
        }
    ]).then( answers=>{
        const man = new Manager(answers.mName, answers.mId, answers.mEmail, answers.mPhone)
        team.push(man)
        whatNext()
    })}
start()