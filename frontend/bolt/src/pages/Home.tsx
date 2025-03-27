import PromptBox from "../components/PromptBox";


const Home = () => {
  
  return (
    <div className='w-full h-dvh bg-gradient-to-b from-gray-900 to-blue-900 text-6xl font-bold font-stretch-50% text-white flex justify-center '>
      <div className='h-min w-full flex flex-col text-center mt-[200px] items-center '>
        AI Website Builder
      <PromptBox/>
      </div>
    </div>
  )
}

export default Home;