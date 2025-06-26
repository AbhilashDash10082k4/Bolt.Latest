import PromptBox from "../components/PromptBox";

const Home = () => {
  
  return (
    <div className="w-screen h-dvh bg-gray-900">
    <nav className="text-3xl text-white w-screen h-[50px] bg-transparent pt-10 pl-7 pr-7 font-bold font-mono flex justify-between">
      <div className="">AI SDE</div>
      <div className="flex ">
      <div className="font-medium text-2xl font-sans pr-8">SignIn</div>
      <div className="font-medium text-2xl font-sans">Login</div>
      </div>
    </nav>
    <div className="text-6xl font-bold font-stretch-50% text-white flex justify-center ">
    <div>
      <div className="h-min w-full flex flex-col text-center mt-[220px] items-center ">
        AI Website Builder
        <PromptBox />
      </div>
    </div>
  </div>
  </div>
  );
};

export default Home;