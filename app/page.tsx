"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

const WAIT_BETWEEN_CHANGE = 1500;

export default function Home() {

  const [ fromLanguage, setFromLanguage ] = useState('auto')
  const [ toLanguage, setToLanguage ] = useState([ 'english', 'deutsch', 'spanish', 'français' ])
  const [ text, setText ] = useState('')
  const [ response, setResponse ] = useState({
    spanish: {
      text: ''
    },
    english: {
      text: ''
    },
    deutsch: {
      text: ''
    },
    français: {
      text: ''
    }
  })

  const fetchTranslate = async () => {
    setResponse({
      spanish: {
        text: ''
      },
      english: {
        text: ''
      },
      deutsch: {
        text: ''
      },
      français: {
        text: ''
      }
    })
    if (!text) return
      
    toLanguage.forEach(async language => {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fromLanguage, language, text })
      })
  
      const data = await res.json();
  
      console.log(data);
  
      const mapResponse = { ...response }
      mapResponse[language] = data;
  
      console.log(mapResponse, language);
  
      setResponse(mapResponse)
    })
    
  }

  const updateToLanguage = (language: string) => {
    const index = toLanguage.findIndex(l => l === language);
    if (index !== -1) {
      setToLanguage(toLanguage.filter(l => l !== language))
    } else {
      setToLanguage([...toLanguage, language])
    }
    
  }

  return (
    <>
      <form className="flex flex-col gap-4 m-4 bg-gray-100 p-4 rounded" onSubmit={e => e.preventDefault()}>

        <div className="flex flex-row gap-4">
          <label className="inline-flex items-center cursor-pointer" >
            <input type="checkbox" value="español" className="sr-only peer" defaultChecked onChange={e => updateToLanguage(e.target.value)}/>
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Español</span>
          </label>

          <label className="inline-flex items-center cursor-pointer" >
            <input type="checkbox" value="deutsch" className="sr-only peer" defaultChecked onChange={e => updateToLanguage(e.target.value)}/>
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Alemán</span>
          </label>

          <label className="inline-flex items-center cursor-pointer" >
            <input type="checkbox" value="français" className="sr-only peer" defaultChecked onChange={e => updateToLanguage(e.target.value)}/>
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Francés</span>
          </label>

          <label className="inline-flex items-center cursor-pointer" >
            <input type="checkbox" value="english" className="sr-only peer" defaultChecked onChange={e => updateToLanguage(e.target.value)}/>
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">English</span>
          </label>
        </div>

        <select className="rounded" name="select" defaultValue={fromLanguage} onChange={e => setFromLanguage(e.target.value)} >
          <option value="auto">Auto</option>
          <option value="spanish">Español</option>
          <option value="english">Inglés</option>
          <option value="français">Francés</option>
          <option value="deutsch">Alemán</option>
        </select>

        <input className="rounded" type="text" value={text} onChange={e => setText(e.target.value)}/>

        <div className="rounded bg-white min-h-10 p-4 flex flex-col justify-center items-center">
          <span>{ response.english.text }</span>
          <span>{ response.spanish.text }</span>
          <span>{ response.français.text }</span>
          <span>{ response.deutsch.text }</span>
        </div>

        <div>
          <button className="rounded bg-white min-h-10 p-4 flex justify-center items-center" onClick={fetchTranslate} type="submit">Translate</button>
        </div>

      </form>
    </>
  )
}
