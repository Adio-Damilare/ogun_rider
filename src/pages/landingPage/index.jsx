import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import memo1 from "../../assets/images/memo.png"
import memo2 from "../../assets/images/memo2.png"
import memoCardimg from "../../assets/images/memocard.png"
import folderImg from "../../assets/images/folder.png"
import formImg from "../../assets/images/form.png"
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate()
    const images = [
        memo1, memo2, memo1, memo2
    //   "src/assets/images/memo.png",
    //   "src/assets/images/memo2.png",
    //   "src/assets/images/memo.png",
    //   "src/assets/images/memo2.png"
    ];


    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 10000); // Change image every 10 seconds
    
        return () => clearInterval(timer);
    }, [images?.length]);

    
 


  return (
    <div className="min-h-screen px-10  bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        className="absolute top-0 right-0 w-2/3 h-full bg-blue-600/20  rounded-bl-full"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center"
          >
            {/* <span className="text-white text-2xl font-bold">MemoSync</span> */}
            <div className="flex items-center gap-x-2">
            <img
              src={"src/assets/images/ncaa_logo.png"}
              alt="logo"
              width={40}
              className="cursor-pointer"
            />
            <span className="font-bold leading-3 text-lg  sm:block text-default-300">EDAP</span>
          </div>
          </motion.div>
          
          <div className="flex space-x-6 items-center">
            {/* <a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a> */}
            {/* <a href="#about" className="text-gray-300 hover:text-white">About</a> */}
            {/* <a href="#contact" className="text-gray-300 hover:text-white">Contact</a> */}
   
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                className="bg-white text-slate-900 px-4 py-2 rounded-lg font-medium cursor-pointer z-10"
                onClick={()=>navigate("/login")}
                >
                Login
                </motion.button>
    
           
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Left Column */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
             Internal Memo Application to boost your productivity
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              A powerful and intuitive memo creation suite to transform your communication experience. 
              Organize your memo more effectively.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg"
              onClick={()=>navigate("/login")}
            >
              Sign In
            </motion.button>

            {/* Stats */}
            {/* <div className="flex mt-12 space-x-12">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-4xl font-bold text-white">50K+</h3>
                <p className="text-gray-400">Users Globally</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-4xl font-bold text-white">100+</h3>
                <p className="text-gray-400">Countries Served</p>
              </motion.div>
            </div> */}
          </motion.div>

          {/* Right Column - App Preview */}
          <motion.div 
            className="lg:w-1/2 mt-12 lg:mt-0"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-black rounded-lg shadow-2xl p-4">
              <div className="flex items-center mb-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="space-y-4">
                {/* <img src="src/assets/images/memo.png" alt="" className='rounded' />
               */}

                <div className="relative w-full max-h-[350px]  rounded overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    className="w-full h-full object-cover rounded"
                    initial={{ opacity: 0, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -200 }}
                    transition={{ duration: 2.5 }}
                    alt={`App preview ${currentImageIndex + 1}`}
                  />
                </AnimatePresence>
                {/* <AnimatePresence initial={false} custom={currentImageIndex}>
                  <motion.img
                    key={currentImageIndex}
                    src={memo1}
                    custom={currentImageIndex}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = swipePower(offset.x, velocity.x);

                      if (swipe < -swipeConfidenceThreshold) {
                        setCurrentImageIndex((prev) => (prev + 1) % images.length);
                      } else if (swipe > swipeConfidenceThreshold) {
                        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
                      }
                    }}
                    className="absolute w-full h-full object-cover"
                    alt={`App preview ${currentImageIndex + 1}`}
                  />
                </AnimatePresence> */}
                
                {/* Image indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div> */}
              </div>
               
              </div>
            </div>
          </motion.div>
        </div>
      </div>

             {/* Features Section */}
      <div className="container mx-auto px-6 py-32">
        <div className="flex justify-center mb-16">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl"
          >
            {/* Feature Card 1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-[32px] p-8 shadow-xl group"
            >
              <div className="relative h-[260px] mb-6 overflow-hidden group-hover:scale-110  rounded-2xl bg-gray-50">
                <img 
                  src={formImg} 
                  alt="Instant memo creation" 
                  className="w-full h-full object-cover"
                />
              </div>    
              <div className="text-center">
                <h3 className="text-slate-900 text-2xl font-semibold">Instant Memo Creation</h3>
              </div>
            </motion.div>

            {/* Feature Card 2 - Taller middle card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-[32px] p-8 shadow-xl md:-mt-12 md:mb-[-48px] group"
            >
              <div className="relative h-[300px] mb-6 overflow-hidden group-hover:scale-110 rounded-2xl bg-gray-50">
                <img 
                  src={folderImg} 
                  alt="Organised memo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-slate-900 text-2xl font-semibold">Organised Memo</h3>
              </div>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-[32px] p-8 shadow-xl group"
            >
              <div className="relative h-[260px] mb-6 overflow-hidden group-hover:scale-110 rounded-2xl bg-gray-50">
                <img 
                  src={memoCardimg} 
                  alt="Intuitive memo UI" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-slate-900 text-2xl font-semibold">Intuitive Memo UI</h3>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;