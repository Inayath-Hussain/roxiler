import { useState } from "react"
import Table from "./Components/Table"

const monthOptions = Array(12).fill(1).map((value, index) => value + index);

const monthDisplayText = {
  1: "January",
  2: "Februray",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
}



function App() {

  const [month, setMonth] = useState(1);

  const [search, setSearch] = useState("");

  return (

    <div className="flex flex-col justify-center items-center h-screen w-screen">


      {/* month and search */}
      <div className="justify-self-stretch flex flex-row justify-around items-center self-stretch">


        <input type="text" className="border-[1px] border-black py-2 px-4 rounded-2xl"
          value={search} onChange={e => setSearch(e.target.value)} />

        <select className="border-[1px] border-black" onChange={e => setMonth(Number(e.target.value))}>
          {monthOptions.map(m => (
            <option key={m} value={m}>{monthDisplayText[m as keyof typeof monthDisplayText]}</option>
          ))}
        </select>


      </div>




      <Table month={month} />

    </div>
  )
}

export default App
