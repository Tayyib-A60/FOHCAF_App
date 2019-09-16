import React from "react";

// reactstrap components
import { Carousel, CarouselItem, CarouselIndicators } from "reactstrap";

// core components
const items = [
  {
    src: require("assets/img/bg1.jpg"),
    altText: "Nature, United States",
    caption: "Nature, United States"
  },
  {
    src: require("assets/img/bg3.jpg"),
    altText: "Somewhere Beyond, United States",
    caption: "Somewhere Beyond, United States"
  },
  {
    src: require("assets/img/bg4.jpg"),
    altText: "Yellowstone National Park, United States",
    caption: "Yellowstone National Park, United States"
  }
];

const BlogPostImages = ({photos}) => {
    
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const onExiting = () => {
    // setAnimating(true);
  };
  const onExited = () => {
    // setAnimating(false);
  };
  const next = () => {
    // if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const stopAnimation = () => {
    setAnimating(false);
  }
  const previous = () => {
    // if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = newIndex => {
    // if (animating) return;
    setActiveIndex(newIndex);
  };
  return (
    <>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={photos}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {photos.map(item => {
          return (
            <CarouselItem
              onExiting={onExiting}
              onExited={onExited}
              onLoad={stopAnimation}
              onLoadedData={stopAnimation}
              key={item.id}
            >
              <img src={`https://localhost:5001/uploads/${item.fileName}`} alt={item.fileName} />
              <div className="carousel-caption d-none d-md-block">
                <h5>{item.caption}</h5>
              </div>
            </CarouselItem>
          );
        })}
        <a
          className="carousel-control-prev"
          data-slide="prev"
          href="#pablo"
          style={{ display: `${photos.length > 1? '': 'none'}`}}
          onClick={e => {
            e.preventDefault();
            previous();
          }}
          role="button"
          >
          <i className="now-ui-icons arrows-1_minimal-left"></i>
        </a>
        <a
          className="carousel-control-next"
          data-slide="next"
          href="#pablo"
          style={{ display: `${photos.length > 1? '': 'none'}`}}
          onClick={e => {
            e.preventDefault();
            next();
          }}
          role="button"
        >
          <i className="now-ui-icons arrows-1_minimal-right"></i>
        </a>
      </Carousel>
    </>
  );
}

export default BlogPostImages;