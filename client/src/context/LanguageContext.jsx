import { createContext, useState, useCallback } from 'react'

const translations = {
  en: {
    hero_title: "Transform Your Farming with AI",
    hero_subtitle: "Make smarter decisions with real-time crop analytics and predictions",
    cta_button: "Get Started",
    why_agriia: "Why AgriAI?",
    ai_modules: "7 AI-Powered Modules",
    crop_price: "Crop Price Prediction",
    disease_detection: "Disease Detection",
    crop_guide: "Crop Guide",
    pesticide_advisor: "Pesticide Advisor",
    voice_assistant: "Voice Assistant",
    store_finder: "Store Finder",
    weather_analysis: "Weather Analysis",
    dashboard: "Dashboard",
    logout: "Logout",
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    name: "Full Name",
    phone: "Phone Number",
    language: "Language"
  },
  hi: {
    hero_title: "AI से अपनी खेती को बदलें",
    hero_subtitle: "रीयल-टाइम फसल विश्लेषण और भविष्यवाणियों से स्मार्ट निर्णय लें",
    cta_button: "शुरू करें",
    why_agriia: "AgriAI क्यों?",
    ai_modules: "7 AI-संचालित मॉड्यूल",
    crop_price: "फसल मूल्य भविष्यवाणी",
    disease_detection: "रोग पहचान",
    crop_guide: "फसल गाइड",
    pesticide_advisor: "कीटनाशक सलाहकार",
    voice_assistant: "वॉयस सहायक",
    store_finder: "दुकान खोजक",
    weather_analysis: "मौसम विश्लेषण",
    dashboard: "डैशबोर्ड",
    logout: "लॉगआउट",
    login: "लॉगिन",
    register: "पंजीकरण",
    email: "ईमेल",
    password: "पासवर्ड",
    name: "पूरा नाम",
    phone: "फोन नंबर",
    language: "भाषा"
  },
  te: {
    hero_title: "AI తో మీ వ్యవసాయాన్ని రూపాంతరం చేయండి",
    hero_subtitle: "రియల్-టైమ్ పంట విశ్లేషణ మరియు అంచనాలతో స్మార్ట్ నిర్ణయాలు తీసుకోండి",
    cta_button: "ప్రారంభించండి",
    why_agriia: "AgriAI ఎందుకు?",
    ai_modules: "7 AI-శక్తిచేసిన మాడ్యూల్‌లు",
    crop_price: "పంట ధర అంచన",
    disease_detection: "వ్యాధి గుర్తింపు",
    crop_guide: "పంట గైడ్",
    pesticide_advisor: "పురుగుమందు సలహాదారు",
    voice_assistant: "వాయిస్ సహాయకుడు",
    store_finder: "స్టోర్ ఫైండర్",
    weather_analysis: "వాతావరణ విశ్లేషణ",
    dashboard: "డ్యాష్‌బోర్డ్",
    logout: "లాగ్‌అవుట్",
    login: "లాగిన్",
    register: "నమోదు",
    email: "ఇమెయిల్",
    password: "పాస్‌వర్డ్",
    name: "పూర్తి పేరు",
    phone: "ఫోన్ నంబర్",
    language: "భాష"
  },
  ta: {
    hero_title: "AI மூலம் உங்கள் விவசாயத்தை மாற்றுங்கள்",
    hero_subtitle: "நிजநேര பயிர் பகுப்பாய்வு மற்றும் முன்னறிவிப்புகளுடன் நேர்ணாக முடிவுகளை எடுங்கள்",
    cta_button: "தொடங்க",
    why_agriia: "AgriAI ஏன்?",
    ai_modules: "7 AI-இயக்கப்பட்ட தொகுதிகள்",
    crop_price: "பயிர் விலை முன்னறிவிப்பு",
    disease_detection: "நோய் கண்டறிதல்",
    crop_guide: "பயிர் வழிகாட்டி",
    pesticide_advisor: "பூச்சிக்கொல்லி ஆலோசகர்",
    voice_assistant: "வயிஸ் உதவி",
    store_finder: "கடை கண்டறியுதல்",
    weather_analysis: "வானிலை பகுப்பாய்வு",
    dashboard: "டேஷ்போர்டு",
    logout: "வெளியேறு",
    login: "உள்நுழைக",
    register: "பதிவு செய்க",
    email: "ஈமெயில்",
    password: "கடவுச்சொல்",
    name: "முழு பெயர்",
    phone: "ஃபோன் எண்",
    language: "மொழி"
  }
}

export const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en')

  const changeLanguage = useCallback((lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }, [])

  const t = useCallback((key) => {
    return translations[language][key] || key
  }, [language])

  const value = {
    language,
    changeLanguage,
    t,
    languages: ['en', 'hi', 'te', 'ta']
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
