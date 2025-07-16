import { useState, useEffect } from 'react'

export const useLanguage = () => {
  const [language, setLanguage] = useState<'en' | 'ta'>(() => {
    const saved = localStorage.getItem('homestay-language')
    return (saved as 'en' | 'ta') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('homestay-language', language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en')
  }

  return { language, setLanguage, toggleLanguage }
}