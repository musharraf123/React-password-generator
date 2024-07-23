import { useCallback, useEffect, useState , useRef } from 'react'



function App() {
  const [length , setLength] = useState(8)
  const [numAllowed, setnumAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const[password, setpassword] = useState("")

// using use ref hook
  const passhookref =useRef(null)


  const passwordGeneretor = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str += "1234567890" 
    if (charAllowed) str += "!@#$%^&*()_+{}[]" 

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setpassword(pass)
    
  },[length,numAllowed,charAllowed,setpassword])

  const copytoclipboard = useCallback(()=>{
    passhookref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])




  useEffect(()=>{
    passwordGeneretor()
  },[length,numAllowed,charAllowed,passwordGeneretor])





  return (
    <>
     
     <div className='w-full text-3xl max-w-2xl mx-auto rounded-lg px-4 py-5 my-8 text-orange-400 bg-gray-900 shadow-md'>
     <h1 className='my-3 text-center text-white  '>password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
        value={password} 
        className='outline-none py-1 px-3 w-full'
        placeholder='password1'
        readOnly
        ref={passhookref}
        />
        <button onClick={copytoclipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-20'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={50}
          value={length}
          className='cursor-pointer '
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label >length:{length}</label>
        </div>
        <div flex items-center gap-x-1 >
          <input 
          type="checkbox"
          defaultChecked={numAllowed}
          id='numberInput'
          onChange={()=>{setnumAllowed((prev)=> !prev)}}
           />
           <label >number</label>
        </div>
        <div flex items-center gap-x-1>
          <input type="checkbox" 
          defaultChecked={charAllowed}
          id='changeinput'
          onChange={()=>{setcharAllowed((prev)=> !prev)}}
          />
          <label htmlFor="changeinput">character</label>
          
        </div>
      </div>
     </div>
    </>
  )
}

export default App
