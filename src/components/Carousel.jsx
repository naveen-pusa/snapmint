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
      <img src="https://elev8vp.com/wp-content/uploads/2025/07/snapmint-logo.webp"className="d-block w-100" style={{ height: "300px", objectFit: "cover" }}alt="Slide 1"/>
      <div className="carousel-caption d-none d-md-block">
      </div>
    </div>
    <div className="carousel-item">
<img src="https://cdn.aptoide.com/imgs/4/4/d/44dc60773f098a3c0c18442750b36deb_fgraphic.png" className="d-block w-100"style={{ height: "300px", objectFit: "cover" }} alt="Slide 1"/>
      <div className="carousel-caption d-none d-md-block">
      </div>
    </div>
    <div className="carousel-item">   
      <img src="https://www.merisisvp.com/hs-fs/hubfs/Untitled%20design%20(1).png?width=2000&height=1125&name=Untitled%20design%20(1).png" className="d-block w-100"  style={{ height: "300px", objectFit: "cover" }}alt="Slide 1"/>
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
