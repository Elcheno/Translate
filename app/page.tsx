"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

const WAIT_BETWEEN_CHANGE = 1500;

export default function Home() {

  const [ fromLanguage, setFromLanguage ] = useState('auto')
  const [ toLanguage, setToLanguage ] = useState('español')
  const [ text, setText ] = useState('')
  const [ response, setResponse ] = useState('')

  const fetchTranslate = useDebouncedCallback(() => {
    fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fromLanguage, toLanguage, text })
    }).then(response => {
      return response.json()
    }).then(data => {
      console.log(data)
      setResponse(data.text)
    }).catch(error => {
      console.error(error)
      setResponse('Error')
    })
  }, WAIT_BETWEEN_CHANGE)
  
  useEffect(() => {
    fetchTranslate()
  }, [ fromLanguage, toLanguage, text ])

  return (
    <>
      <form className="flex flex-col gap-4">

        <select name="select" defaultValue={fromLanguage} onChange={e => setFromLanguage(e.target.value)}>
          <option value="auto">Auto</option>
          <option value="español">Español</option>
          <option value="english">Inglés</option>
          <option value="french">Francés</option>
        </select>

        <select name="select" defaultValue={toLanguage} onChange={e => setToLanguage(e.target.value)}>
          <option value="español">Español</option>
          <option value="english">Inglés</option>
          <option value="french">Francés</option>
        </select>

        <input type="text" value={text} onChange={e => setText(e.target.value)}/>

        <input type="text" disabled value={response} />

      </form>
    </>
  )
}
