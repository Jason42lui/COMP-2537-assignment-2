const express = require('express')
const app = express()
app.set('view engine', 'ejs');

app.listen(process.env.PORT || 5000, function (err) {
    if (err) console.log(err);
})


const https = require('https');

app.get('/profile/:id', function (req, res) {

    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`

    data = ''
    https.get(url, function (https_res) {
        https_res.on("data", function (chunk) {
            data += chunk
        })

        https_res.on("end", function () {
            data = JSON.parse(data)

            tmp = data.stats.filter((obj_) => {
                return obj_.stat.name == "hp"
            }).map((obj2) => {
                return obj2.base_stat
            })

            tmp_2 = data.stats.filter((obj_) => {
                return obj_.stat.name == "attack"
            }).map((obj2) => {
                return obj2.base_stat
            })

            tmp_3 = data.stats.filter((obj_) => {
                return obj_.stat.name == "defense"
            }).map((obj2) => {
                return obj2.base_stat
            })

            tmp_4 = data.stats.filter((obj_) => {
                return obj_.stat.name == "speed"
            }).map((obj2) => {
                return obj2.base_stat
            })

            // console.log(tmp)

            res.render("profile.ejs", {
                "id": req.params.id,
                "name": data.name,
                "height": data.height,
                "weight": data.weight,
                "type": data.types[0].type.name,
                "hp" : tmp[0],
                "attack": tmp_2[0],
                "defense": tmp_3[0],
                "speed": tmp_4[0]
            });
        })
    });
})


app.use(express.static('./public'));