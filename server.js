const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function (req, res) {
    const about = {
        avatar_url: "https://avatars3.githubusercontent.com/u/27421027?s=460&u=12041fedc13d137e50260ca601bbd704e5e6f47a&v=4",
        name: "Elirzer Castro",
        role: "Development",
        description: 'Analista Implantador e Desenvolvedor de Sistemas <a href="#" target="_blank">Github</a>',
        links: [
            { name: "Github", url: "https://github.com/maykbrito/" },
            { name: "Twitter", url: "https://twitter.com/maykbrito/" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/maykbrito/" }
        ]
    }


    return res.render("about", { about })
})
server.get("/portfolio", function (req, res) {
    return res.render("portfolio", { items: videos })
})

server.get("/video", function (req, res) {
    const id = req.query.id

    const video = videos.find(function (video) {
        if (video.id == id) {
            return true
        }
    })
    if (!video) {
        return res.send("Video not found!")
    }
    return res.render("video", { item: video })
})

server.listen(5000, function () {
    console.log("Server is running")
})