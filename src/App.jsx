import { useEffect, useState, useCallback,useContext } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import PaginationExample from "./Components/pagination"; 
import TableExample from "./Components/TableE"
import DynamicForm from "./Components/dynamicform";
import MultiStepForm from "./Components/multiStep"
import { ThemeProvider } from "./hooks/themeContext";
import ThemeComponent  from './Components/themecomponent';
import LanguageProvider from './hooks/LanguageContext';
import LanguageComponanet from './Components/langugaeComponent'

//  ye use hoga fixed div ke liye
// const div = containerRef.current;

//   const handleScroll = () => {
//     if (
//       div.scrollTop + div.clientHeight >= div.scrollHeight - 10
//     ) {
//       console.log("Load more...");
//     }
//   };

/// debouncing 
function debounce(func, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function App() {
  const [count, setCount] = useState(0);
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasmore, setHasMore] = useState(true);
  const [step,setStep]= useState(1)
  const LIMIT = 20;
  const Max_page = 5;
  

  const fetchJob = useCallback(async function (pageNum) {
    setLoading(true);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=${LIMIT}`
      );
      if (res) {
        let post2 = await res.json();
        setPost((prev) => [...prev, ...post2]);
        setLoading(false);
        if (pageNum >= Max_page) {
          setHasMore(false);
        }
      }
    } catch (err) {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchJob(page);
  }, [page, fetchJob]);

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasmore) return;

      if (
        window.scrollY + window.innerHeight >=
        document.body.offsetHeight - 10
      ) {
        if (!loading && hasmore) {
          setLoading(true);
          setPage((prev) => prev + 1);
        }
      }
    };
    // const debouncedScroll = debounce(handleScroll, 200); // 200ms delay
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasmore]);

  return (
    <>
    {/* <PaginationExample/> */}
    {/* <TableExample /> */}
    {/* <DynamicForm /> */}
    <MultiStepForm/>
      {/* <div>
        <button onClick={() => setPage((prev) => prev + 1)}> add more</button>
        {post.map((p, i) => (
          <div>
            {
              <div>
                <span>{p.id} </span>--- <span> {p.title}</span>
              </div>
            }
          </div>
        ))}
        {loading && <div>loading -------</div>}
      </div> */}
      <ThemeProvider>
        <LanguageProvider>
          <LanguageComponanet />
        </LanguageProvider>
        <ThemeComponent />
      </ThemeProvider>
    </>
  );
}

export default App;
