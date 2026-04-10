import { useLanguage } from "../hooks/LanguageContext";

export default function LanguageComponanet() {
  const { t, toggleLanguage } = useLanguage();

  return (
    <div>
      <h1>{t.greeting}</h1>
      <p>{t.welcome}</p>

      <button onClick={toggleLanguage}>
        {t.switchLang}
      </button>
    </div>
  );
}