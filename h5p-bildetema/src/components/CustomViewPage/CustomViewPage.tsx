import { useQuery } from '@tanstack/react-query';
import { useDBContext } from 'common/hooks/useDBContext';
import React from 'react'
import { useSearchParams } from 'react-router-dom';
import SuperJSON from 'superjson';

const SearchParamKeys = {
  SEARCH: "search",
  FILTER: "filter",
  VIEW_LANG: "viewLang",
  SEARCH_LANG: "lang",
  WORDS: "words",
};
const CustomViewPage = ():JSX.Element => {
  const dataa = useDBContext() || {};
  const {data} = useQuery(['test'], async() => {
    const res = await fetch('http://127.0.0.1:10000/devstoreaccount1/data/helloWorld.json.tar.gz')
    const text = await res.text()
    return SuperJSON.parse(text)
  })
  console.log(data)
  console.log(dataa)
  // const [searchParams, setSearchParams] = useSearchParams();
  // const wordIds = searchParams.get(SearchParamKeys.WORDS)?.split(",") || [];
  // const words = wordIds.map(id => searchForWord()) 
  
  // console.log(wordIds)


  return (
    <div>CustomViewPage</div>
  )
}

export default CustomViewPage