import request from "request"
import cors from "cors"
import express from "express"

const app = express()

app.use(express.json())
app.use(cors())

app.post("/sendEquipData", async (req, res) => {
  const url = req.body.url
  const auth = req.body.auth
  const username = req.body.username
  const password = req.body.password

  const users_data = await getUsers(url, auth, username, password)
  res.status(200).json({
    users: users_data,
  })
})

app.post("/getUserByID", async(req, res)=> {
    const url = req.body.url
    const auth = req.body.auth
    const username = req.body.username
    const password = req.body.password

    const userFace = await getFace(url, auth, username, password)
    res.status(200).json({
        image: userFace,
    })
})

const PORT = 4000

app.listen(PORT, () => console.log("O serviço foi iniciado na porta 4000"))

const getUsers = (url, auth, username, password) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: url,
      headers: {
        Authorization: auth,
      },
      auth: {
        username: username,
        password: password,
        sendImmediately: false,
      },
    }

    request(options, function (error, response, body) {
      if (error) {
        console.error(`Erro: ${error}`)
        reject(error)
      } else {
        const users = body
        resolve(users)
      }
    })
  })
}

const getFace = (url, auth, user, password) => {
    return new Promise((resolve, reject) => {
      const options = {
        url: url,
        headers: {
          Authorization: auth,
        },
        auth: {
          username: user,
          password: password,
          sendImmediately: false,
        },
      }
  
      request(options, function (error, response, body) {
        if (error) {
          console.error(`Erro: ${error}`)
          reject(error)
        } else {
          const dados = extrairPhotoData(body)
          resolve(dados)
        }
      })
    })
  }
  
  function extrairPhotoData(resposta) {
    const photoData1 = resposta.split("\n");
    const photoData = photoData1[0].split("FaceDataList[0].PhotoData[0]=")
  
    if (photoData && photoData.length > 1) {
      const stringDaImagem = "data:image/png;base64," + photoData[1]
      return stringDaImagem
    }
  
    return null
  }