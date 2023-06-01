const express = require("express")
const fs =require("fs")
const path =require("path")


const app = express()

app.get("/",(req,res)=>{
    res.send("Congrats you got it❤ ")
})
app.listen(9000,()=>console.log("Server started on localhost:9000"))

app.get('/create', (req, res) => {
    try {
        let date = new Date();
        let currentTimeStamp = date.toUTCString().slice(0, -7);
        let splited = currentTimeStamp.split(" ");
        console.log(`spilt output:${splited}`)
        let content = `The current Time with date: ${currentTimeStamp}`;
        console.log(content)
        fs.writeFileSync(path.join(__dirname, `/timestamps/dateTime${splited.join()}.txt`), content)
        res.status(200).json({ status: 'success', message: "file created successfully" })
    }
catch (error) {
        console.log('[exprss-/create] Error: ' + error)
        res.status(500).json({ status: 'error', message: "file creation failed" })

    }
})

app.get('/read', (req, res) => {
    try {
        const data = fs.readdirSync(path.join(__dirname, `/timestamps`))
        console.log(data)
        for (let x of data) {
            const file = fs.readFileSync(path.join(__dirname, `/timestamps/${x}`))
            console.log(file)
        }

        res.status(200).json({ status: 'success', message: "file fetched successfully" })
    } catch (error) {
        console.log('[exprss-/read] Error: ' + error)
        res.status(500).json({ status: 'error',message: "file creation failed" })

    }
})