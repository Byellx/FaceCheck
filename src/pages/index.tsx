import React, { FormEvent, useState } from "react"

function Home() {
  interface Equipment {
    ip: string;
    username: string;
    password: string;
  }

  interface SearchParameters {
    searchType: string;
    searchValue: string;
  }

  interface UserData {
    CardName: string,
    UserID: string
  }

  const [equipment, setEquipment] = useState<Equipment>({
    ip: "",
    username: "",
    password: "",
  })

  const [searchParamenters, setSearchParameters] = useState<SearchParameters>({
    searchType: "NOME",
    searchValue: "",
  })

  const [users, setUsers] = useState<UserData[]>([])

  const [currentUserData, setCurrentUserData] = useState<UserData>()

  const [image, setImage] = useState<string>('')

  const auth: string = `Digest ${Buffer.from(
    `${equipment.username}:${equipment.password}`
  ).toString("base64")}`

  const sendEquipData = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()
    const url: string = `http://${equipment.ip}/cgi-bin/recordFinder.cgi?action=doSeekFind&name=AccessControlCard&count=1000`

    try {
      const response = await fetch("http://localhost:4000/sendEquipData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          auth: auth,
          username: equipment.username,
          password: equipment.password,
        }),
      })
        .then((res) => res.json())
        .then((dados) => {
          const users = dados.users.toString()
          const lines = users.split("\n")
          const count = parseInt(lines[0].split("=")[1])
          const users_array = []

          for (let i: number = 0; i < count; i++) {
            const record = {
              CardName: "",
              UserID: "",
            }

            const name = lines.find((line: string) => {
              if (line.includes(`records[${i}].CardName`)) {
                record.CardName = line.split("=")[1]
              }
            })

            const id = lines.find((line: string) => {
              if (line.includes(`records[${i}].UserID`)) {
                record.UserID = line.split("=")[1]
              }
            })

            users_array.push(record)
          }

          console.log(users_array)
          setUsers(users_array)
        })
    } catch (e) {
      console.error(`Erro: ${e}`)
    }
  }

  const seekForUser = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()
    setCurrentUserData({
      CardName: '',
      UserID: ''
    })
    if(searchParamenters.searchType == 'USER_ID'){
      searchFace(searchParamenters.searchValue)
      users.find((item: any) => {
        let id = item.UserID.trim()
        let busca = searchParamenters.searchValue.trim()

        if(id == busca){
          setCurrentUserData({
            CardName: item.CardName,
            UserID: item.UserID
          })
        }
      })
    }else if(searchParamenters.searchType == 'NOME'){
      users.find((item: any) => {
        let nome = item.CardName.toUpperCase().trim()
        let busca = searchParamenters.searchValue.toUpperCase().trim()
        if(nome == busca){
          searchFace(item.UserID)
          setCurrentUserData({
            CardName: item.CardName,
            UserID: item.UserID
          })
        }
      })
    }
  }

  const searchFace = async(id: any) => {
    const url: string = `http://${equipment.ip}/cgi-bin/AccessFace.cgi?action=list&UserIDList[0]=${id}`

      try{
        const response = await fetch('http://localhost:4000/getUserByID', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url,
            auth: auth,
            username: equipment.username,
            password: equipment.password,
          }),
        })
        .then((res)=> res.json())
        .then((data)=> setImage(data.image))

      }catch(e){
        console.error(`Erro na requisição: ${e}`)
      }
  }

  return (
    <>
    <main className="TelaPrincipal">
      <form className="Formulario">
        
        <div className="Logotipo"></div>
        
        <div className="Campos">
          <input
            value={equipment.ip}
            onChange={(e) => setEquipment({ ...equipment, ip: e.target.value })}
            placeholder="Endereço de IP do equipamento"
            className="Texto1"
          ></input>
        </div>

        <div className="Campos">
          <input
            value={equipment.username}
            onChange={(e) =>
              setEquipment({ ...equipment, username: e.target.value })
            }
            placeholder="Nome de usuário ADM do equipamento"
            className="Texto1"
          ></input>
        </div>

        <div className="Campos">
          <input
            value={equipment.password}
            onChange={(e) =>
              setEquipment({ ...equipment, password: e.target.value })
            }
            placeholder="Senha"
            className="Texto1"
          ></input>
        </div>

        <div className="Campos">
          <div className="Select">
            <select
              value={searchParamenters.searchType}
              onChange={(e) => {
                setSearchParameters({
                  ...searchParamenters,
                  searchType: e.target.value,
                });
              }}
            >
              <option value="NOME">NOME</option>
              <option value="USER_ID">USER ID</option>
            </select>
            <input
              value={searchParamenters.searchValue}
              onChange={(e) =>
                setSearchParameters({
                  ...searchParamenters,
                  searchValue: e.target.value,
                })
              }
              placeholder="Nome ou ID do usuário cadastrado"
            />
          </div>
        </div>

        <div className="Campos">
            <div className="Botoes">
              <button className="btn" type="submit" onClick={sendEquipData}>
                Enviar
              </button>
            </div>

          <div className="Botoes">
            <button className="btn" type="submit" onClick={seekForUser}>
              Buscar
            </button>
          </div>
        </div>
      </form>

      <div className="Resultados">
        <div>
          <h2>{currentUserData?.UserID} - {currentUserData?.CardName}</h2>
        </div>
        <img
          src={image}
          alt="SEM FOTO"
        />
      </div>
      </main>
    </>
  )
}

export default Home