import Categories from "../components/Categories"
import Hero from "../components/Hero"
import HeroVideo from "../components/HeroVideo"

const Home = () => {
  return (
    <>
      <Hero />
      <HeroVideo />
      <div className="bg-[#f7f8fc] my-10">
        <div className="px-[30px] sm:px-[100px] md:px-[150px] lg:px-[200px] max-w-[1240px] mx-auto py-10">
          <div className="text-center flex items-center flex-col">
            <p className="uppercase text-[#1084da]">Ən çox işlənənlər</p>
            <h1 className="font-extrabold text-[35px] mt-3 mb-1 text-[#373d46]">İmtahan Kateqoriyaları</h1>
            <div className="h-[3px] w-[70px] bg-[#1084da] mb-12"></div>
          </div>
          <Categories />
        </div>
      </div>
    </>
  )
}

export default Home