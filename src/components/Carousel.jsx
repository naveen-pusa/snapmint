import React from 'react'

function Carousel() {
return (
    <> 
    <div id="carouselExampleCaptions" className="carousel slide">
    <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://static.vecteezy.com/system/resources/previews/008/601/839/non_2x/online-shopping-background-design-free-vector.jpg"className="d-block w-100" style={{ height: "500px", objectFit: "" }}alt="Slide 1"/>
      <div className="carousel-caption d-none d-md-block">
      </div>
    </div>
    <div className="carousel-item">
<img src="https://images.picxy.com/cache/2020/6/20/6c1397739fa678f0a59615cff755d264.jpg" className="d-block w-100"style={{ height: "500px", objectFit: "" }} alt="Slide 1"/>
      <div className="carousel-caption d-none d-md-block">
      </div>
    </div>
    <div className="carousel-item">   
      <img src="https://static.vecteezy.com/system/resources/thumbnails/010/930/996/small/shopping-online-on-phone-with-podium-paper-art-modern-background-gifts-box-vector.jpg" className="d-block w-100"  style={{ height: "500px", objectFit: "" }}alt="Slide 1"/>
      <div className="carousel-caption d-none d-md-block">
       
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
   </button>
</div>
    
    </>
  )
}

export default Carousel
