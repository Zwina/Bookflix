import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import "./banner.css";

function Banner() {
  return (
    <>
      <div className="banner">
        <Container>
        <Image
                src="/image/banner.jpg"
                style={{ backgroundSize: "cover", height: "200px", objectFit: "cover", objectPosition: 'center'}}
                fluid
                text="Second slide"
              />
        </Container>
      </div>
    </>
  );
}

export default Banner;
