import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

function About() {
  return (
    <div className='min-h-screen'>
       <Navbar />
       <br />
       <div className='px-10 '>
        <div className='font-bold text-3xl'>About Athlix</div>
       <br />
       <hr />
       <br />
        <div className='text-gray-500'>
          <p>At Athlix, we believe sportswear should do more than just look good — it should empower every move. 
          Whether you’re chasing your next personal best or 
          just keeping it casual, our collection of footwear and apparel is designed to keep you comfortable,
          confident, and ready for anything.
        </p>
        <p>
          Built on innovation and passion for performance, Athlix blends style 
          with function. From everyday essentials to performance-driven gear, we’re here to make 
          sure you feel unstoppable, on and off the field.
       </p>
       <br />
       <div>📖 Extended Story</div>
       <p>Athlix started with a simple thought: what if sportswear wasn’t just for athletes?
         The team behind Athlixgrew up loving both fashion and fitness, but struggled to find gear
        that could transition seamlessly from the gym to the street. 
        Sneakers were either too sporty for casual wear or too delicate for real training. Apparel was either
        comfortable but bland, or stylish but impractical.</p>
        <p>We wanted to bridge that gap. So, Athlix was born — an ecommerce 
          brand dedicated to creating sportswear that’s versatile, durable, and stylish enough to 
          wear every day. What began as late-night brainstorming sessions and countless 
          sketches slowly turned into prototypes, samples, and finally, a full-fledged brand.</p>
        <p>Every product we design carries that DNA: the determination to perform, the style to stand out, and the comfort to carry you through every part of your day.</p>
       <br />
       <div>🏆 Our Mission</div>
       <p>Our mission at Athlix is simple: make sportswear accessible, stylish, and empowering for everyone.</p>
       <p>We don’t just want to sell shoes or t-shirts — we want to redefine what sportswear means in
         everyday life. To us, it’s not about being the fastest runner or the strongest lifter.
         It’s about confidence, self-expression, and the freedom to move the way you want.</p>
        </div>
    </div>
    <br />
    <br />
    <Footer />
       </div>
  )
}

export default About
